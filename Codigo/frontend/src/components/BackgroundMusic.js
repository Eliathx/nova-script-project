import React, { useEffect, useState } from 'react';

const BackgroundMusic = ({musicStatus}) => {
  const [isPlaying, setIsPlaying] = useState(musicStatus);
  const [volume, setVolume] = useState(0.1); // Volumen inicial al 25%

  useEffect(() => {
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
      backgroundMusic.volume = volume;
      if (isPlaying) {
        backgroundMusic.play();
      } else {
        backgroundMusic.pause();
      }
    }
  }, [isPlaying, volume]);

  const togglePlayMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div>
      <button onClick={togglePlayMusic} style={{ position: 'fixed', bottom: '25px', right: '25px', fontSize: '0.75rem', padding: '8px', zIndex:1000 }}>
        {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
      </button>
      <input 
        type="range" 
        min="0.05" 
        max="0.2" 
        step="0.01" 
        value={volume} 
        onChange={handleVolumeChange} 
        style={{ 
          position: 'fixed', 
          bottom: '70px', 
          right: '25px', 
          zIndex: 1000, 
          width: '125px',
          opacity: '0.5', 
          transition: 'opacity .2s'
        }}
      />
      <audio id="background-music" loop>
        <source src="music.mp3" type="audio/mpeg"></source>
        Tu navegador no soporta la etiqueta de audio.
      </audio>
    </div>
  );
};

export default BackgroundMusic;