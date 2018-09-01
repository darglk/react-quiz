import React, { Component } from 'react';
//import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import { Row, Col, FormGroup, Form, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class PlayersForm extends Component {

    constructor(props) {
        super(props);
        const playerObjects = {};
        for (let i = 0; i < this.props.players; i++) {
            playerObjects["player"+(i + 1)] = {
                name: "",
                questionAnswers: [],
                total: 0
            }
        }
        this.state = {
            playerNames: playerObjects
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSetPlayerNames(this.state.playerNames);
        this.props.history.push('/quiz');
    }

    handleNameChange = (event) => {
        const oldState = {...this.state.playerNames};
        const userObj = {...oldState[event.target.name]};
        userObj.name = event.target.value;
        oldState[event.target.name] = userObj;
        this.setState({playerNames: oldState});
    }


    render() {
        const playersInputs = [];
        for (let i = 0; i < this.props.players; i++) {
            playersInputs.push(
                (
                    <FormGroup key={i}>
                        <Input 
                            type="text" 
                            name={"player" + (i + 1)} 
                            placeholder={"Player " + (i + 1) + " name"}
                            onChange={this.handleNameChange} 
                            value={this.state.playerNames["player" + (i + 1)].name}
                            />
                    </FormGroup>
                )
            );
        }
        return (
        <Aux>
            <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <h1>Enter players names</h1>
                    <Form onSubmit={this.handleFormSubmit}>
                        {playersInputs}
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
        onSetPlayerNames: (playerNames) => dispatch(actions.changePlayerName(playerNames))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersForm);
