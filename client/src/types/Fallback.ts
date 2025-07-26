import type { ReactNode } from "react";
import type { FallbackProps } from "react-error-boundary";

export type FallbackComponentProps = FallbackProps & {
    element: ReactNode;
}