import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const showLongSnackbar = (title: string, html: string) =>
  MySwal.fire({
    title,
    toast: true,
    position: "top-end",
    icon: "success",
    timer: 5000,
    html,
  });

export const handleSuccess = (message: string) =>
  showLongSnackbar("Sucesso!", message);
