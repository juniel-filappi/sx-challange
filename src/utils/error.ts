import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const timeoutErrors = ["ECONNABORTED", "TIMEDOUT"];

const showLongSnackbar = (title: string, html?: string) =>
  MySwal.fire({ title, icon: "error", timer: 5000, html });

export const handleError = (err: unknown, alternativeMessage: string) => {
  if (axios.isAxiosError(err)) {
    if (err.code && timeoutErrors.includes(err.code)) {
      showLongSnackbar(
        "Conexão ruim ou inexistente",
        "Tente novamente mais tarde"
      );
      return;
    }

    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.message;
    const messagePayload = errorResponse?.payload;
    const message = messagePayload
      ? messagePayload.map((item: any) => item.message).join("\n")
      : null;

    showLongSnackbar("Erro!", message || errorMessage || alternativeMessage);
    return;
  }

  showLongSnackbar(alternativeMessage);
};
