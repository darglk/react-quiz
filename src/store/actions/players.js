import * as actionTypes from './actionTypes';
import axios from 'axios';

export const changePlayersNumber = (playersNum) => {
    return {
        type: actionTypes.CHANGE_PLAYERS_NUMBER,
        numberOfPlayers: playersNum
    };
};

export const changePlayerName = (players) => {
    return {
        type: actionTypes.CHANGE_PLAYER_NAME,
        playerObjects: players
    };
};

export const answerQuestion = (userId, answer, correct) => {
    return {
        type: actionTypes.ANSWER_QUESTION,
        userId: userId,
        answer: answer,
        correct: correct
    };
};

export const fetchQuestionsSuccess = ( questions ) => {
    return {
        type: actionTypes.FETCH_QUESTIONS_SUCCESS,
        questions: questions
    };
};

export const fetchQuestionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_QUESTIONS_FAIL,
        error: error
    };
};

export const fetchQuestionsStart = () => {
    return {
        type: actionTypes.FETCH_QUESTIONS_START
    };
};

export const fetchQuestions = () => {
    return dispatch => {
        dispatch(fetchQuestionsStart());
        axios.get('https://ipv6coursequiz.firebaseio.com//questions.json')
            .then(res => {
                const fetchedQuestions = [];
                for (let key in res.data) {
                    fetchedQuestions.push( {
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchQuestionsSuccess(fetchedQuestions));
            })
            .catch(err => {
                dispatch(fetchQuestionsFail(err));
            });
    };
};
