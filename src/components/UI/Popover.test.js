import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PopoverView from './Popover';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

configure({
    adapter: new Adapter()
});

describe('<Popover /> component tests', () => {

    let wrapper;

    it("should render text from props", () => {
        let question = {
            question: "Which protocol is the current Layer 3 protocol predominantly used on the Internet?",
            answers: {
                a: "IPv3",
                b: "IPv4",
                c: "IPv5",
                d: "IPv6"
            },
            correct: "b",
            explaination: "abc"
        };
        wrapper = shallow(
        <PopoverView question={question} popoverOpen={false} />);
        
        expect(wrapper.find(Popover).find(PopoverHeader).props()["children"]).toContain('Question Explaination');
        expect(wrapper.find(Popover).find(PopoverBody).props()['children']).toContain(question.explaination);
        expect(wrapper.find(Popover).props()["isOpen"]).toEqual(false);
    });
});