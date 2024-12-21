"use client";

import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSession as fetchSession } from "next-auth/react";

export const PerfilUser = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const fetchUserSession = async () => {
    try {
      const session = await fetchSession();

      if (session) setUserName(session.user?.name ?? "Natividad");
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    fetchUserSession();
  }, []); // eslint-disable-line

  return (
    <Flex alignItems={"center"}>
      <HStack>
        <Avatar
          size={"md"}
          src={
            "https://www.mundodeportivo.com/alfabeta/hero/2021/04/Kyojuro-Rengoku.jpeg?width=1200"
          }
        />
        <VStack
          display={{ base: "none", md: "flex" }}
          alignItems="flex-start"
          spacing="1px"
          ml="2"
        >
          <Text fontSize="md" style={{ color: "#24222066" }}>
            Administrador
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {userName}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};
