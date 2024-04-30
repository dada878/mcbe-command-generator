import toast from "react-hot-toast";

export function successToast(content: string) {
  toast.success(content, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    position: "bottom-right",
    duration: 2000,
  });
}

export function errorToast(content: string) {
  toast.error(content, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    position: "bottom-right",
    duration: 2000,
  });
}