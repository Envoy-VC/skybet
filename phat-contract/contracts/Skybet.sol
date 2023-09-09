// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'hardhat/console.sol';
/* ---------------- External Imports ----------------- */
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

/* ---------------- Internal Imports ----------------- */
import './PhatRollupAnchor.sol';

/// @author Vedant Chainani
/// @title Skybet Contract
/// @notice Contract to create and manage games

contract Skybet is PhatRollupAnchor, Ownable {
	/// @dev Contract Address of Stake Token
	IERC20 public immutable STAKE_TOKEN;

	/* ------------------- Constants ------------------- */
	uint constant TYPE_RESPONSE = 0;
	uint constant TYPE_ERROR = 2;

	/* ------------------- State Variables ------------------- */

	/// @dev Total number of games created
	uint256 gameCount;
	/// @dev Total number of tokens added for betting
	uint256 tokenCount;
	/// @dev Request Id for next Phat Contract
	uint nextRequest = 1;

	/* ------------------- Mappings ------------------- */

	/// @dev Mapping of Request Id =>  Request Struct => Game Id
	mapping(uint => Request) requests;
	/// @dev Mapping of Game Id => Token Struct => Token Symbol
	mapping(uint256 => Token) public Tokens;
	/// @dev Mapping of Game Id => Game Struct
	mapping(uint256 => Game) public Games;
	/// @dev Mapping of Game Id => User Address => Bet Struct
	mapping(uint256 => mapping(address => Bet)) public BetsforGame;

	/* ------------------- Events ------------------- */

	/// @dev Emitted when a new game is created
	event GameCreated(
		address operator,
		uint256 startAt,
		uint256 stakingStartAt,
		uint256 stakingEndAt,
		uint256 endAt,
		uint tokenId
	);

	/// @dev Emitted when a user stakes tokens
	event AmountStaked(
		address user,
		uint256 gameId,
		Outcome betType,
		uint256 amount
	);

	/// @dev Emitted when a user unstakes tokens
	event AmountUnstaked(address user, uint256 gameId, uint256 amount);

	/// @dev Emitted when a user withdraws winnings
	event WithdrawWinnings(address user, uint256 gameId, uint256 amount);

	/// @dev Emitted when a result of a game is declared
	event ResultDeclared(uint256 gameId, Outcome result);

	/// @dev Emitted when a new token is added by owner
	event TokenAdded(string symbol);

	/// @dev Emitted when a response is received from Phat Contract
	event ResponseReceived(
		uint requestId,
		uint256 gameId,
		uint256 startAt,
		uint256 endAt,
		uint256 valueAtStart,
		uint256 valueAtEnd
	);

	/// @dev Emitted when an error is received from Phat Contract
	event ErrorReceived(
		uint requestId,
		uint256 gameId,
		uint256 startAt,
		uint256 endAt
	);

	/* ------------------- Constructor ------------------- */

	constructor(address _stakeToken, address _attestorAddress) {
		STAKE_TOKEN = IERC20(_stakeToken);
		_grantRole(PhatRollupAnchor.ATTESTOR_ROLE, _attestorAddress);
		Tokens[tokenCount] = Token({symbol: 'ethereum'});
		tokenCount++;
	}

	/* ------------------- Enums ------------------- */

	enum Outcome {
		PRICE_DROP,
		PRICE_RISE
	}

	/* ------------------- Structures ------------------- */

	/// @dev Request Struct with Game Id
	struct Request {
		uint256 gameId;
	}

	/// @dev Token Struct with Symbol
	struct Token {
		string symbol;
	}

	/// @dev Game Struct with all game details
	struct Game {
		address operator;
		uint256 startAt;
		uint256 stakingStartAt;
		uint256 stakingEndAt;
		uint256 endAt;
		uint256 totalAmountUpstaked;
		uint256 totalAmountDownstaked;
		Token token;
		bool resultDeclared;
		Outcome result;
	}

	/// @dev Bet Struct with bet details
	struct Bet {
		Outcome betType;
		uint256 totalTokensStaked;
		bool hasClaimed;
	}

	/* ------------------- Public Functions ------------------- */

	/// @dev Function to create a new game
	/// @param _operator Address of the operator
	/// @param _startAt Timestamp of the start of the game
	/// @param _stakingStartAt Timestamp of the start of staking
	/// @param _stakingEndAt Timestamp of the end of staking
	/// @param _endAt Timestamp of the end of the game
	/// @param _tokenId Token Id of the token to be used for staking
	function createGame(
		address _operator,
		uint256 _startAt,
		uint256 _stakingStartAt,
		uint256 _stakingEndAt,
		uint256 _endAt,
		uint _tokenId
	) public {
		require(
			_startAt >= block.timestamp,
			'Start time should be greater than current time'
		);
		require(
			_stakingStartAt >= _startAt,
			'Staking start time should be greater than start time'
		);
		require(
			_stakingEndAt > _stakingStartAt,
			'Staking end time should be greater than Staking start time'
		);
		require(
			_stakingEndAt < _endAt,
			'Staking end time should be less than end time'
		);
		require(
			_endAt - _startAt <= 7 days,
			'Game duration should be 7 days or less'
		);
		require(_tokenId <= tokenCount, 'Token does not exist');

		Games[gameCount] = Game({
			operator: _operator,
			startAt: _startAt,
			stakingStartAt: _stakingStartAt,
			stakingEndAt: _stakingEndAt,
			endAt: _endAt,
			totalAmountUpstaked: 0,
			totalAmountDownstaked: 0,
			token: Tokens[_tokenId],
			resultDeclared: false,
			result: Outcome.PRICE_DROP
		});

		gameCount++;

		emit GameCreated(
			_operator,
			_startAt,
			_stakingStartAt,
			_stakingEndAt,
			_endAt,
			_tokenId
		);
	}

	/// @dev Function to stake tokens
	/// @param _id Game Id of the game to stake in
	/// @param _stakeType Outcome of the bet
	/// @param _amount Amount of tokens to stake
	function addStake(uint256 _id, Outcome _stakeType, uint256 _amount) public {
		require(_id <= gameCount, 'Game does not exist');

		Game storage game = Games[_id];
		Bet storage bet = BetsforGame[_id][msg.sender];

		require(block.timestamp < game.endAt, 'Game has ended');
		require(
			block.timestamp > game.stakingStartAt &&
				block.timestamp < game.stakingEndAt,
			'Staking period has ended'
		);
		require(_amount > 0, 'Amount should be greater than 0');

		// Check if user has allowance fot this contract and transfer tokens
		require(
			STAKE_TOKEN.allowance(msg.sender, address(this)) >= _amount,
			'Not Enough Allowance'
		);
		require(
			STAKE_TOKEN.transferFrom(msg.sender, address(this), _amount),
			'Error Transferring Tokens'
		);

		// Update game and bet details
		if (_stakeType == Outcome.PRICE_DROP) {
			game.totalAmountDownstaked += _amount;
		} else {
			game.totalAmountUpstaked += _amount;
		}
		bet.betType = _stakeType;
		bet.totalTokensStaked += _amount;

		emit AmountStaked(msg.sender, _id, _stakeType, _amount);
	}

	/// @dev Function to unstake tokens
	/// @param _id Game Id of the game to unstake from
	/// @param _amount Amount of tokens to unstake
	function removeStake(uint256 _id, uint256 _amount) public {
		require(_id <= gameCount, 'Game does not exist');

		Game storage game = Games[_id];
		Bet storage bet = BetsforGame[_id][msg.sender];

		require(
			block.timestamp > game.stakingStartAt &&
				block.timestamp < game.stakingEndAt,
			'Staking period has ended'
		);
		require(_amount > 0, 'Amount should be greater than 0');

		// Check if user has enough tokens staked
		uint256 initialStake = bet.totalTokensStaked;
		require(initialStake >= _amount, 'Not Enough Tokens Staked');
		unchecked {
			game.totalAmountDownstaked -= _amount;
			bet.totalTokensStaked -= _amount;
		}

		// Transfer tokens back to user
		STAKE_TOKEN.approve(address(this), _amount);
		require(STAKE_TOKEN.transferFrom(address(this), msg.sender, _amount));

		emit AmountUnstaked(msg.sender, _id, _amount);
	}

	/// @dev Function to withdraw winnings
	/// @param _id Game Id of the game to withdraw from
	function withdrawWinnings(uint256 _id) public {
		require(_id <= gameCount, 'Game does not exist');

		Game storage game = Games[_id];
		Bet storage bet = BetsforGame[_id][msg.sender];

		require(block.timestamp > game.endAt, 'Game has not ended');
		require(game.resultDeclared, 'Result has not been declared');
		require(game.result == bet.betType, 'You have lost the bet');
		require(
			bet.totalTokensStaked > 0,
			'You have not staked any tokens/ Already withdrawn the winnings'
		);

		/*
		 *  Compute Reward Tokens based on formula
		 *
		 *     Reward Tokens:
		 *         If Price Drops:
		 *              Percentage Share = (Total Tokens Staked / Total Amount Downstaked)
		 *              Reward Tokens = Percentage Share * (Total Amount Downstaked + Total Amount Upstaked)
		 *         If Price Rises:
		 *              Percentage Share = (Total Tokens Staked / Total Amount Upstaked)
		 *              Reward Tokens = Percentage Share * (Total Amount Downstaked + Total Amount Upstaked)
		 *
		 */
		uint256 rewardTokens;
		if (game.result == Outcome.PRICE_DROP) {
			rewardTokens =
				(bet.totalTokensStaked / game.totalAmountDownstaked) *
				(game.totalAmountDownstaked + game.totalAmountUpstaked);
		} else if (game.result == Outcome.PRICE_RISE) {
			rewardTokens =
				(bet.totalTokensStaked / game.totalAmountUpstaked) *
				(game.totalAmountDownstaked + game.totalAmountUpstaked);
		}

		bet.totalTokensStaked = 0;

		// Transfer reward tokens to user
		STAKE_TOKEN.approve(address(this), rewardTokens);
		require(STAKE_TOKEN.transferFrom(address(this), msg.sender, rewardTokens));

		emit WithdrawWinnings(msg.sender, _id, rewardTokens);
	}

	/// @dev Function to declare result of a game
	/// @param _id Game Id of the game to declare result of
	/// @notice Only operator or owner can declare result
	function declareResult(uint256 _id) public {
		require(_id <= gameCount, 'Game does not exist');

		Game storage game = Games[_id];

		require(block.timestamp > game.endAt, 'Game has not ended');
		require(
			msg.sender == game.operator || msg.sender == owner(),
			'Not authorized to declare result'
		);

		// Assemble the request and push it to Phat Contract [startAt, endAt, Token Symbol]
		uint id = nextRequest;
		requests[id] = Request({gameId: _id});
		_pushMessage(abi.encode(id, game.startAt, game.endAt, game.token.symbol));
		nextRequest += 1;
	}

	/// @dev Callback function to receive response from Phat Contract
	/// @param action Response from Phat Contract
	function _onMessageReceived(bytes calldata action) internal override {
		require(action.length == 32 * 4, 'Cannot parse action');
		(uint respType, uint id, uint valueAtStart, uint valueAtEnd) = abi.decode(
			action,
			(uint, uint, uint, uint)
		);
		Game storage game = Games[requests[id].gameId];

		if (respType == TYPE_RESPONSE) {
			// Compare valueAtStart and valueAtEnd to determine result
			if (valueAtEnd > valueAtStart) {
				game.result = Outcome.PRICE_RISE;
				emit ResultDeclared(requests[id].gameId, Outcome.PRICE_RISE);
			} else {
				game.result = Outcome.PRICE_DROP;
				emit ResultDeclared(requests[id].gameId, Outcome.PRICE_DROP);
			}
			game.resultDeclared = true;

			emit ResponseReceived(
				id,
				requests[id].gameId,
				game.startAt,
				game.endAt,
				valueAtStart,
				valueAtEnd
			);
			delete requests[id];
		} else if (respType == TYPE_ERROR) {
			emit ErrorReceived(id, requests[id].gameId, game.startAt, game.endAt);
			delete requests[id];
		}
	}

	/* ------------------- Owner Functions ------------------- */

	/// @dev Function to add a new token
	/// @param _symbol Symbol of the token to be added
	function addToken(string memory _symbol) public onlyOwner {
		require(!tokenExists(_symbol), 'Token already exists');
		Tokens[tokenCount] = Token({symbol: _symbol});
		tokenCount++;
		emit TokenAdded(_symbol);
	}

	/* ------------------- Internal Functions ------------------- */

	/// @dev Function to check if a token exists
	/// @param _symbol Symbol of the token to be checked
	function tokenExists(
		string memory _symbol
	) internal view returns (bool exists) {
		for (uint i = 0; i < tokenCount; i++) {
			if (keccak256(bytes(_symbol)) == keccak256(bytes(Tokens[i].symbol))) {
				return true;
			}
		}
		return false;
	}
}
