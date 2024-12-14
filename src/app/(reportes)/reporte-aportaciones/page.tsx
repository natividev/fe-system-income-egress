import GenerarInformes from "@/view/GenerarInforme";

export default function ReposteGeneralPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/resumen-aportaciones-por-proyecto"}
      title={"REPORTE DE APORTACIONES POR PROYECTO"}
      btnTitle="REPORTE DE APORTACIONES POR PROYECTO"
    />
  );
}

