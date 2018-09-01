import React, { Component } from 'react';
import Answer from './Answer';
import Aux from '../../hoc/Aux';

class Answers extends Component {

    render() {
        const answers = Object.keys(this.props.playerObjs).map(key => {
            const actualAnswerKey = this.props.playerObjs[key].questionAnswers[this.props.index].actual;
            return (
                <Answer key={key + this.props.index}
                    actualKey={actualAnswerKey}
                    playerName={this.props.playerObjs[key].name}
                    actualAnswer={this.props.question.answers[actualAnswerKey]}
                />
            )
        });
        return (
            <Aux>
                <p> {this.props.index + 1}. {this.props.question.question}</p>
                {answers}
                <p>
                    Actual answer: {this.props.question.correct} - 
                    <strong>{this.props.question.answers[this.props.question.correct]}</strong>
                </p>
            </Aux>
        );
    }
}

export default Answers;