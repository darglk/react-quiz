import React from 'react';
import PropTypes from 'prop-types';

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

totalSummary.propTypes = {
    total: PropTypes.number,
    playerName: PropTypes.string,
    questionLen: PropTypes.number,
};

export default totalSummary;