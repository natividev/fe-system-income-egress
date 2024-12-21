import GenerarInformes from "@/view/GenerarInformes/GenerarInforme";

export default function ReposteEgresoPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/egreso"}
      title={"REPORTE DE EGRESOS"}
      btnTitle="DE EGRESO"
    />
  );
}
