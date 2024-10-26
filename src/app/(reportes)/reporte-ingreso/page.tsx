import GenerarInformes from "@/view/GenerarInforme";

export default function ReposteIngresoPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/ingreso"}
      title={"REPORTE DE INGRESO"}
      btnTitle="DE INGRESO"
    />
  );
}
