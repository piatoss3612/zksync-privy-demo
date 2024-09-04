import { ZkSyncClientContext } from "@/context/ZKsyncClient";
import { useContext, useMemo } from "react";
import { createPublicClient, http } from "viem";
import { zksyncSepoliaTestnet } from "viem/zksync";
const useZKsync = () => {
  const context = useContext(ZkSyncClientContext);
  const publicClient = useMemo(() => {
    const client = createPublicClient({
      chain: zksyncSepoliaTestnet,
      transport: http(),
    });

    return client;
  }, []);

  return {
    ...context,
    publicClient,
  };
};

export default useZKsync;
