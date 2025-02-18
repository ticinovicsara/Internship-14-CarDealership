import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toast.css";

export const showToastError = (message) => {
  toast.error(message);
};

export const showToastSuccess = (message) => {
  toast.success(message);
};

export const ToastNotification = () => {
  return (
    <ToastContainer
      className="toast-container"
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      closeOnClick
      pauseOnHover
      draggable={true}
    />
  );
};
