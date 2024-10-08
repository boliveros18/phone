import { FC, useEffect, useState, useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Container } from "../ui/Container";
import { Profile } from "../ui/Profile";
import { IUser } from "@/interfaces";

interface Props {
  close: () => void;
  user: IUser;
}

export const Settings: FC<Props> = ({ close, user }) => {
  const [audioStream, setAudioStream] = useState<MediaStream | undefined>(
    undefined
  );
  const [error, setError] = useState("");

  const setupMicrophone = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAudioStream(stream);
    } catch (err) {
      setError("Error accessing microphone");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    setupMicrophone();
    return () => {
      audioStream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupMicrophone]);

  const speakerTest = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

  return (
    <Container
      title="Settings"
      Icon={XMarkIcon}
      onClick={() => close()}
      display={true}
    >
      <Profile user={user} />
      <div className="flex flex-col mt-12 mx-4 py-4 px-4 bg-slate-50">
        <div className="flex items-center space-x-2">
          <div className="font-medium">Setup Microphone</div>
          <span
            className={`h-3 w-3 rounded-full ring-2 ring-white ${
              !error
                ? audioStream
                  ? "bg-green-400"
                  : "bg-orange-300"
                : "bg-red-500"
            } `}
          ></span>
        </div>
        {error && <p>{error}. Grant permissions</p>}
        {audioStream
          ? !error && <p>Microphone is active</p>
          : !error && <p>Loading microphone...</p>}
      </div>
      <div className="flex flex-col mb-4 mx-4 pb-6 px-4 bg-slate-50">
        <div className="flex items-center space-x-2 mb-2">
          <div className="font-medium">Speaker test</div>
        </div>
        <button
          onClick={speakerTest}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Play Test Sound
        </button>
      </div>
    </Container>
  );
};
