import {
  ConnectedWallet,
  EIP1193Provider,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import {
  eip712WalletActions,
  publicActionsL2,
  zksyncSepoliaTestnet,
} from "viem/zksync";

const useZKsync = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const [eip1193Provider, setEip1193Provider] =
    useState<EIP1193Provider | null>(null);

  const publicClient = useMemo(() => {
    return createPublicClient({
      chain: zksyncSepoliaTestnet,
      transport: http(),
    }).extend(publicActionsL2()); // Extend the client with public actions for L2
  }, []);

  const walletClient = useMemo(() => {
    if (!wallet || !eip1193Provider) {
      return null;
    }

    return createWalletClient({
      account: wallet.address as `0x${string}`,
      chain: zksyncSepoliaTestnet,
      transport: custom(eip1193Provider),
    }).extend(eip712WalletActions()); // Extend the client with EIP-712 wallet actions
  }, [wallet, eip1193Provider]);

  const setupWallet = useCallback(async () => {
    if (!ready || !authenticated) {
      setWallet(null);
      setEip1193Provider(null);
      return;
    }

    const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");

    if (!embeddedWallet) {
      return;
    }

    try {
      await embeddedWallet.switchChain(zksyncSepoliaTestnet.id);
      const provider = await embeddedWallet.getEthereumProvider();
      setWallet(embeddedWallet);
      setEip1193Provider(provider);
    } catch (error) {
      console.error("Error setting up wallet:", error);
      setWallet(null);
      setEip1193Provider(null);
    }
  }, [ready, authenticated, wallets]);

  useEffect(() => {
    setupWallet();
  }, [setupWallet]);

  return {
    wallet,
    publicClient,
    walletClient,
  };
};

export default useZKsync;
