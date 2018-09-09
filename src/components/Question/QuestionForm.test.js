import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionForm from './QuestionForm';
import { Input, Form } from 'reactstrap';
import { MemoryRouter} from 'react-router-dom';

configure({
    adapter: new Adapter()
});

describe('<QuestionForm /> component tests', () => {

    let wrapper;

    it("should render questions from props passed to the component", () => {
        const question = {
            answers: {
                a: "a",
                b: "b",
            },
            question: "Question title"
        };
        const answering = {
            name: "Name"
        }
        wrapper = mount(<MemoryRouter initialEntries={['/']}>
        <QuestionForm history={[]} question={question} answering={answering}/></MemoryRouter>);
        expect(wrapper.find(Form)).toHaveLength(1);
        expect(wrapper.find(Input)).toHaveLength(4);
        expect(wrapper.find(Input).at(1).props()['placeholder']).toContain("a: a");
        expect(wrapper.find(Input).at(3).props()['placeholder']).toContain("b: b");
        expect(wrapper.find(Form).find('h4').text()).toEqual('Now, Name is answering the question.');
    });
});