import { AlertCircle } from "lucide-react";
import {
  ErrorBoundary as Boundary,
  type FallbackProps,
} from "react-error-boundary";
import type { PropsWithChildren } from "react";

function ErrorFallback(props: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex items-center text-center gap-2 text-sm text-red-400"
    >
      <span className="flex gap-1">
        Algo deu errado:
        {props.error instanceof Error ? props.error.message : ""}
        <AlertCircle size={20} />
      </span>
    </div>
  );
}

export function ErrorBoundary({ children }: PropsWithChildren) {
  return (
    <Boundary
      FallbackComponent={ErrorFallback}
      onReset={(details) => console.log(details)}
    >
      {children}
    </Boundary>
  );
}
