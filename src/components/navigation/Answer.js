import React from 'react';

const answer = (props) => {
    return (
        <p>{props.playerName} answer: {props.actualKey}
            <br />
            <strong>{props.actualAnswer}</strong>
        </p>
    )
}

export default answer;