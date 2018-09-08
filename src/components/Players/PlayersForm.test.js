import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayersForm from './PlayersForm';
import { ListGroupItem } from 'reactstrap';

configure({
    adapter: new Adapter()
});

describe('<PlayersForm /> component tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PlayersForm />);
    });

    it("should display user name, answer and answer should have green font color", () => {
        
    });
});