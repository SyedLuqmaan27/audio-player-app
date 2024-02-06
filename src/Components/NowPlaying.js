// NowPlaying.js
import React, { useRef, useEffect, useState } from 'react';

const NowPlaying = ({ currentFile, setCurrentFile }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && currentFile) {
      audioRef.current.src = URL.createObjectURL(currentFile.file);
      audioRef.current.currentTime = parseFloat(localStorage.getItem('currentTime')) || 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentFile]);

  useEffect(() => {
    const savePlaybackPosition = () => {
      if (audioRef.current && currentFile) {
        localStorage.setItem('currentTime', audioRef.current.currentTime);
      }
    };

    window.addEventListener('beforeunload', savePlaybackPosition);

    return () => {
      window.removeEventListener('beforeunload', savePlaybackPosition);
    };
  }, [currentFile]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <h2>Now Playing</h2>
      <p>{currentFile ? currentFile.name : 'No file selected'}</p>
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <audio
        ref={audioRef}
        controls
        onEnded={() => {
          setIsPlaying(false);
          setCurrentFile(null); // Automatically go to the next file in the playlist
        }}
      />
    </div>
  );
};

export default NowPlaying;
