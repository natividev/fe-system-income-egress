"use client";
import React, { useEffect, useRef } from "react";
import {
  createChart,
  LineData,
  IChartApi,
  ISeriesApi,
  ColorType,
} from "lightweight-charts";

interface ChartProps {
  data: LineData[]; // Cambia esto según el tipo de gráfico que quieras usar
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Baseline"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Crear el gráfico
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "#333",
      },
      grid: {
        vertLines: {
          color: "#eee",
        },
        horzLines: {
          color: "#eee",
        },
      },
      timeScale: {
        borderColor: "#ccc",
      },
    });

    // Crear una serie
    const baselineSeries = chart.addBaselineSeries({
      baseValue: { type: "price", price: 25 },
      topLineColor: "rgba( 38, 166, 154, 1)",
      topFillColor1: "rgba( 38, 166, 154, 0.28)",
      topFillColor2: "rgba( 38, 166, 154, 0.05)",
      bottomLineColor: "rgba( 239, 83, 80, 1)",
      bottomFillColor1: "rgba( 239, 83, 80, 0.05)",
      bottomFillColor2: "rgba( 239, 83, 80, 0.28)",
    });
    baselineSeries.setData(data);

    // Guardar referencias para futuros ajustes
    chartRef.current = chart;
    seriesRef.current = baselineSeries;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === chartContainerRef.current) {
          chart.resize(entry.contentRect.width, 400);
        }
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    // Limpiar al desmontar el componente
    return () => {
      chart.remove();
    };
  }, [data]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: "relative", width: "100%", height: "300px" }}
    />
  );
};
