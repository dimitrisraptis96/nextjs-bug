import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home({ templates = [] }) {
  return (
    <VStack w="100vw" h="100vh">
      <Text>✅Home</Text>
      <Link href="/without-pre-render">Go to other page</Link>
    </VStack>
  );
}

export async function getStaticProps() {
  try {
    return {
      props: {},
    };
  } catch (err) {
    return { notFound: true };
  }
}
