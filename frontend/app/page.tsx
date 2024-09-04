"use client";

import useZKsync from "@/hooks/useZKsync";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallet } = useZKsync();

  if (!authenticated) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bg="gray.300"
      >
        <Center my="auto">
          <Button onClick={login} isLoading={!ready}>
            Login
          </Button>
        </Center>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg="gray.300">
      <Center my="auto">
        <VStack
          spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button onClick={logout} isLoading={!ready}>
            Logout
          </Button>
          {wallet && <Text>Wallet address: {wallet.address}</Text>}
        </VStack>
      </Center>
    </Box>
  );
}
