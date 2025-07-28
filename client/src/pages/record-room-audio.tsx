import { Button } from "@/components/ui/button";
import { useCreateAudio } from "@/hooks/useCreateAudio";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import type { RoomParams } from "@/types/RoomParams";
import { Mic, MicOff, Pause, Play, StopCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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
  const [freq, setFreq] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const tickRef = useRef<NodeJS.Timeout | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef(0);

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
  }
  /*Função necessária para obter os dados da frequência de bytes a cada frame.*/
  function getByteData(audio: MediaStream) {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const analyser = ctxRef.current.createAnalyser();
    analyser.fftSize = 256;
    if (!analyserRef.current) analyserRef.current = analyser;

    const source = ctxRef.current.createMediaStreamSource(audio);
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);

    data.forEach((value, index) => {
      console.log(`Index ${index}: ${value}`);
    });
    source.connect(analyserRef.current);
    const updateFrequency = () => {
      if (!data || !analyserRef.current) return;
      /*A função getByteFrequencyData nada mais faz do que copiar os bytes da frequência de data para um objeto do tipo Uint8Array
      O que significa que a cada frame o array será populado com novos bytes provenientes da gravação */
      analyserRef.current.getByteFrequencyData(data);
      let byteSum = 0;
      let weightSum = 0;
      data.forEach((byte, index) => {
        /*Quanto mais próximo do index zero, menor é a frequência do volume
        No caso, estamos usando este cálculo atribuído à variável 'weight'*/
        const weight = index / data.length;

        byteSum += byte;
        weightSum += byte * weight;
      });

      const avgFreq = byteSum / weightSum;
      const weightAvg = weightSum / data.length;

      const formattedFreq = (avgFreq + weightAvg * 2) / 3;
      setFreq(formattedFreq);
      animationRef.current = requestAnimationFrame(updateFrequency);
    };
    updateFrequency();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      toast.warning("Gravação de áudio não é suportada neste navegador.");
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
    createRecorder(audio);
    getByteData(audio);

    tickRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    recorderRef.current?.start();
  }
  async function stopRecording() {
    setIsRecording(false);
    recorderRef.current!.state !== "inactive" && recorderRef.current!.stop();
    tickRef.current && clearInterval(tickRef.current);
    cancelAnimationFrame(animationRef.current!);
    setElapsed(0);
  }
  /*Função necessária para pausar a gravação.*/
  async function pauseRecording() {
    setIsPaused((prev) => !prev);
    recorderRef.current!.pause();
    clearInterval(tickRef.current!);
  }
  /*Função necessária para retomar a gravação.*/
  async function resumeRecording() {
    setIsPaused((prev) => !prev);
    recorderRef.current!.resume();
    tickRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }
  useEffect(() => {
    return () => {
      console.log("Cleaning up...");
      tickRef.current && tickRef.current === null;
      recorderRef.current && recorderRef.current === null;
      analyserRef.current && analyserRef.current === null;
    };
  }, []);

  const time = formatRelativeTime(elapsed);

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-3">
      {!isRecording ? (
        <Button onClick={startRecording}>Gravar Audio</Button>
      ) : (
        <section className="flex relative flex-col items-center gap-2 overflow-hidden">
          {!isPaused ? (
            <Mic size={70} className="border p-2 rounded-full" />
          ) : (
            <MicOff size={70} className="border p-2 rounded-full opacity-75" />
          )}
          <div
            className={
              "absolute ease-out transition-all duration-400 bg-white/10 rounded-full"
            }
            style={{
              width: `${freq * 4}px`,
              height: `${freq * 4}px`,
              maxWidth: "200px",
              maxHeight: "200px",
            }}
          />
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
