import React from "react";
import { Center, Text } from "@chakra-ui/react";
// import { EyeClose } from "iconoir-react";
import { motion } from "framer-motion";

export default function Page({ templates = [] }) {
  return (
    <Center w="100vw" h="100vh">
      {/* <EyeClose /> */}
      <Text>😢Without pre-render</Text>
    </Center>
  );
}
