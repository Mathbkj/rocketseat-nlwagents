import { lazy, Suspense } from "react";
import { delay } from "@/lib/utils/delay";
import { ErrorBoundary } from "@/components/error-boundary";
import { CreateRoomFormSkeleton } from "@/components/core/create-room-form-skeleton";
import { RoomListSkeleton } from "@/components/core/room-list-skeleton";
const ErrorPreview = lazy(() => import("../components/core/server-error.tsx"));
const FormPreview = lazy(() => delay(import("../components/create-room-form.tsx")));
const RoomPreview = lazy(() => delay(import("../components/room-list.tsx")));

export function CreateRoom() {
  return (
    <div className="min-h-screen py-8 px-4">
      <ErrorBoundary
        error={new Error("Falha no servidor")}
        resetErrorBoundary={() => {}}
        element={<ErrorPreview />}
      >
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 grid-cols-2 items-start">
            <Suspense fallback={<CreateRoomFormSkeleton />}>
              <FormPreview />
            </Suspense>
            <Suspense fallback={<RoomListSkeleton />}>
              <RoomPreview />
            </Suspense>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
