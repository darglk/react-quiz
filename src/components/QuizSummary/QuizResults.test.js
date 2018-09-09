import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Answers from '../Answer/Answers';
import QuizResults from './QuizResults';
import TotalSummary from './TotalSummary';

configure({
    adapter: new Adapter()
});

describe('<QuizResults /> component tests', () => {

    let wrapper;

    it("should render results with questions from props passed to the component", () => {
        const questions = [{
            question: "Which protocol is the current Layer 3 protocol predominantly used on the Internet?",
            answers: {
                a: "IPv3",
                b: "IPv4",
                c: "IPv5",
                d: "IPv6"
            },
            correct: "b",
        }];
        const playerObjs = {
            playerObjects: {
                player1: {
                    name: "player1",
                    questionAnswers: [{actual: "a"}],
                    total: 0
                }
            }
        }
        wrapper = shallow(
        <QuizResults  questions={questions} playerObjs={playerObjs}/>);
        expect(wrapper.find(Answers)).toHaveLength(1);
        expect(wrapper.find(TotalSummary)).toHaveLength(1);
    });
});