import React from 'react'

const PlayAgain = props => (
    <div className="game-done">
        <h3 className="message" style={{ color: props.gameStatus === 'lost' ? "red" : "green" }}>
            {props.gameStatus === 'lost' ? "Game Over!" : "You win!"}
        </h3>

        <button onClick={props.onClick} >Play Again!</button>
    </div>
);

export default PlayAgain;