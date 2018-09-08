import reducer from './players';
import * as actionTypes from '../actions/actionTypes';

describe('players reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({//{type: actionTypes.INIT_STH}
            numberOfPlayers: 0,
            playerObjects: {
                name: "",
                questionAnswers: [],
                total: 0
            }
        });
    });
});