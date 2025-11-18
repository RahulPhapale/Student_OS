export default function CustomToast({ title, message, type = "error", onClose }) {
  const boxClass =
    type === "success" ? "chatgpt-toast-success" : "chatgpt-toast"; // default = error

  return (
    <div className={boxClass}>
      <div className="flex justify-between items-start">
        <div>
          <div className="chatgpt-toast-title">{title}</div>
          <div className="chatgpt-toast-desc">{message}</div>
        </div>

        <div className="chatgpt-toast-close" onClick={onClose}>
          ×
        </div>
      </div>
    </div>
  );
}
