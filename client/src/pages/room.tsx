import type { RoomParams } from "@/types/RoomParams";
import { useNavigate, useParams } from "react-router-dom";

export function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams<RoomParams>();
  if (!roomId) {
    navigate("/sala", { replace: true });
  }
  return <h1>Detalhes da sala {roomId}</h1>;
}
