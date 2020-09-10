import React, { Component } from 'react';
import { Battle, List } from './components';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const styles = {
  app: {
    padding: '1em 2em',
    minHeight: '96vh'
  }
}

class App extends Component {
  state = {
    pokeArr: [],
    selectedPoke: null,
  }

  componentDidMount() {
    // run this.getPokemon() to fetch the pokemon on startup
    this.getPokemon()

    // set state of selectedPoke to null on startup
    this.setState({ selectedPoke: null })
  }

  getPokemon = () => {
    // fetch pokemon from external api, and set state with results
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ pokeArr: data.pokemon })
      });
  }

  setSelected = (id) => {
    const { pokeArr } = this.state
    // the ids of the pokemon start at 1, so adjust index for array (starts at 0)
    let selectedPokemon = pokeArr[(id - 1)]

    // set state with new selected pokemon
    this.setState({ selectedPoke: selectedPokemon })
  }

  render() {
    return (
      <Router>
        <div className="App" style={styles.app}>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/battle">
              <Battle
                pokeArr={this.state.pokeArr}
                selectedPoke={this.state.selectedPoke}
              />
            </Route>
            <Route path="/">
              <List
                pokeArr={this.state.pokeArr}
                setSelected={this.setSelected}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
