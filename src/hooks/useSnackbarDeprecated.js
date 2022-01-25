import { useState } from "react";

export const useSnackbar = (initialOpen = false, initialMessage = "") => {
  const [isOpenSnack, setIsOpenSnack] = useState(initialOpen);
  const [message, setMessage] = useState(initialMessage);

  const openSnackbar = () => setIsOpenSnack(true);
  const closeSnackbar = () => setIsOpenSnack(false);
  const resetMessage = (newMessage) => setMessage(newMessage);

  return [isOpenSnack, message, openSnackbar, closeSnackbar, resetMessage];
};
