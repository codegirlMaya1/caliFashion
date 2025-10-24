import { useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function useVoice() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [samuelSpeaking, setSamuelSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = async (text: string, speaker: string = "Samuel") => {
    if (!text || samuelSpeaking) return; // prevent overlap
    setSamuelSpeaking(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    try {
      const res = await fetch("http://localhost:5000/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, speaker }),
      });
      if (!res.ok) throw new Error(await res.text());

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setSamuelSpeaking(false);
        // Only start listening AFTER greeting ends
        if (hasGreeted) startListening();
      };

      await audio.play();
    } catch (err) {
      console.error("Speech playback failed:", err);
      setSamuelSpeaking(false);
    }
  };

  const startListening = async () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (samuelSpeaking) return; // don’t start while speaking
    resetTranscript();
    await SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // ❌ Removed auto-start mic warm-up to prevent autoplay issues

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    speak,
    samuelSpeaking,
    hasGreeted,
    setHasGreeted,
  };
}