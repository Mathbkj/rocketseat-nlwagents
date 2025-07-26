import { Button } from "@/components/ui/button";
import { useCreateAudio } from "@/hooks/useCreateAudio";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import type { RoomParams } from "@/types/RoomParams";
import { Mic, Pause, Play, StopCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function RecordRoomAudio() {
  const { roomId } = useParams<RoomParams>();
  const { mutateAsync: uploadAudio } = useCreateAudio(roomId!);

  // Variável para checar se o navegador suporta gravação de áudio
  const isRecordingSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function" &&
    typeof window.MediaRecorder === "function";

  const [isRecording, setIsRecording] = useState(false);
  /*Estado necessário para saber se a gravação foi pausada*/
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  function createRecorder(audio: MediaStream) {
    recorderRef.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });
    recorderRef.current.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const formData = new FormData();
        formData.append("file", event.data);
        await uploadAudio({ formData });
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
    setElapsed(0);
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    streamRef.current && streamRef.current === audio;

    createRecorder(audio);

    tickRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }
  async function stopRecording() {
    setIsRecording(false);
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    if (tickRef.current) {
      clearInterval(tickRef.current);
    }
    if (streamRef.current) {
      streamRef.current = null;
    }
    setElapsed(0);
  }
  /*Função necessária para pausar a gravação.*/
  async function pauseRecording() {
    setIsPaused((prev) => !prev);
    recorderRef.current?.pause();
    clearInterval(tickRef.current!);
  }
  async function resumeRecording() {
    setIsPaused((prev) => !prev);
    recorderRef.current?.resume();
    tickRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }
  useEffect(() => {
    return () => {
      tickRef.current && tickRef.current === null;

      recorderRef.current && recorderRef.current === null;
      streamRef.current && streamRef.current === null;
    };
  }, []);

  useEffect(() => {
    console.log("Recorder state changed:", recorderRef.current?.state);
  }, [recorderRef.current?.state]);

  const time = formatRelativeTime(elapsed);

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-3">
      {!isRecording ? (
        <Button onClick={async () => await startRecording()}>
          Gravar Audio
        </Button>
      ) : (
        <section className="flex flex-col items-center gap-2">
          <Mic size={70} className="border p-2 rounded-full" />
          <span>
            {time.split("").map((value, key) => {
              const v = value;
              return (
                <span
                  key={key}
                  className={
                    !v.match(/[m|s]/)
                      ? "text-xl font-medium"
                      : "text-sm font-thin"
                  }
                >
                  {v}
                </span>
              );
            })}
          </span>

          <div className="flex self-bg-center gap-2">
            <Button
              variant="destructive"
              onClick={async () => await stopRecording()}
              tooltip="Parar Gravação"
            >
              <StopCircle />
            </Button>
            {isPaused ? (
              <Button onClick={resumeRecording} tooltip="Retomar Gravação">
                <Play />
              </Button>
            ) : (
              <Button onClick={pauseRecording} tooltip="Pausar Gravação">
                <Pause />
              </Button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
