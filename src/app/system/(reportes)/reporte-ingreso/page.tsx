import GenerarInformes from "@/view/GenerarInformes/GenerarInforme";

export default function ReposteIngresoPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/ingreso"}
      title={"REPORTE DE INGRESO"}
      btnTitle="DE INGRESO"
    />
  );
}
