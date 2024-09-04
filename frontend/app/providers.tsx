"use client";

import { useEffect, useState } from "react";
import { PrivyProvider, PrivyProviderProps } from "@privy-io/react-auth";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { zksyncSepoliaTestnet } from "viem/zksync";
import { ZkSyncClientProvider } from "@/context/ZKsyncClient";

const PrivyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
const PrivyConfig: PrivyProviderProps["config"] = {
  // Configure the default chain and supported chains with zksyncSepoliaTestnet
  defaultChain: zksyncSepoliaTestnet,
  supportedChains: [zksyncSepoliaTestnet],
  // Create embedded wallets for users who don't have a wallet at first login
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
};

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PrivyProvider appId={PrivyAppId} config={PrivyConfig}>
      <ChakraProvider>
        <ZkSyncClientProvider>
          <QueryClientProvider client={queryClient}>
            {mounted && children}
          </QueryClientProvider>
        </ZkSyncClientProvider>
      </ChakraProvider>
    </PrivyProvider>
  );
};

export default Providers;
