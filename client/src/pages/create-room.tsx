import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  );
  /*<section className="flex flex-col items-start m-2 gap-1">
      <Button className="text-center">Criar Sala</Button>
      {isLoading && <Spinner />}
      {data && data.length > 0 && (
        <>
          {typeof data === "string" ? (
            <span className="text-shadow-red-400">{data}</span>
          ) : (
            data.map((room) => (
              <Link key={room.id} to={`/salas/${room.id}`} className="underline">
                {room.name}
              </Link>
            ))
          )}
        </>
      )}
    </section>
  );
*/
}
