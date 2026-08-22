import { useEffect, useState } from "react";

/** Rough heuristic to skip postprocessing / reduce particle count on constrained devices. */
export function useLowPowerDevice() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const narrow = window.innerWidth < 820;
    setLowPower(cores <= 4 || narrow);
  }, []);

  return lowPower;
}
