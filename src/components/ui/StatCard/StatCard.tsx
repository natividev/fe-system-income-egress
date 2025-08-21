"use client";
import { Box, Flex, Icon, Text, Tooltip, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";
import CountUp from "react-countup";

type StatCardProps = {
  title: string;
  value?: number;
  suffix?: string;              // ej: "$", " USD", " transacciones"
  hint?: string;                // tooltip opcional
  trend?: { pct: number; label?: string }; // % arriba/abajo
  icon?: IconType;
  colorScheme?: "blue" | "red" | "green" | "purple";
  isLoading?: boolean;
  isCurrency?: boolean;
};

const formatCurrency = (n?: number) =>
  typeof n === "number"
    ? n.toLocaleString("es-SV", { style: "currency", currency: "USD", maximumFractionDigits: 2 })
    : "--";

export default function StatCard({
  title,
  value,
  suffix = "",
  hint,
  trend,
  icon,
  colorScheme = "blue",
  isLoading,
  isCurrency = false,
}: StatCardProps) {
  const bg = useColorModeValue("white", "gray.900");
  const shadow = useColorModeValue("0 10px 25px rgba(0,0,0,0.06)", "0 10px 25px rgba(0,0,0,0.3)");
  const grad = {
    blue: "linear-gradient(135deg, #EBF4FF 0%, #E6FFFA 100%)",
    red: "linear-gradient(135deg, #FFE5E5 0%, #FFF5F5 100%)",
    green: "linear-gradient(135deg, #E6FFFA 0%, #F0FFF4 100%)",
    purple: "linear-gradient(135deg, #F5EAFE 0%, #F3E8FF 100%)",
  }[colorScheme];

  const trendColor = trend
    ? trend.pct > 0
      ? "green.500"
      : trend.pct < 0
      ? "red.500"
      : "gray.500"
    : "gray.500";

  return (
    <Box
      role="group"
      p={5}
      borderRadius="2xl"
      bg={bg}
      boxShadow={shadow}
      transition="all .2s ease"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
      border="1px solid"
      borderColor={useColorModeValue("gray.100", "whiteAlpha.200")}
      position="relative"
      overflow="hidden"
    >
      {/* Sutil acento de color */}
      <Box
        position="absolute"
        inset="0"
        opacity={0.35}
        bg={grad}
        pointerEvents="none"
      />

      <Flex justify="space-between" align="center" position="relative">
        <Flex direction="column" gap={1}>
          <Tooltip hasArrow label={hint ?? title} isDisabled={!hint}>
            <Text fontSize="sm" color="gray.500" fontWeight="semibold">
              {title}
            </Text>
          </Tooltip>

          {isLoading ? (
            <Skeleton height="32px" width="180px" borderRadius="md" />
          ) : (
            <Text fontSize="3xl" fontWeight="extrabold" lineHeight="1.1">
            {isLoading ? (
                <Skeleton height="32px" width="180px" borderRadius="md" />
            ) : typeof value === "number" ? (
                <CountUp
                key={`${title}-${value}-${isCurrency}`} 
                start={0}
                end={value}
                duration={0.8}
                separator=","
                decimals={isCurrency ? 2 : 0}
                preserveValue={false}
                formattingFn={
                    isCurrency
                    ? (n: number) =>
                        n.toLocaleString("es-SV", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                        })
                    : undefined
                }
                />
            ) : (
                "--"
            )}
            {!isCurrency && typeof value === "number" ? (
                <Text as="span" fontSize="xl" color="gray.500"> {suffix}</Text>
            ) : null}
            </Text>

          )}

          {trend && (
            <Text fontSize="sm" fontWeight="medium" color={trendColor}>
              {trend.pct > 0 ? "▲" : trend.pct < 0 ? "▼" : "•"} {trend.pct.toFixed(1)}%
              {trend.label ? ` · ${trend.label}` : ""}
            </Text>
          )}
        </Flex>

        {icon && (
          <Flex
            align="center"
            justify="center"
            w="56px"
            h="56px"
            borderRadius="xl"
            bg="whiteAlpha.800"
            border="1px solid"
            borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
            _groupHover={{ transform: "scale(1.04)" }}
            transition="transform .2s ease"
          >
            <Icon as={icon} boxSize={7} color={`${colorScheme}.500`} />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
