import React, { Component } from 'react';
import List from './components/list';
import './App.css';

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
      <div className="App" style={styles.app}>
        <List
          pokeArr={this.state.pokeArr}
          setSelected={this.setSelected}
        />
      </div>
    );
  }
}

export default App;
