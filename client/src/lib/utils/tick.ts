import type { Dispatch } from "react";

export function tick(
  setter: Dispatch<React.SetStateAction<number>>
): NodeJS.Timeout {
  return setInterval(() => {
    setter((prev) => prev + 1);
  }, 1000);
}
