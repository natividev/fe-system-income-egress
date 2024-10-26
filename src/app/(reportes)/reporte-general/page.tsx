import GenerarInformes from "@/view/GenerarInforme";

export default function ReposteGeneralPage() {
  return (
    <GenerarInformes
      endpoint={"/reports/ingreso-egreso"}
      title={"REPORTE GENERAL"}
      btnTitle="GENERAL"
    />
  );
}
