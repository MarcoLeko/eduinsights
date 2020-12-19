import { useContext } from "react";
import { AlertContext } from "../context/alert-context";

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext must be used within a AlertContextProvider"
    );
  }

  return context;
}
