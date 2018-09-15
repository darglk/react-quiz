import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import { Row, Col, FormGroup, Form, Input, Button, Alert, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import withErrorHandler from '../../hoc/WithErrorHandler';
import Spinner from '../UI/Spinner';

export class PlayersForm extends Component {

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
            playerNames: playerObjects,
            showAlert: false,
            canSubmit: false,
        }
        this.inputs = [];        
    }

    componentDidUpdate() {
        if (this.props.fetchSuccess) {
            this.props.history.push('/quiz');
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.canSubmit) {
            this.props.onSetPlayerNames(this.state.playerNames);
            this.props.onFetchQuestions();
        }
    }

    setInputFrame = (event, didNotMatch) => {
        const inp = this.inputs.find(input => {
            return input.props.name === event.target.name
        });
        inp.invalid = didNotMatch;
    }

    validateName = (name, event) => {
        const regex = /^[A-Za-z]+$/gm;
        const didNotMatch = !regex.test(name);
        if (didNotMatch) {
            this.setState({showAlert: true});
            this.setState({canSubmit: false})
        } else {
            this.setState({showAlert: false});
            this.setState({canSubmit: true})
        }
        this.setInputFrame(event, didNotMatch);
    }

    handleNameChange = (event) => {
        const oldState = {...this.state.playerNames};
        const userObj = {...oldState[event.target.name]};
        userObj.name = event.target.value;
        oldState[event.target.name] = userObj;
        this.validateName(userObj.name, event);
        this.setState({playerNames: oldState});
    }

    render() {
        let form = (
            <Redirect to="/" />
        );
        if (!this.props.loading && !this.props.fetchSuccess) {
            const playersInputs = [];  
            for (let i = 0; i < this.props.players; i++) {
                let invalidForm = false 
                if (this.inputs[i] !== null ) {
                    invalidForm = this.inputs[i] !== undefined && this.inputs[i].invalid;
                }
                playersInputs.push(
                    (
                        <FormGroup key={i}>
                            {invalidForm ? <Alert color="danger">Name can contain only letters</Alert> : null }
                            <Input 
                                type="text" 
                                name={"player" + (i + 1)} 
                                placeholder={"Player " + (i + 1) + " name"}
                                onChange={this.handleNameChange} 
                                value={this.state.playerNames["player" + (i + 1)].name}
                                ref={(inp) => {this.inputs[i] = inp}}
                                invalid={invalidForm}
                                />
                        </FormGroup>
                    )
                );
            }
            if (this.props.players > 0) {
                form = (
                    <Aux>
                        <Row>
                            <Col sm="12" md={{ size: 8, offset: 2 }}>
                                <br />
                                <ListGroupItem active>Enter player names</ListGroupItem>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Form onSubmit={this.handleFormSubmit}>
                                            {playersInputs}
                                            <Button type="submit" disabled={!this.state.canSubmit}>Submit</Button>
                                        </Form>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Aux>
                );
            }
        } else {
            form = (
                <Spinner />
            );
        }
        return (
            form
        );
    }
}

const mapStateToProps = state => {
    return {
        players: state.players.numberOfPlayers,
        loading: state.players.loading,
        fetchSuccess: state.players.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetPlayerNames: (playerNames) => dispatch(actions.changePlayerName(playerNames)),
        onFetchQuestions: () => dispatch(actions.fetchQuestions())
    };
};

PlayersForm.propTypes = {
    players: PropTypes.number,
    onSetPlayerNames: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PlayersForm, axios));
