import React, { useState, useCallback, useRef, useEffect } from 'react';
import JigsawPuzzleComponent from './JigsawPuzzle';
import './App.css';

function App() {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [showGiftContent, setShowGiftContent] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [frontImage, setFrontImage] = useState('picture-1');
  const audioRef = useRef(null);

  const handlePuzzleComplete = useCallback(() => {
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

  const swapImages = useCallback(() => {
    setFrontImage(prev => prev === 'picture-1' ? 'picture-2' : 'picture-1');
  }, []);

  // Use effect to handle puzzle completion
  useEffect(() => {
    if (isPuzzleSolved) {
      console.log("Puzzle is solved!");
    }
  }, [isPuzzleSolved]);

  return (
    <div className="app-container">
      <audio ref={audioRef} loop>
        <source src={process.env.PUBLIC_URL + '/assets/Nat King Cole sings _When I Fall in Love_.mp3'} type="audio/mpeg" />
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
                  <h1>Happy Birthday Sunflower!! 🌻 </h1>
                  <h2>I love you so much and I hope you have a great day and you're 23 hehe old</h2>
                  <p>Click on the picture to see the next one</p>
                  <div className="images-container">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/picture-1.jpeg'}
                    alt="Birthday celebration 1"
                    className={`photo-card ${frontImage === 'picture-1' ? 'front' : 'back'}`}
                    onClick={swapImages}
                  />
                  <img
                    src={process.env.PUBLIC_URL + '/assets/picture-2.jpeg'}
                    alt="Birthday celebration 2"
                    className={`photo-card ${frontImage === 'picture-2' ? 'front' : 'back'}`}
                    onClick={swapImages}
            />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;