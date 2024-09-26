import React, { useState, useCallback, useRef } from 'react';
import JigsawPuzzleComponent from './JigsawPuzzle';
import './App.css';

function App() {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [showGiftContent, setShowGiftContent] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePuzzleComplete = useCallback(() => {
    console.log("Puzzle completed callback triggered");
    setIsPuzzleSolved(true);
  }, []);

  const handleGiftBoxClick = useCallback(() => {
    setShowGiftContent(true);
    // Start playing music when gift is opened
    if (audioRef.current) {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="app-container">
      <audio ref={audioRef} loop>
        <source src={process.env.PUBLIC_URL + '/assets/NMIXX Young Dumb Stupid.mp3'} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <button onClick={toggleMusic} className="music-toggle">
        {isMusicPlaying ? '🔇 Mute' : '🔊 Play Music'}
      </button>

      <iframe 
        src="https://giphy.com/embed/aorAs0VoAlCmY" 
        width="100%" 
        height="100%" 
        className="background-gif" 
        allowFullScreen
        title="Background Animation"
      ></iframe>
      <div className="content-wrapper">
        <h1 className={isPuzzleSolved ? 'fade-out' : ''}>Welcome to your Birthday Celebracion Ammu Manya!!!</h1>
        
        <div className={`jigsaw-puzzle ${isPuzzleSolved ? 'solved' : ''}`}>
          {!isPuzzleSolved && <JigsawPuzzleComponent onComplete={handlePuzzleComplete} />}
        </div>

        {isPuzzleSolved && (
          <div className={`congrats-container ${showGiftContent ? '' : 'active'}`}>
            <h2>Yayyy Congratulations!!! I knew you were always smart even though I call you useless</h2>
            <p>Click and see what I have prepared for you.</p>
            <img
              src={process.env.PUBLIC_URL + '/assets/Giftbox Emoji.webp'}
              alt="Gift Box"
              className="gift-box"
              onClick={handleGiftBoxClick}
            />
          </div>
        )}

        {showGiftContent && (
          <div className="gift-content active">
            <h1>Happy Birthday Sunflower!! 🌻</h1>
            <div className="images-container">
              <img
                src={process.env.PUBLIC_URL + '/assets/picture-1.jpeg'}
                alt="Birthday celebration"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;