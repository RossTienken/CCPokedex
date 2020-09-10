import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PokeCard } from './pokeCard';

const pokemonTypes = [
  'Grass',
  'Poison',
  'Fire',
  'Flying',
  'Water',
  'Bug',
  'Normal',
  'Electric',
  'Ground',
  'Fighting',
  'Psychic',
  'Rock',
  'Ice',
  'Ghost',
  'Dragon'
]

const styles = {
  container: {

  },
  title: {
    color: '#FFCB05',
    fontSize: '4em',
    '-webkit-text-stroke': '3px #3D7DCA',
    margin: '25px 0px',
  }
}

class Battle extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <h1 className={classes.title}> Battle! </h1>
      </div>
    );
  }
}

Battle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Battle);
