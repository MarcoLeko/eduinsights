import { useContext } from "react";
import { UiContext } from "../context/ui-context";

export function useUiContext() {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a UiContextProvider");
  }

  return context;
}
