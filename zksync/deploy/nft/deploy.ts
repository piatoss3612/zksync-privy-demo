import { deployContract } from "../utils";

// This script is used to deploy an NFT contract
// as well as verify it on Block Explorer if possible for the network
export default async function () {
  const name = "My new NFT";
  const symbol = "MYNFT";
  const baseTokenURI = "ipfs://QmXeQG8Kd3KT6rWaDKD9Eg2MrmRR7GG2jijgFDpcWK1Dyk";
  await deployContract("MyNFT", [name, symbol, baseTokenURI]);
}
