import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { createContext, useCallback, useEffect, useState } from "react";
import { createWalletClient, custom, WalletClient } from "viem";
import { eip712WalletActions, zksyncSepoliaTestnet } from "viem/zksync";

interface ZkSyncClientContextValue {
  wallet: ConnectedWallet | null;
  walletClient: WalletClient | null;
}

const ZkSyncClientContext = createContext({} as ZkSyncClientContextValue);

const ZkSyncClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const setup = useCallback(async (wallet: ConnectedWallet) => {
    await wallet.switchChain(zksyncSepoliaTestnet.id); // Switch to zkSync chain
    const provider = await wallet.getEthereumProvider(); // Get EIP-1193 provider

    const client = createWalletClient({
      account: wallet.address as `0x${string}`,
      chain: zksyncSepoliaTestnet,
      transport: custom(provider),
    }).extend(eip712WalletActions()); // Extend the client with EIP-712 wallet actions

    setWallet(wallet);
    setWalletClient(client);
  }, []);

  useEffect(() => {
    // If the user is ready and authenticated
    if (ready && authenticated) {
      // Find the embedded wallet in the list of wallets
      const embeddedWallet: ConnectedWallet | undefined = wallets.find(
        (wallet) => wallet.walletClientType === "privy"
      );

      // If the embedded wallet is found, set it up with the zkSync chain
      if (embeddedWallet) {
        setup(embeddedWallet);
      }
    }
  }, [ready, authenticated, wallets, setup]);

  return (
    <ZkSyncClientContext.Provider
      value={{
        wallet,
        walletClient,
      }}
    >
      {children}
    </ZkSyncClientContext.Provider>
  );
};

export { ZkSyncClientProvider, ZkSyncClientContext };
