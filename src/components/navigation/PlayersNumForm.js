import React, { Component } from 'react';
//import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import { Row, Col, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class PlayersNumForm extends Component {
  
    state = {
        numberOfPlayers: 1
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.onChangeNumberOfPlayers(this.state.numberOfPlayers);
        this.props.history.push('/players');
    }

    handleInputChange = (event) => {
        this.setState({numberOfPlayers: event.target.value});
    }

    render() {
        return (
        <Aux>
            <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <h1>How many players are going to play?</h1>
                    <Form onSubmit={this.handleFormSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">Number of players</Label>
                            <Input 
                                type="number" 
                                name="playersNum" 
                                id="playersNum" 
                                placeholder="No of players" 
                                min="1"
                                value={this.state.numberOfPlayers}
                                onChange={this.handleInputChange}
                                />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        players: state.players.numberOfPlayers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeNumberOfPlayers: (num) => dispatch(actions.changePlayersNumber(num))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersNumForm);
