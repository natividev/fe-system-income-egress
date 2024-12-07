"use client";
import React, { useEffect, useRef } from "react";
import {
  createChart,
  LineData,
  IChartApi,
  ISeriesApi,
  ColorType,
} from "lightweight-charts";

interface CompareChartProps {
  incomeData: LineData[]; // Datos para la serie de ingresos
  expenseData: LineData[]; // Datos para la serie de egresos
}

const BaselineChart: React.FC<CompareChartProps> = ({
  incomeData,
  expenseData,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const incomeSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const expenseSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    try {
      if (!chartContainerRef.current) return;

      // Crear el gráfico
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: ColorType.Solid, color: "white" },
          textColor: "#000",
        },
      });

      // Serie de ingresos
      const incomeSeries = chart.addLineSeries({
        color: "blue",
      });
      incomeSeries.setData(incomeData);

      // Serie de egresos
      const expenseSeries = chart.addLineSeries({
        color: "red",
      });
      expenseSeries.setData(expenseData);

      // Guardar referencias
      chartRef.current = chart;
      incomeSeriesRef.current = incomeSeries;
      expenseSeriesRef.current = expenseSeries;

      chart.timeScale().fitContent();
      // Ajustar tamaño dinámico
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === chartContainerRef.current) {
            chart.resize(entry.contentRect.width, 400);
          }
        }
      });

      resizeObserver.observe(chartContainerRef.current);
      // Limpiar al desmontar
      return () => {
        resizeObserver.disconnect();
        chart.remove();
      };
    } catch (error) {
      console.log(error);
    }
  }, [incomeData, expenseData]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default BaselineChart;
