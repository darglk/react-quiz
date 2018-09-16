import reducer from './players';
import * as actionTypes from '../actions/actionTypes';

describe('players reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            numberOfPlayers: 0,
            playerObjects: {
                name: "",
                questionAnswers: [],
                total: 0
            },
            questions: {},
            error: false,
            loading: false,
            success: false
        });
    });

    it('should return new number of players', () => {
        const initialState = {
            numberOfPlayers: 0,
            playerObjects: {
                name: "",
                questionAnswers: [],
                total: 0
            }
        };
        expect(reducer(initialState, {
            type: actionTypes.CHANGE_PLAYERS_NUMBER,
            numberOfPlayers: 5
        })).toEqual({
            ...initialState,
            numberOfPlayers: 5
        });
    });

    it('should return state with user names', () =>{
        const initialState = {
            numberOfPlayers: 0,
            playerObjects: {
                name: "",
                questionAnswers: [],
                total: 0
            }
        };
        const playerObjs = {
            player1: {
                name: "test",
                questionAnswers: [],
                total: 0
            },
            player2: {
                name: "test2",
                questionAnswers: [],
                total: 0
            }
        };
        expect(reducer(initialState, {
            type: actionTypes.CHANGE_PLAYER_NAME,
            playerObjects: playerObjs
        })).toEqual({
            ...initialState,
            playerObjects: {...playerObjs}
        });
    });

    it('should increment total points value when answer is correct', () => {
        const initialState = {
            numberOfPlayers: 0,
            playerObjects: {
                player1: {
                    name: "test",
                    questionAnswers: [],
                    total: 0
                },
            }
        };
        const result = reducer(initialState, {
            type: actionTypes.ANSWER_QUESTION,
            userId: "player1",
            answer: "a",
            correct: "a"
        });
        expect(result.playerObjects.player1.total).toEqual(1);
    });

    it('should not increment total points value when answer is correct', () => {
        const initialState = {
            numberOfPlayers: 0,
            playerObjects: {
                player1: {
                    name: "test",
                    questionAnswers: [],
                    total: 0
                },
            }
        };
        const result = reducer(initialState, {
            type: actionTypes.ANSWER_QUESTION,
            userId: "player1",
            answer: "a",
            correct: "b"
        });
        expect(result.playerObjects.player1.total).toEqual(0);
    });

    it('should test start of fetching questions', () => {
        const initialState = {
            numberOfPlayers: 0,
            playerObjects: {
                name: "",
                questionAnswers: [],
                total: 0
            },
            questions: {},
            error: false,
            loading: false,
            success: false
        };
        const result = reducer(initialState, {
            type: actionTypes.FETCH_QUESTIONS_START
        });
        expect(result.loading).toEqual(true);
    });

    it('should test successful question fetching', () => {
        const initialState = {
            numberOfPlayers: 0,
            playerObjects: {
                name: "",
                questionAnswers: [],
                total: 0
            },
            questions: {},
            error: false,
            loading: false,
            success: false
        };
        const result = reducer(initialState, {
            type: actionTypes.FETCH_QUESTIONS_SUCCESS,
            questions: {},
        });
        expect(result.loading).toEqual(false);
        expect(result.success).toEqual(true);
    });

    it('should test unsuccessful question fetching', () => {
        const initialState = {
            numberOfPlayers: 0,
            playerObjects: {
                name: "",
                questionAnswers: [],
                total: 0
            },
            questions: {},
            error: false,
            loading: false,
            success: false
        };
        const result = reducer(initialState, {
            type: actionTypes.FETCH_QUESTIONS_FAIL,
        });
        expect(result.loading).toEqual(false);
        expect(result.success).toEqual(false);
    });
});