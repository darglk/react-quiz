import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import TotalSummary from './TotalSummary';
import Answers from './Answers';
import PropTypes from 'prop-types';

class QuizResults extends Component {
    render() {
        let content = this.props.questions.map((question, index) => {
           return (
               <Answers 
                    key={question.question + index}
                    playerObjs={this.props.playerObjs}
                    question={question}
                    index={index}
               />
           );
        });
        let totalPoints = Object.keys(this.props.playerObjs).map(key => {
            return (
                <TotalSummary 
                    key={key}
                    playerName={this.props.playerObjs[key].name}
                    questionLen={this.props.questions.length}
                    total={this.props.playerObjs[key].total}
                />
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

QuizResults.propTypes = {
    playerObjs: PropTypes.object,
    questions: PropTypes.array
};

export default QuizResults;
