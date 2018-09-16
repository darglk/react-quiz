import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Question from './Question';
import { Input, Form } from 'reactstrap';
import { MemoryRouter} from 'react-router-dom';
import QuizResults from '../QuizSummary/QuizResults';

configure({
    adapter: new Adapter()
});

describe('<Question /> component tests', () => {

    let wrapper;
    const store = {
        getState: () => {
            return {
                players: {
                    numberOfPlayers: 1,
                    playerObjects: {
                        player1: {
                            name: "player1",
                            questionAnswers: [{actual: "a"}],
                            total: 0
                        }
                    },
                    questions: [{
                        question: "Which protocol is the current Layer 3 protocol predominantly used on the Internet?",
                        answers: {
                            a: "IPv3",
                            b: "IPv4",
                            c: "IPv5",
                            d: "IPv6"
                        },
                        correct: "b",
                    }]
                }, 
            }
        },
        subscribe: () => {},
        dispatch: () => {},
    };

    it("should not render form when players number is less than one", () => {
        const emptyStore = {
            getState: () => {
                return {
                    players: {
                        numberOfPlayers: 0,
                        playerObjects: {}
                    }
                }
            },
            subscribe: () => {},
            dispatch: () => {},
        };
        wrapper = mount(<MemoryRouter initialEntries={['/']}>
        <Question history={[]} store={emptyStore}/></MemoryRouter>);
        expect(wrapper.find(Form)).toHaveLength(0);
    });

    it("should render form when players number is greater or equal to zero", () => {
        wrapper = mount(<MemoryRouter initialEntries={['/']}>
        <Question history={[]} store={store}/></MemoryRouter>);
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it("should render quiz results when all players answered all of the questions", () => {
        wrapper = mount(<MemoryRouter initialEntries={['/']}>
        <Question history={[]} store={store}/></MemoryRouter>);
        let event = {target: {name: "question", value: "a"}};
        wrapper.find(Input).at(1).simulate('change', event);
        wrapper.find(Form).simulate('submit');
        expect(wrapper.find(QuizResults)).toHaveLength(1);
    });
});