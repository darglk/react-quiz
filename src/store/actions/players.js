import * as actionTypes from './actionTypes';

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
