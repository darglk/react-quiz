import * as actionTypes from '../actions/actionTypes';

const initialState = {
    numberOfPlayers: 0,
    playerObjects: {
        name: "",
        questionAnswers: [],
        total: 0
    },
    questions: {

    },
    error: false,
    loading: false,
    success: false
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const fetchQuestionsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchQuestionsSuccess = ( state, action ) => {
    return updateObject( state, {
        questions: action.questions,
        loading: false,
        success: true
    } );
};

const fetchQuestionsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_PLAYERS_NUMBER:
        return {
            ...state,
            numberOfPlayers: parseInt(action.numberOfPlayers, 10),
        }
        case actionTypes.CHANGE_PLAYER_NAME:
        return {
            ...state,
            playerObjects: {...action.playerObjects}
        };
        case actionTypes.ANSWER_QUESTION:
        const playerObjs = {...state.playerObjects};
        const playerObj = {...playerObjs[action.userId]};
        const point = action.answer === action.correct ? 1 : 0;
        playerObj.questionAnswers = [...playerObj.questionAnswers];
        playerObj.questionAnswers.push({
            actual: action.answer,
            correct: action.correct,
            points: point
        });
        playerObj.total += point;
        playerObjs[action.userId] = playerObj;
        return {
            ...state,
            playerObjects: playerObjs
        };
        case actionTypes.FETCH_QUESTIONS_START: return fetchQuestionsStart(state, action);
        case actionTypes.FETCH_QUESTIONS_FAIL: return fetchQuestionsFail(state, action);
        case actionTypes.FETCH_QUESTIONS_SUCCESS: return fetchQuestionsSuccess(state, action);
        default: return {...state};
    }
};

export default reducer;