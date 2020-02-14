import React, { useState } from 'react'
import Utils from '../logic/util'
import PlayNumber from './playnumber';
import PlayAgain from './playagain';

const Game = (props) => {
    const [stars, setStars] = useState(Utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(Utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10)

    React.useEffect(() => {
        if (secondsLeft > 0 && gameStatus === 'active') {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000)

            return () => clearTimeout(timerId);
        }
    });

    const candidatesAreWrong = Utils.sum(candidateNums) > stars;
    const gameStatus = availableNums.length === 0 ?
        'won' :
        secondsLeft === 0 ? 'lost' : 'active';

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }

        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === "used" || gameStatus !== 'active') return;

        const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

        if (Utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        }
        else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n),
            );

            setStars(Utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars.
                </div>
            <div className="body">
                <div className="left">
                    {
                        gameStatus !== 'active' ?
                            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} /> :
                            Utils.range(1, stars).map(starId => {
                                return <div key={starId} className="star" />
                            })
                    }
                </div>
                <div className="right">
                    {Utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            number={number}
                            status={numberStatus(number)}
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <footer>
                Time Remaining: {secondsLeft}
            </footer>
        </div>
    );
}

export default Game;