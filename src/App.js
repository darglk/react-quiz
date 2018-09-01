import React, { Component } from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout';
import NavigationBar from './components/navigation/NavigationBar';
import PlayersNumForm from './components/navigation/PlayersNumForm';
import Aux from './hoc/Aux';
import './App.css';
import { Container } from 'reactstrap';
import PlayersForm from './components/navigation/PlayersForm';
import Question from './components/navigation/Question';

class App extends Component {
  render() {
    return (
      <Aux>
        <NavigationBar></NavigationBar>
        <Container>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Layout} />
              <Route path="/start" component={PlayersNumForm} />
              <Route path="/players" component={PlayersForm} />
              <Route path="/quiz" component={Question} />
            </Switch>
          </BrowserRouter>
        </Container>
      </Aux>
    );
  }
}

export default App;
