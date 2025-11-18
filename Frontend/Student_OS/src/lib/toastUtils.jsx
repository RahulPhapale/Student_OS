import toast from "react-hot-toast";
import CustomToast from "@/components/ui/CustomToast.jsx";

// ERROR TOAST
export const showErrorToast = (title, message) => {
  toast.custom((t) => (
    <CustomToast
      title={title}
      message={message}
      type="error"
      onClose={() => toast.dismiss(t.id)}
    />
  ));
};

// SUCCESS TOAST
export const showSuccessToast = (title, message) => {
  toast.custom((t) => (
    <CustomToast
      title={title}
      message={message}
      type="success"
      onClose={() => toast.dismiss(t.id)}
    />
  ));
};
