import GenerarInformes from "@/view/GenerarInforme";

export default function ReposteEgresoPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/egreso"}
      title={"REPORTE DE EGRESOS"}
      btnTitle="DE EGRESO"
    />
  );
}
