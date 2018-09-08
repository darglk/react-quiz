import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayersNumForm from './PlayersNumForm';
import { Input, Form, Alert } from 'reactstrap';
import { MemoryRouter} from 'react-router-dom';

configure({
    adapter: new Adapter()
});

describe('<PlayersNumForm /> component tests', () => {

    let wrapper;
    const store = {
        getState: () => {
            return {
                players:{
                    numberOfPlayers: 1,
                }, 
            }
        },
        subscribe: () => {},
        dispatch: () => {},
    };

    it("should append to history on submit", () => {
        wrapper = mount(<MemoryRouter initialEntries={['/']}>
        <PlayersNumForm history={[]} store={store}/></MemoryRouter>);
        let event = {target: {name: "playersNum", value: 2}};
        wrapper.find(Input).at(0).simulate('change', event);
        expect(wrapper.find(Input).props()['value']).toEqual(2);
        expect(wrapper.props()['children']['props']['history'].length).toEqual(0);
        wrapper.find(Form).simulate('submit');
        expect(wrapper.props()['children']['props']['history'].length).toEqual(1);
    });
});