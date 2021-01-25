import { useCallback, useState } from "react";

export const useD3Utils = (wrapperRef) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [toolTipPos, setToolTipPos] = useState(null);

  const setSelectedCountryHandler = useCallback(
    (e, feature) => {
      setSelectedCountry(selectedCountry === feature ? null : feature);
      const rect = wrapperRef.current?.getBoundingClientRect();
      const pageX = e.clientX - rect.left;
      const pageY = e.clientY - rect.top;
      setToolTipPos({ pageX, pageY });
    },
    [selectedCountry, wrapperRef]
  );

  const resetSelectedCountryHandler = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  return {
    setSelectedCountryHandler,
    resetSelectedCountryHandler,
    toolTipPos,
    selectedCountry,
    width: 1280,
    height: 640,
  };
};
