import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';

const answer = (props) => {
    return (
        <ListGroupItem>{props.playerName} answer: {props.actualKey}
            <br />
            <strong style={{
                color: props.actualKey === props.correctAnswer ? "green" : "red"
            }}>{props.actualAnswer}</strong>
        </ListGroupItem>
    )
}
answer.propTypes = {
    playerName: PropTypes.string,
    actualKey: PropTypes.string,
    actualAnswer: PropTypes.string,
    correctAnswer: PropTypes.string
};

export default answer;