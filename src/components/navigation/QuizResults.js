import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

class QuizResults extends Component {
    render() {
        console.log(this.props);
        let content = this.props.questions.map((question, index) => {
           return (
                <Aux key={question.question + index}>
                    <p> {index + 1}. {question.question}</p>
                    {
                        Object.keys(this.props.playerObjs).map(key => {
                            const actualAnswer = this.props.playerObjs[key].questionAnswers[index].actual;
                            return (
                                <p key={key + index}>{this.props.playerObjs[key].name} answer: {actualAnswer}
                                    <br />
                                    <strong>{question.answers[actualAnswer]}</strong>
                                </p>
                            )
                        })
                    }
                    <p>Actual answer: {question.correct} - <strong>{question.answers[question.correct]}</strong></p>
                </Aux>
           );
        });
        let totalPoints = Object.keys(this.props.playerObjs).map(key => {
            let total = this.props.playerObjs[key].total;
            let questionNum = this.props.questions.length;
            let percentage = (total / questionNum) * 100;
            return (
                <p key={key}>{this.props.playerObjs[key].name} total points: {total}/{questionNum} {percentage.toFixed(1)}%</p>
            );
        });
        return (
            <Aux>
                <h1>Results of quiz</h1>
                {content}
                {totalPoints}
            </Aux>
        );
    }
}

export default QuizResults;
