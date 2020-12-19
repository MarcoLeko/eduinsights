import { useContext } from "react";
import { UiStateContext } from "../context/ui.context";

export function useUiContext() {
  const context = useContext(UiStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }

  return context;
}
