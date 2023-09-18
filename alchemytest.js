import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: "PMQsc_ysNFRHohw8R0YqaaQGuuJpQbR9",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);