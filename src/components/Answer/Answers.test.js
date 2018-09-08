import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Answers from './Answers';
import { ListGroupItem, ListGroup } from 'reactstrap';
import Popover from '../UI/Popover';

configure({
    adapter: new Adapter()
});

describe('<Answers /> container component tests', () => {

    it("should list of questions and answers from users with explaination popover", () => {
        let playerObjs = {
            player1: {
                name: "player",
                questionAnswers: [{actual: "a"}],
                total: 1
            }
        };
        let question = {
            question: "Which protocol is the current Layer 3 protocol predominantly used on the Internet?",
            answers: {
                a: "IPv3",
                b: "IPv4",
                c: "IPv5",
                d: "IPv6"
            },
            correct: "b",
            explaination: "because god wanted that"
        };
        let wrapper = shallow(<Answers 
            playerObjs={playerObjs}
            index={0}
            question={question}
        />);
        expect(wrapper.find(ListGroup)).toHaveLength(1);
        expect(wrapper.find(ListGroupItem)).toHaveLength(2);
        expect(wrapper.find(Popover)).toHaveLength(1);
        expect(wrapper.find(ListGroupItem).at(0).html()).toContain("1. " + question.question);
        expect(wrapper.find(ListGroupItem).at(1).find('strong').text()).toContain("IPv4");
    });

    it("should list of questions and answers from users without explaination popover", () => {
        let playerObjs = {
            player1: {
                name: "player",
                questionAnswers: [{actual: "a"}],
                total: 1
            }
        };
        let question = {
            question: "Which protocol is the current Layer 3 protocol predominantly used on the Internet?",
            answers: {
                a: "IPv3",
                b: "IPv4",
                c: "IPv5",
                d: "IPv6"
            },
            correct: "b",
        };
        let wrapper = shallow(<Answers 
            playerObjs={playerObjs}
            index={0}
            question={question}
        />);
        expect(wrapper.find(ListGroup)).toHaveLength(1);
        expect(wrapper.find(ListGroupItem)).toHaveLength(2);
        expect(wrapper.find(ListGroupItem).at(0).html()).toContain("1. " + question.question);
        expect(wrapper.find(ListGroupItem).at(1).find('strong').text()).toContain("IPv4");
    });
});