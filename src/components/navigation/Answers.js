import React, { Component } from 'react';
import Answer from './Answer';
import { ListGroup, ListGroupItem, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';

class Answers extends Component {

    state = {
        popoverOpen: false
    };

    toggle = () => {
        this.setState({popoverOpen: !this.state.popoverOpen});
    }

    render() {
        const answers = Object.keys(this.props.playerObjs).map(key => {
            const actualAnswerKey = this.props.playerObjs[key].questionAnswers[this.props.index].actual;
            return (
                <Answer key={key + this.props.index}
                    actualKey={actualAnswerKey}
                    playerName={this.props.playerObjs[key].name}
                    actualAnswer={this.props.question.answers[actualAnswerKey]}
                    correctAnswer={this.props.question.correct}
                />
            )
        });
        return (
            <Aux>
                <ListGroup>
                    <ListGroupItem active> {this.props.index + 1}. {this.props.question.question}</ListGroupItem>
                    {answers}
                    <ListGroupItem>
                        Actual answer: {this.props.question.correct} - 
                        <strong>{" " + this.props.question.answers[this.props.question.correct]}</strong>
                        {this.props.question.explaination !== undefined ? 
                            <Aux>
                                {'  '}<Button id="Popover1" size="sm" color="info" onClick={this.toggle}>Explaination</Button> 
                                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                    <PopoverHeader>Question Explaination</PopoverHeader>
                                    <PopoverBody>{this.props.question.explaination}</PopoverBody>
                                </Popover>
                            </Aux>
                            : null}
                    </ListGroupItem>
                </ListGroup>
                <br />
            </Aux>
        );
    }
}

Answers.propTypes = {
    question: PropTypes.object,
    playerObjs: PropTypes.object,
    index: PropTypes.number
};

export default Answers;