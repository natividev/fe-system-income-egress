"use client";
import axiosInstance from "@/api/axiosInstance";
import BaselineChart from "@/components/ui/BaselineChart/BaselineChart";
import { Chart } from "@/components/ui/Chart/Chart";
import { Indicador } from "@/components/ui/Indicator/Indicator";
import { ITotalesGlobalesIngresoEgreso } from "@/interface/interfaces";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DataResult {
  fecha_actividad: string;
  cantidad: number;
}

interface dataGraficos {
  time: string;
  value: number;
}

export default function DashboardPage() {
  const [ingresos, setIngresos] = useState<dataGraficos[] | []>([]);
  const [egresos, setEgresos] = useState<dataGraficos[] | []>([]);
  const [data, setData] = useState<dataGraficos[] | []>([]);
  const [totalGlobales, setTotalGlobales] = useState<ITotalesGlobalesIngresoEgreso | null>(null);

  const formatearData = (data: DataResult[]) => {
    if (!Array.isArray(data)) return data;
    const info: dataGraficos[] = data.map(({ fecha_actividad, cantidad }) => {
      return { time: fecha_actividad, value: cantidad };
    });

    const sortData = [...info].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    return sortData;
  };

  useEffect(() => {
    const getDataIngresoEgreso = async () => {
      try {
        const { data } = await axiosInstance.get("/dashboard/ingreso-egreso");
        if (!data) return;
        const { ingreso, egreso } = data;

        const ingesos = formatearData(ingreso);
        const egresos = formatearData(egreso);

        setIngresos(ingesos);
        setEgresos(egresos);
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/dashboard/ingreso-grafica-linea"
        );
        if (!data) return;
        const dataChart = formatearData(data);
        setData(dataChart);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalGlobales = async () => {
      try {
        const { data } = await axiosInstance.get("/dashboard/total-globales");
        if (!data) return;
        setTotalGlobales(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    getDataIngresoEgreso();
    getData();
    getTotalGlobales();
  }, []);

  return (
    <Box
      p={5}
      bg={"white"}
      minHeight={"83vh"}
      height={"auto"}
      width={"100%"}
      borderRadius="lg"
      display={"block"}
    >
      <Text fontSize={"xl"} as="b">
        DASHBOARD
      </Text>

      <Flex direction={"column"} mt={"3rem"} mb={"1rem"} align={"center"}>
        <Indicador totalGlobalIngresoEgreso={totalGlobales } />
      </Flex>


      <Flex direction={"column"} mt={"3rem"} mb={"1rem"}>
        <Text fontSize={"md"} as={"b"}>
          GRÁFICA TRANSACCIONES
        </Text>
        <Flex>
          <Flex align={"center"}>
            <Text fontSize={"md"}>INGRESO </Text>
            <Box
              display={"block"}
              w={"1rem"}
              h={"1rem"}
              bg={"blue"}
              ml={"0.5rem"}
            ></Box>
          </Flex>
          <Flex align={"center"} ml={"1rem"}>
            <Text fontSize={"md"}>EGRESO</Text>
            <Box
              display={"block"}
              w={"1rem"}
              h={"1rem"}
              bg={"red"}
              ml={"0.5rem"}
            ></Box>
          </Flex>
        </Flex>
        <BaselineChart incomeData={ingresos} expenseData={egresos} />
      </Flex>
      <Flex direction={"column"} mt={"3rem"} mb={"1rem"}>
        <Text fontSize={"md"} as={"b"}>
          GRÁFICA DE FLUJO DE INGRESO
        </Text>
        <Chart data={data} />
      </Flex>
    </Box>
  );
}
