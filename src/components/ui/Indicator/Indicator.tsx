"use client";
import { ITotalesGlobalesIngresoEgreso } from "@/interface/interfaces";
import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";


interface IndicadorProps {
  totalGlobalIngresoEgreso: ITotalesGlobalesIngresoEgreso | null;
}
export const Indicador: React.FC<IndicadorProps> = ( { totalGlobalIngresoEgreso }) => {
  return (
    
        <StatGroup style={{ position: "relative", width: "100%", height: "300px" }}>
          <Stat>
            <StatLabel>Ingreso</StatLabel>
            <StatNumber>{totalGlobalIngresoEgreso?.ingreso.monto}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Egreso</StatLabel>
            <StatNumber>{totalGlobalIngresoEgreso?.egreso.monto}</StatNumber>
          </Stat>
        </StatGroup>
    
  );
};
