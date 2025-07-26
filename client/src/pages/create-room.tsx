import { lazy } from "react";
const ErrorPreview = lazy(() => import("@/components/core/server-error"));
import { CreateRoomForm } from "@/components/create-room-form";
import { ErrorBoundary } from "@/components/error-boundary";
import { RoomList } from "@/components/room-list";

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
            <CreateRoomForm />
            <RoomList />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
