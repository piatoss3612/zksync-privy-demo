# zksync-privy-demo

### Setup

```bash
$ mkdir hooks && touch hooks/useZKsync.ts
```

```solidity
...

contract MyNFT is ERC721Enumerable, Ownable {
    ...

    /**
     * @dev Claims a new token
     */
    function claim() external {
        _tokenIdTracker.increment();
        _mint(_msgSender(), _tokenIdTracker.current());
    }
}
```

```bash
$ yarn compile
```

```bash
$ yarn hardhat deploy-zksync --script nft/deploy.ts
yarn run v1.22.22

Starting deployment process of "MyNFT"...
Estimated deployment cost: 0.04160123725 ETH

"MyNFT" was successfully deployed:
 - Contract address: 0xD679c82D7262E4E5afb06060b6dC3e2c1f5026bF
 - Contract source: contracts/nft/MyNFT.sol:MyNFT
 - Encoded constructor arguments: 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000a4d79206e6577204e46540000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000054d594e46540000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d58655147384b64334b5436725761444b44394567324d726d5252374747326a696a6746447063574b3144796b0000000000000000000000

Requesting contract verification...
Your verification ID is: 24744
Contract successfully verified on ZKsync block explorer!
Done in 15.03s.
```
