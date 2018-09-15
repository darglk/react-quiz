import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import QuestionForm from './QuestionForm';
import QuizResults from '../QuizSummary/QuizResults';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends Component {
  
    state = {
        numberOfAnswers: 0,
        questionIndex: 0,
        selectedAnswer: "",
    };

    constructor(props) {
        super(props);
        this.shouldRerender = false;
    }

    shouldComponentUpdate() {
        return this.shouldRerender;
    }

    didQuizFinish = () => {
        return this.state.questionIndex >= this.props.questions.length;
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const playersNum = Object.keys(this.props.playerObjs).length;
        this.shouldRerender = true;
        if (this.state.numberOfAnswers < playersNum) {
            this.props.onAnswerQuestion("player" + (this.state.numberOfAnswers + 1), this.state.selectedAnswer, this.props.questions[this.state.questionIndex].correct);
            this.setState((prevState, props) => ({
                numberOfAnswers: (prevState.numberOfAnswers + 1) >= playersNum ? 0 : prevState.numberOfAnswers + 1,
                questionIndex: (prevState.numberOfAnswers + 1) >= playersNum ? prevState.questionIndex + 1 : prevState.questionIndex,
            })); 
        } 
    }

    handleInputChange = (event) => {
        this.shouldRerender = false;
        this.setState({selectedAnswer: event.target.value});
    }

    render() {
        const shouldRenderForm =  Object.keys(this.props.playerObjs).length > 0 
        && this.props.playerNums > 0;
        let quizForm = (<Redirect to="/" />);
        if (shouldRenderForm) {
            quizForm = (
                <Aux>
                    <h1>Quiz</h1>
                        <QuestionForm 
                            question={this.props.questions[this.state.questionIndex]} 
                            handleSubmit={this.handleFormSubmit}
                            handleChange={this.handleInputChange}
                            answering={this.props.playerObjs["player" + (this.state.numberOfAnswers + 1)]}    
                        />
                </Aux>
            );
            if (this.didQuizFinish()) {  
                quizForm = (
                    <QuizResults 
                        playerObjs={this.props.playerObjs}
                        playerNums={this.props.playerNums}
                        questions={this.props.questions}
                    />
                );
            }
        }

        return (
            <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                    {quizForm}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        playerNums: state.players.numberOfPlayers,
        playerObjs: state.players.playerObjects,
        questions: state.players.questions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerQuestion: (userId, answer, correct) => dispatch(actions.answerQuestion(userId, answer, correct))
    };
};

Question.propTypes = {
    playerNums: PropTypes.number,
    playerObjs: PropTypes.object,
    onAnswerQuestion: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
