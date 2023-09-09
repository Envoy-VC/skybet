import '@phala/pink-env';
import { Coders } from '@phala/ethers';

type HexString = `0x${string}`;

// ETH ABI Coder
const uintCoder = new Coders.NumberCoder(32, false, 'uint256');
const bytesCoder = new Coders.BytesCoder('bytes');

// Reply is in format of [ResponseType, requestId, Price at Start Timestamp, Price at End Timestamp]
function encodeReply(reply: [number, number, number, number]): HexString {
	return Coders.encode(
		[uintCoder, uintCoder, uintCoder, uintCoder],
		reply
	) as HexString;
}

// Defined in Skybet.sol
const TYPE_RESPONSE = 0;
const TYPE_ERROR = 2;

enum Error {
	FailedToFetchData = 'FailedToFetchData',
	FailedToDecode = 'FailedToDecode',
	MalformedRequest = 'MalformedRequest',
}

function errorToCode(error: Error): number {
	switch (error) {
		case Error.FailedToFetchData:
			return 1;
		case Error.FailedToDecode:
			return 2;
		case Error.MalformedRequest:
			return 3;
		default:
			return 0;
	}
}

function parseTokenSymbol(symbol: string): string {
	var hex = symbol.toString();
	hex = hex.slice(2);
	var str = '';
	for (var i = 0; i < hex.length; i += 2) {
		const ch = String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
		str += ch;
	}
	return str;
}

function fetchTokenPrice(
	API_URL: string,
	startAt: number,
	endAt: number,
	symbol: string
): any {
	let headers = {
		'Content-Type': 'application/json',
		'User-Agent': 'skybet-phat-contract',
	};

	let url = `${API_URL}/coins/${symbol}/market_chart/range?vs_currency=usd&from=1693820774&to=1694252795&precision=18`;

	let response = pink.batchHttpRequest(
		[
			{
				url,
				method: 'GET',
				headers,
				returnTextBody: true,
			},
		],
		5000
	)[0];

	if (response.statusCode !== 200) {
		console.log(
			`Fail to read CoinGecko API with status code ${
				response.statusCode
			}, error  ${response.error || response.body}}`
		);
		throw Error.FailedToFetchData;
	}
	let respBody = response.body;
	if (typeof respBody !== 'string') {
		throw Error.FailedToDecode;
	}
	return JSON.parse(respBody);
}

export default function main(request: HexString, settings: string): HexString {
	console.log(`Received Request ${request}`);
	let requestId, startTimestamp, endTimestamp, tokenSymbol;

	try {
		[requestId, startTimestamp, endTimestamp, tokenSymbol] = Coders.decode(
			[uintCoder, uintCoder, uintCoder, bytesCoder],
			request
		);
	} catch (error) {
		console.info('Malformed request received');
		console.log(error);
		return encodeReply([
			TYPE_ERROR,
			0,
			errorToCode(error as Error),
			errorToCode(error as Error),
		]);
	}
	const symbol = parseTokenSymbol(tokenSymbol);
	console.log(requestId);
	console.log(startTimestamp.toString());
	console.log(endTimestamp.toString());
	console.log(symbol);
	try {
		let respData = fetchTokenPrice(
			settings,
			startTimestamp,
			endTimestamp,
			symbol
		);
		let startValue = Math.round(respData.prices[0][1] * 10 ** 8);
		console.log(startValue);
		let endValue = Math.round(
			respData.prices[respData.prices.length - 1][1] * 10 ** 8
		);
		console.log(endValue);
		let reply = encodeReply([TYPE_RESPONSE, requestId, startValue, endValue]);
		return reply;
	} catch (error) {
		if (error === Error.FailedToFetchData) {
			throw error;
		} else {
			console.log('error ', [TYPE_ERROR, requestId, error, error]);
			return encodeReply([
				TYPE_ERROR,
				requestId,
				errorToCode(error as Error),
				errorToCode(error as Error),
			]);
		}
	}
}
