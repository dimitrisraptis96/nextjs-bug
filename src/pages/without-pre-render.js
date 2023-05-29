import React from "react";
import { Center, Text } from "@chakra-ui/react";

export default function Page({ templates = [] }) {
  return (
    <Center w="100vw" h="100vh">
      <Text>😢Without pre-render</Text>
    </Center>
  );
}
