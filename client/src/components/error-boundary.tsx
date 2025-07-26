import { ErrorBoundary as Boundary } from "react-error-boundary";
import type { PropsWithChildren } from "react";
import type { FallbackComponentProps } from "@/types/Fallback";

export function ErrorBoundary({
  children,
  element,
}: PropsWithChildren & FallbackComponentProps) {
  return <Boundary fallback={element}>{children}</Boundary>;
}
