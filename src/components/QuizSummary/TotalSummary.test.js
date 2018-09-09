import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TotalSummary from './TotalSummary';
import { ListGroup, ListGroupItem, Progress } from 'reactstrap';

configure({
    adapter: new Adapter()
});

describe('<TotalSummary /> component tests', () => {

    let wrapper;

    it("should render short summary from props passed to the component", () => {
        let playerName = "Player1";
        let total = 2;
        let questionLen = 2;
        wrapper = shallow(
        <TotalSummary playerName={playerName} total={total} questionLen={questionLen} />);
        expect(wrapper.find('div').text()).toContain('Player1 total points:  2 of 2 (100)%');
        expect(wrapper.find(ListGroup).find(ListGroupItem).find(Progress).props()['value']).toEqual(100);
    });
});