# ✈️ Skybet

Skybet is a cryptocurrency betting game powered by Phala Phat functions. With Skybet, users can create games centered around various cryptocurrencies and specify the game duration. Participants have the opportunity to stake `$SKY` Tokens and place bets on whether the price will rise or fall. At the end of each game, participants are rewarded with SKY Tokens from the pool. Skybet offers an engaging and interactive platform for cryptocurrency enthusiasts to test their predictions and potentially earn rewards.

Testnet App - https://skybet-testnet.vercel.app/
Mainnet App - https://skybet-mainnet.vercel.app/

---

## Features ✨

1. **Wide Cryptocurrency Support**: Skybet currently supports popular cryptocurrencies like Ethereum, Bitcoin, and Polkadot. Additionally, it has the potential to expand its support to include approximately 700 coins from the CoinGecko API list.
2. **Custom Game Creation**: Skybet allows users to create their own games with the flexibility to set different durations for the game and staking periods. This empowers users to tailor their gaming experience according to their preferences.
3. **ERC-20 Staking and Rewards**: Skybet enables users to stake ERC-20 tokens and receive rewards in the same ERC-20 format. The SKY Token serves as the primary currency within the Skybet ecosystem, facilitating the economy of the platform.
4. **Phat Functions and Price Oracle Verification**: Skybet utilizes Phat Functions to verify the price oracle data obtained from the CoinGecko API. This ensures the accuracy and reliability of the cryptocurrency price information used in the game.
5. **Interactive Live Candlestick Charts**: Skybet enhances the user experience by providing interactive live candlestick charts. These charts offer real-time visual representations of cryptocurrency price movements, allowing users to make informed betting decisions.

---

## User Flow 🛠️

#### Contract Deployment and Coin Addition

- The owner of the contract deploys it and gains the ability to add different coins to the platform. This ensures that users have a variety of cryptocurrencies to choose from when creating games.

#### Game Creation

- Once the contract is deployed, any user can create a game by providing the necessary details.
- The user specifies the operator address, which is responsible for managing the game and drawing the result.
- Start and end times for the game are set to determine the duration of the game itself.
- Staking start and end times are defined to establish the period during which users can add or remove their stakes.
- The user also selects the cryptocurrency that will be used for the game.

#### Staking and Voting

- When the game starts, users can add their stakes by depositing the desired amount of the chosen cryptocurrency into the game contract.
- Users also have the opportunity to vote on whether they believe the price of the selected cryptocurrency will go up or down during the staking duration.
- The voting mechanism allows users to express their predictions and participate actively in the game.

#### Stakes Removal

- During the staking period, users have the option to remove their stakes if they change their mind or wish to adjust their strategy.
- This flexibility ensures that users can make informed decisions and adapt to changing market conditions.

#### Waiting for Game End

- After the staking period is over, users must wait until the game ends.
- This waiting period allows sufficient time for the price of the cryptocurrency to be observed and recorded for result determination.

#### Result Determination

- Once the game ends, the operator, who was specified during game creation, draws the result.
- The Phat function, operating behind the scenes, takes the start and end times of the game and retrieves the precise price of the cryptocurrency at those instances, with a precision of up to 8 decimals.
- The result, indicating whether the price went up or down, is then sent back to the contract through a callback function.
- The contract processes the result and updates the game state accordingly.

#### Reward Distribution

- Once the outcome is declared, winning users can claim their rewards.
- The reward distribution is based on the ratio of stakes they have placed relative to other users who have also won.
- This ensures that users are rewarded proportionally to their contributions and successful predictions.

This detailed user flow provides a step-by-step overview of the Skybet app, covering contract deployment, game creation, staking, voting, result determination, and reward distribution.

---

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/CWNKjn7/1.png" alt="Homepage" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/6s8t9j7/2.png" alt="Create Game" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/LhKzjzG/3.png" alt="Game Page" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/kBWcKmR/4.png" alt="Game Page" >
    </td>
  </tr>
</table>

---

## Video Demo 🎥

![Skybet](https://i.ibb.co/dcnGdRR/og.png)

https://youtu.be/jEo37OGORTA

---

## Tech Stack 💻

- [thirdweb](https://thirdweb.com/) - Wallet Connection + Smart Contracts
- [antd](https://ant.design/) - UI Design
- [Phat Bricks](https://bricks.phala.network/) - Lens API Oracle
- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) - Front-end
- [Binance APIs](https://github.com/binance/binance-spot-api-docs) - WebSockets for Live Price Data

---

## Getting Started 🚀

### 📝 Smart Contract

To get started with Skybet smart contracts, follow these steps:

1. Navigate to the `phat-contracts` directory and locate the contracts under the `contracts` folder.
2. Install the necessary dependencies by running the following command:
   ```bash
   npm install
   ```
   Set the required Environment Variables
3. To deploy the contract, you can run the following command
   ```bash
   yarn test-deploy # (for testnet deployment)
    yarn main-deploy # (for mainnet deployment)
   ```
   This will deploy two contracts, one for the game and one for the `$SKY` Token.
4. To run the tests, you can run the following command
   ```bash
    yarn localhost-test
   ```
5. To build the Phat Function run the command
   ```bash
   yarn build-function
   ```
6. To deploy the Phat Function first make sure you have a Bricks profile on [testnet](https://bricks-poc5.phala.network) or [mainnet](https://bricks.phala.network/)

   ```bash
   yarn test-deploy-function # (for testnet deployment)
   yarn main-deploy-function # (for mainnet deployment)
   ```

   Make sure the set the Attester Address in the Skybet Game Contract

7. Additionally, there is already a deployed contract on the Polygon Mumbai and Polygon Mainnet with the contract address:

   ```
   # Token Address
   Mumbai - 0xc7449dC99168ACc5B4701a13F14b85d280bD9811
   Mainnet - 0x853BDA8D4C5d39A27ee6F580C028cacFbf6ebe49

   # Game Address
   Mumbai - 0xB44Ae12e3245A3FbdD9445c536ef568a702e77DF
   Mainnet - 0x640CCEEf4b6d3B46a208EBc44bd20eE70cAAe9A6
   ```

8. And instances of Skybet Phat Functions deployed on the Phala Network Testnet and Mainnet with the contract address:

   ```
   Testnet Po5 - https://bricks-poc5.phala.network/workflows/0x1d75072ca200208088d1c51e69c9f3e3b1ff125e7ff9b716624f10ee38908c76/0
   Mainnet - https://bricks.phala.network/workflows/0xbf840aa11319bddc377ce2b859daa968cb847e4ec53f94e97c33bca57997fcd8/0
   ```

---

### 📱 Skybet Frontend

To get started with the Frontend app, follow these steps:
Navigate to the `app` directory and install the necessary dependencies by running the following command:

```bash
npm install
```

Create a new file called `.env.local` in the root directory of the `app`. This file will contain the required environment variables.
Inside the `.env.local` file, add the following environment variables:

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=''
```

To obtain the thirdweb Client Id, you can visit the [thirdweb Dashboard](https://thirdweb.com/dashboard) and retrieve the API key from there.

Once you have filled in the environment variables in the `.env.local` file, you can start the development server by running the following command:

```bash
npm run dev
```

Open your web browser and navigate to http://localhost:3000 to access the Skybet app.

By following these steps, you will be able to set up and run the Just Roles front-end app on your local development environment.

---
