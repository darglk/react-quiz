import React from 'react';

const totalSummary = (props) => {
    let total = props.total;
    let questionNum = props.questionLen;
    let percentage = (total / questionNum) * 100;
    return (
        <p>
            {props.playerName} total points: {total}/{questionNum} {percentage.toFixed(1)}%
        </p>
    );
};

export default totalSummary;