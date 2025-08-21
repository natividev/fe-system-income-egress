"use client";
import axiosInstance from "@/api/axiosInstance";
import BaselineChart from "@/components/ui/BaselineChart/BaselineChart";
import { Chart } from "@/components/ui/Chart/Chart";
import StatCard from "@/components/ui/StatCard/StatCard";
import { ITotalesGlobalesIngresoEgreso } from "@/interface/interfaces";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FiTrendingUp, FiTrendingDown, FiActivity, FiDollarSign } from "react-icons/fi";

interface DataResult { fecha_actividad: string; cantidad: number; }
interface dataGraficos { time: string; value: number; }

export default function DashboardPage() {
  const [ingresos, setIngresos] = useState<dataGraficos[] | []>([]);
  const [egresos, setEgresos] = useState<dataGraficos[] | []>([]);
  const [data, setData] = useState<dataGraficos[] | []>([]);
  const [totalGlobales, setTotalGlobales] = useState<ITotalesGlobalesIngresoEgreso | null>(null);
  const [loadingTotals, setLoadingTotals] = useState(true);

  const formatearData = (data: DataResult[]) => {
    if (!Array.isArray(data)) return data as any;
    const info: dataGraficos[] = data.map(({ fecha_actividad, cantidad }) => ({
      time: fecha_actividad, value: cantidad,
    }));
    return [...info].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  };

  useEffect(() => {
    const getDataIngresoEgreso = async () => {
      try {
        const { data } = await axiosInstance.get("/dashboard/ingreso-egreso");
        if (!data) return;
        const { ingreso, egreso } = data;
        setIngresos(formatearData(ingreso));
        setEgresos(formatearData(egreso));
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async () => {
      try {
        const { data } = await axiosInstance.get("/dashboard/ingreso-grafica-linea");
        if (!data) return;
        setData(formatearData(data));
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalGlobales = async () => {
      try {
        setLoadingTotals(true);
        const { data } = await axiosInstance.get("/dashboard/total-globales");
        if (!data) return;
        setTotalGlobales(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTotals(false);
      }
    };

    getDataIngresoEgreso();
    getData();
    getTotalGlobales();
  }, []);

const totalIngresos = useMemo(
  () => Number(totalGlobales?.ingreso ?? 0),
  [totalGlobales]
);

const totalEgresos = useMemo(
  () => Number(totalGlobales?.egreso ?? 0),
  [totalGlobales]
);

const totalTransacciones = useMemo(
  () => (Array.isArray(ingresos) ? ingresos.length : 0) + (Array.isArray(egresos) ? egresos.length : 0),
  [ingresos, egresos]
);

  const balance = useMemo(() => totalIngresos - totalEgresos, [totalIngresos, totalEgresos]);

  // Si backend ya trae % de variación, úsalo. Si no, calcúlalo simple del último punto vs penúltimo.
  const trendFromSeries = (serie: dataGraficos[]) => {
    if (!serie || serie.length < 2) return 0;
    const a = serie[serie.length - 2].value || 0;
    const b = serie[serie.length - 1].value || 0;
    if (a === 0 && b === 0) return 0;
    if (a === 0) return 100; // salto desde 0
    return ((b - a) / a) * 100;
  };

  const trendIngreso = trendFromSeries(ingresos);
  const trendEgreso = trendFromSeries(egresos);

  return (
    <Box p={5} bg={"white"} _dark={{ bg: "gray.900" }} minHeight={"83vh"} width={"100%"} borderRadius="lg">
      <Text fontSize={"xl"} as="b">DASHBOARD</Text>

      {/* ===== CARDS MODERNAS ===== */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }} gap={5} mt={6}>
        <GridItem>
          <StatCard
            title="Ingresos"
            value={totalIngresos}
            isCurrency
            trend={{ pct: trendIngreso, label: "vs. periodo previo" }}
            icon={FiTrendingUp}
            colorScheme="green"
            hint="Total de ingresos en el período"
            isLoading={loadingTotals}
          />
        </GridItem>
        <GridItem>
          <StatCard
            title="Egresos"
            value={totalEgresos}
            isCurrency
            trend={{ pct: trendEgreso, label: "vs. periodo previo" }}
            icon={FiTrendingDown}
            colorScheme="red"
            hint="Total de egresos en el período"
            isLoading={loadingTotals}
          />
        </GridItem>
        <GridItem>
          <StatCard
            title="Balance"
            value={balance}
            isCurrency
            trend={{ pct: balance === 0 ? 0 : (balance > 0 ? 5 : -5), label: "estimado" }}
            icon={FiDollarSign}
            colorScheme="blue"
            hint="Ingresos - Egresos"
            isLoading={loadingTotals}
          />
        </GridItem>
        <GridItem>
          <StatCard
            title="Transacciones"
            value={totalTransacciones}
            suffix=""
            trend={{ pct: (totalTransacciones ? 3.2 : 0), label: "actividad" }}
            icon={FiActivity}
            colorScheme="purple"
            hint="Cantidad total de registros"
            isLoading={loadingTotals}
          />
        </GridItem>
      </Grid>

      {/* ===== Indicador global (si lo quieres mantener) ===== */}
      <Flex direction={"column"} mt={"3rem"} mb={"1rem"} align={"center"}>
        {/* <Indicador totalGlobalIngresoEgreso={totalGlobales} /> */}
      </Flex>

      {/* ===== Gráfica Ingreso vs Egreso ===== */}
      <Flex direction={"column"} mt={"2rem"} mb={"1rem"}>
        <Text fontSize={"md"} as={"b"}>GRÁFICA TRANSACCIONES</Text>
        <Flex mt={2}>
          <Flex align={"center"}>
            <Text fontSize={"sm"}>INGRESO</Text>
            <Box w={"1rem"} h={"1rem"} bg={"blue"} ml={2} borderRadius="sm" />
          </Flex>
          <Flex align={"center"} ml={4}>
            <Text fontSize={"sm"}>EGRESO</Text>
            <Box w={"1rem"} h={"1rem"} bg={"red"} ml={2} borderRadius="sm" />
          </Flex>
        </Flex>
        <BaselineChart incomeData={ingresos} expenseData={egresos} />
      </Flex>

      {/* ===== Gráfica de flujo de ingreso ===== */}
      <Flex direction={"column"} mt={"2rem"} mb={"1rem"}>
        <Text fontSize={"md"} as={"b"}>GRÁFICA DE FLUJO DE INGRESO</Text>
        <Chart data={data} />
      </Flex>
    </Box>
  );
}
