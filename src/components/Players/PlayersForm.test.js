import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayersForm from './PlayersForm';
import { Input, Form, Alert } from 'reactstrap';
import { MemoryRouter} from 'react-router-dom';
import  Spinner from '../UI/Spinner';

configure({
    adapter: new Adapter()
});

describe('<PlayersForm /> component tests', () => {

    let wrapper;
    const store = {
        getState: () => {
            return {
                players:{
                    numberOfPlayers: 2,
                }, 
            }
        },
        subscribe: () => {},
        dispatch: () => {},
    };

    it("should redirect when players num is zero", () => {
        wrapper = shallow(<MemoryRouter initialEntries={['/']}><PlayersForm store={store}/></MemoryRouter>);
        expect(wrapper.find(Form)).toHaveLength(0);
    });

    it("should render form when players num is greater than zero and display alert for invalid input data", () => {
        wrapper = mount(<MemoryRouter initialEntries={['/']}><PlayersForm history={[]} store={store}/></MemoryRouter>);

        expect(wrapper.find(Form)).toHaveLength(1);
        expect(wrapper.find(Input)).toHaveLength(2);
        let event = {target: {name: "player1", value: "inv4lid"}};
        expect(wrapper.find(Input).at(0).props()["invalid"]).toEqual(false);
        expect(wrapper.find(Input).at(1).props()["invalid"]).toEqual(false);
        wrapper.find(Input).at(0).simulate('change', event);
        expect(wrapper.find(Alert)).toHaveLength(1);
        expect(wrapper.find(Input).at(0).props()["invalid"]).toEqual(true);
        event["target"]["name"] = "player2";
        event["target"]["value"] = "inval2";
        wrapper.find(Input).at(1).simulate('change', event);
        expect(wrapper.find(Alert)).toHaveLength(2);
        expect(wrapper.find(Input).at(0).props()["invalid"]).toEqual(true);
        expect(wrapper.find(Input).at(1).props()["invalid"]).toEqual(true);
        
        expect(wrapper.find('button').props()['disabled']).toEqual(true);
        event = {target: {name: "player1", value: "Notivalid"}};
        wrapper.find(Input).at(0).simulate('change', event);
        event = {target: {name: "player2", value: "Notivalid"}};
        wrapper.find(Input).at(1).simulate('change', event);
        expect(wrapper.find('button').props()['disabled']).toEqual(false);

        expect(wrapper.props()['children']['props']['history'].length).toEqual(0);
        wrapper.find(Form).simulate('submit');
    });

    it('should render spinner when page is loading and fetch is success', () => {
        const mockStore = {
            getState: () => {
                return {
                    players:{
                        numberOfPlayers: 2,
                        success: true,
                        loading: true 
                    }, 
                }
            },
            subscribe: () => {},
            dispatch: () => {},
        };
        
        wrapper = mount(<MemoryRouter initialEntries={['/']}><PlayersForm history={[]} store={mockStore}/></MemoryRouter>);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('should render spinner when page is loading and fetch is not success', () => {
        const mockStore = {
            getState: () => {
                return {
                    players:{
                        numberOfPlayers: 2,
                        success: false,
                        loading: true 
                    }, 
                }
            },
            subscribe: () => {},
            dispatch: () => {},
        };
        
        wrapper = mount(<MemoryRouter initialEntries={['/']}><PlayersForm history={[]} store={mockStore}/></MemoryRouter>);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('should render spinner when page is not loading and fetch is success', () => {
        const mockStore = {
            getState: () => {
                return {
                    players:{
                        numberOfPlayers: 2,
                        success: false,
                        loading: true 
                    }, 
                }
            },
            subscribe: () => {},
            dispatch: () => {},
        };
        
        wrapper = mount(<MemoryRouter initialEntries={['/']}><PlayersForm history={[]} store={mockStore}/></MemoryRouter>);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});