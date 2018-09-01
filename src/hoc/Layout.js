import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Aux from './Aux';
import { withRouter } from 'react-router-dom';
class Layout extends Component {


    startQuizHandler = () => {
        this.props.history.push({pathname: '/start'});
    }

    render() {
        return (
            <Aux>
                <Jumbotron>
                    <h1 className="display-3">Welcome to IPv6 quiz app!</h1>
                    <p className="lead">
                        <Button color="primary" onClick={this.startQuizHandler}>Start</Button>
                    </p>
                </Jumbotron>
            </Aux>
        );
    }
}

export default withRouter(Layout);