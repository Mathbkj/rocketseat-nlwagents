import { Button } from "@/components/ui/button";
import type { RoomParams } from "@/types/RoomParams";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function RecordRoomAudio() {
  const { roomId } = useParams<RoomParams>();
  // Variável para checar se o navegador suporta gravação de áudio
  const isRecordingSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function" &&
    typeof window.MediaRecorder === "function";

  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  async function uploadAudio(blob: Blob) {
    const formData = new FormData();
    formData.append("file", blob);
    const response = await fetch(
      `http://localhost:3333/salas/${roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${JSON.stringify(value)}`);
    }
    const result = await response.json();
    console.log(result);
  }

  async function stopRecording() {
    setIsRecording(false);
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();

    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }
  function createRecorder(audio: MediaStream) {
    recorderRef.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });
    recorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log(event.data.size);
        uploadAudio(event.data);
      }
    };

    recorderRef.current.onstart = () => console.log("Gravação iniciada");
    recorderRef.current.onstop = () => {
      console.log("Gravação parada");
    };
    recorderRef.current.start();
  }
  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Gravação de áudio não é suportada neste navegador.");
      return;
    }
    setIsRecording(true);
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorderRef.current?.stop();
      createRecorder(audio);
    }, 5000);
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-3">
      {!isRecording ? (
        <Button onClick={startRecording}>Gravar Audio</Button>
      ) : (
        <Button onClick={stopRecording}>Parar Gravação</Button>
      )}
    </div>
  );
}
