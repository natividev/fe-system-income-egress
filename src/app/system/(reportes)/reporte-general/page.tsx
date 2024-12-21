import GenerarInformes from "@/view/GenerarInformes/GenerarInforme";

export default function ReposteGeneralPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/ingreso-egreso"}
      title={"REPORTE GENERAL"}
      btnTitle="GENERAL"
    />
  );
}
