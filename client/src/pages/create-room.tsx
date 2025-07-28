import { lazy, Suspense } from "react";
import { delay } from "@/lib/utils/delay";
const ErrorPreview = lazy(() => import("@/components/core/server-error"));
const FormPreview = lazy(() => delay(import("@/components/create-room-form")));
const RoomPreview = lazy(() => delay(import("@/components/room-list")));
import { ErrorBoundary } from "@/components/error-boundary";
import { CreateRoomFormSkeleton } from "@/components/create-room-form";
import { RoomListSkeleton } from "@/components/room-list";

export function CreateRoom() {
  return (
    <div className="min-h-screen py-8 px-4">
      <ErrorBoundary
        error={new Error("Falha no servidor")}
        resetErrorBoundary={() => {}}
        element={<ErrorPreview/>}
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
