"use client";

import useZKsync from "@/hooks/useZKsync";
import { MY_NFT_ABI, MY_NFT_ADDRESS } from "@/lib/MyNFT";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { encodeFunctionData, formatEther } from "viem";
import { zksyncSepoliaTestnet } from "viem/zksync";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box display="flex" flexDirection="column" minHeight="100vh" bg="gray.300">
    <Center my="auto">{children}</Center>
  </Box>
);

export default function Home() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallet, publicClient, walletClient } = useZKsync();

  const [txStatus, setTxStatus] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { data: ethBalance } = useQuery({
    queryKey: ["balance", wallet?.address],
    queryFn: async () => {
      if (!wallet || !publicClient) {
        throw new Error("Wallet or public client not initialized");
      }
      const address = wallet.address as `0x${string}`;
      return await publicClient.getBalance({ address });
    },
    enabled: !!wallet && !!publicClient,
    refetchInterval: 3000,
  });

  const { data: nftBalance } = useQuery({
    queryKey: ["tokenBalance", wallet?.address],
    queryFn: async () => {
      if (!wallet || !publicClient) {
        throw new Error("Wallet or public client not initialized");
      }
      const account = wallet.address as `0x${string}`;
      return await publicClient.readContract({
        address: MY_NFT_ADDRESS,
        abi: MY_NFT_ABI,
        functionName: "balanceOf",
        args: [account],
      });
    },
    enabled: !!wallet && !!publicClient,
    refetchInterval: 3000,
  });

  const claimNFT = async () => {
    try {
      if (!wallet || !walletClient) {
        throw new Error("Wallet or wallet client not initialized");
      }

      const account = wallet.address as `0x${string}`;
      const data = encodeFunctionData({
        abi: MY_NFT_ABI,
        functionName: "claim",
      });

      const estimatedFee = await publicClient.estimateFee({
        account,
        to: MY_NFT_ADDRESS,
        data,
      });

      const hash = await walletClient.sendTransaction({
        account,
        to: MY_NFT_ADDRESS,
        data,
        gas: estimatedFee.gasLimit,
        maxFeePerGas: estimatedFee.maxFeePerGas,
        maxPriorityFeePerGas: estimatedFee.maxPriorityFeePerGas,
        chain: zksyncSepoliaTestnet,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      setTxHash(hash);
      setTxStatus(receipt.status);
      setErrorMessage("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setTxHash("");
      setErrorMessage(message);
    }
  };

  const formattedEthBalance = formatEther(ethBalance || BigInt(0));
  const nftBalanceString = nftBalance?.toString() || "0";

  if (!authenticated) {
    return (
      <Layout>
        <Button onClick={login} isLoading={!ready}>
          Login
        </Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <VStack
        spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={logout} isLoading={!ready}>
          Logout
        </Button>
        {wallet && (
          <VStack spacing={4}>
            <Text>Address: {wallet.address}</Text>
            <Text>Balance: {formattedEthBalance} ETH</Text>
            <Text>NFT Balance: {nftBalanceString}</Text>
            <Button onClick={claimNFT}>Claim NFT</Button>
            {txHash && (
              <VStack spacing={4}>
                <Text>Transaction Hash: {txHash}</Text>
                <Text>Transaction Status: {txStatus}</Text>
              </VStack>
            )}
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          </VStack>
        )}
      </VStack>
    </Layout>
  );
}
