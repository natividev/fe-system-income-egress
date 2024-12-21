import GenerarInformes from "@/view/GenerarInformes/GenerarInforme";

export default function ReposteGeneralPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/resumen-aportaciones-por-proyecto"}
      title={"REPORTE DE APORTACIONES POR PROYECTO"}
      btnTitle="REPORTE DE APORTACIONES POR PROYECTO"
    />
  );
}
