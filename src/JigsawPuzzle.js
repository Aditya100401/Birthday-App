import React from 'react';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import './JigsawPuzzle.css';

function JigsawPuzzleComponent({ onComplete }) {
    const handleSolved = () => {
    console.log("Puzzle solved!");
    onComplete();
    };

    return (
    <div className="puzzle-container">
        <JigsawPuzzle
        imageSrc={process.env.PUBLIC_URL + '/assets/puzzle-image.jpeg'}
        rows={3}
        columns={3}
        onSolved={handleSolved}
        className="jigsaw-puzzle"
        />
    </div>
    );
}

export default JigsawPuzzleComponent;