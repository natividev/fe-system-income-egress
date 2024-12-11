import Swal from "sweetalert2";

export const showAlertError = (text: string) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text,
    confirmButtonText: "ACEPTAR",
  });
};

export const showAlertLoading = (text: string, isLoading: boolean) => {
  let myAlert;
  if (isLoading) {
    myAlert = Swal.fire({
      title: "Cargando...",
      text,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close(myAlert);
  }
};

export const showAlertSuccess = (
  messageSuccess: string,
  isShowConfirmButton: boolean
) => {
  if (isShowConfirmButton) {
    Swal.fire({
      icon: "success",
      title: "Exito",
      text: messageSuccess,
      confirmButtonText: "ACEPTAR",
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Exito",
      text: messageSuccess,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
