/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Microphone, Stop, PaperPlaneTilt } from "@phosphor-icons/react";

const AudioRecorder = ({ onSendAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        // Parar o fluxo de mídia
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = () => {
    if (audioBlob) {
      onSendAudio(audioBlob);
      setAudioBlob(null); // Limpar o estado de audioBlob após o envio
    }
  };

  return (
    <div className="audio-recorder flex gap-4">
      {isRecording ? (
        <button onClick={stopRecording} className="px-4 py-2 rounded-lg shadow-md focus:outline-none text-red-500">
          <Stop size={32} />
        </button>
      ) : (
        <button onClick={startRecording} className="  px-4 py-2 rounded-lg shadow-md  focus:outline-none  hover:text-green-500">
          <Microphone size={32} />
        </button>
      )}
      {audioBlob && (
        <button onClick={sendAudio} className="  px-4 py-2 rounded-lg shadow-md  focus:outline-none  hover:text-green-500">
          <PaperPlaneTilt size={32} />
        </button>
      )}
    </div>
  );
};

export default AudioRecorder;
