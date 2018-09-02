import React from 'react';
import PropTypes from 'prop-types';

const answer = (props) => {
    return (
        <p>{props.playerName} answer: {props.actualKey}
            <br />
            <strong>{props.actualAnswer}</strong>
        </p>
    )
}
answer.propTypes = {
    playerName: PropTypes.string,
    actualKey: PropTypes.string,
    actualAnswer: PropTypes.string
};

export default answer;