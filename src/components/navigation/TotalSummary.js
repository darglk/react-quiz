import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Progress } from 'reactstrap';

const totalSummary = (props) => {
    let total = props.total;
    let questionNum = props.questionLen;
    let percentage = (total / questionNum) * 100;
    return (
        <ListGroup>
            <ListGroupItem>
                <div className="text-center">
                    <strong>{props.playerName}</strong> total points: {' '}
                    {total} of {questionNum} ({percentage.toFixed(0)})%
                </div>
                <Progress striped value={percentage} />
            </ListGroupItem>
        </ListGroup>
    );
};

totalSummary.propTypes = {
    total: PropTypes.number,
    playerName: PropTypes.string,
    questionLen: PropTypes.number,
};

export default totalSummary;