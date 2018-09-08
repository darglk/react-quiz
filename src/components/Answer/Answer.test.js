import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Answer from './Answer';
import { ListGroupItem } from 'reactstrap';

configure({
    adapter: new Adapter()
});

describe('<Answer /> func component tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Answer />);
    });

    it("should display user name, answer and answer should have green font color", () => {
        wrapper.setProps({
            playerName: 'testuser',
            actualKey: "a",
            correctAnswer: "a",
            actualAnswer: "a"
        });
        expect(wrapper.find(ListGroupItem)).toHaveLength(1);
        const strongTag = wrapper.find('strong');
        const strongColor = strongTag.props()["style"]["color"];
        expect(strongColor).toEqual('green');
        expect(strongTag.text()).toContain('a');
    });

    it("should display user name, answer and answer should have red font color", () => {
        wrapper.setProps({
            playerName: 'testuser',
            actualKey: "a",
            correctAnswer: "b",
            actualAnswer: "b"
        });
        expect(wrapper.find(ListGroupItem)).toHaveLength(1);
        const strongTag = wrapper.find('strong');
        const strongColor = strongTag.props()["style"]["color"];
        expect(strongColor).toEqual('red');
        expect(wrapper.find(ListGroupItem).html()).toContain('testuser answer: a');
        expect(strongTag.text()).toContain('b');
    });
});