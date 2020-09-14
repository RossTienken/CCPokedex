import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PokeCard from './pokeCard';


const YellowCheckbox = withStyles({
  root: {
    color: '#FFCB058F',
    '&$checked': {
      color: '#FFCB05',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

const styles = (theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    color: '#FFCB05',
    fontSize: '4em',
    '-webkit-text-stroke': '3px #3D7DCA',
    margin: '25px 0px',
  },
  listContainer: {
    margin: 'auto',
    padding: 15,
    width: '90%',
    height: 'fit-content',
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  optionsContainer: {
    marginBottom: 10,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refineContainer: {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refineButton: {
    height: 39,
    width: 240,
    cursor: 'pointer',
    color: '#FFCB05',
    fontSize: '1.5em',
    '-webkit-text-stroke': '.75px #3D7DCA',
    background: '#cc4f4f',
    borderRadius: 3,
    border: '#FFCB05 solid 2px',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  refineItem: {
    maxWidth: '40%',
  },
  refineTypes: {
    color: '#424242',
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  refineTitle: {
    margin: '5px 0px',
    color: '#FFCB05',
    fontSize: '1.3em',
    '-webkit-text-stroke': '.75px #3D7DCA',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '#FFCB05 solid 2px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    width: 240,
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    color: 'white',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  clearButton: {
    height: 39,
    width: 240,
    cursor: 'pointer',
    color: '#FFCB05',
    fontSize: '1.5em',
    '-webkit-text-stroke': '.75px #3D7DCA',
    background: '#cc4f4f',
    borderRadius: 3,
    border: '#FFCB05 solid 2px',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  }
})

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredPokemon: null,
      searchedPokemon: null,
      filters: {
        types: [],
        weaknesses: []
      },
      filtExpanded: false
    }
  }

  handleExpandClick = () => {
    this.setState(prevState => ({ filtExpanded: !prevState.filtExpanded }))
  }

  handleChange = (filter, type) => {
    let filterSet = new Set(this.state.filters[filter])

    filterSet.has(type) ? filterSet.delete(type) : filterSet.add(type)

    let newFilters = [...filterSet]

    this.setState(prevState => ({
      filters: {                   // object that we want to update
          ...prevState.filters,    // keep all other key-value pairs
          [filter]: newFilters       // update the value of specific key
      }
    }),
      this.filterPokemon // run filter after setState
    )
  }

  filterPokemon = () => {
    const { pokeArr } = this.props
    const { filters } = this.state

    const filteredArr = pokeArr.filter(poke => {
      let checkType = filters.types.every(type => poke.type.includes(type))
      let checkWeak = filters.weaknesses.every(weak => poke.weaknesses.includes(weak))

      return checkType && checkWeak
    })

    this.setState({ filteredPokemon: filteredArr })
  }

  searchPokemon = (event) => {
    const { pokeArr } = this.props
    let { filteredPokemon, filters } = this.state

    let search = event.target.value

    // determine if filters are present
    let areFilters = false
    if(filters.types.length > 0 || filters.weaknesses.length > 0) areFilters = true


    if(!search && !areFilters) {
      this.setState({ filteredPokemon: null, searchedPokemon: null })
      return
    }

    // if no filters are currently present, search from all pokemon
    if(!areFilters) {
      let searchAll = pokeArr.filter(poke => {
        return poke.name.toLowerCase().includes(search)
      })

      this.setState({ filteredPokemon: searchAll })
    }
    else {

      let searchFilt = filteredPokemon.filter(poke => {
        return poke.name.toLowerCase().includes(search)
      })
      this.setState({ searchedPokemon: searchFilt })
    }
  }

  filterSection = () => {
    const { classes } = this.props;

    return (
      <div className={classes.refineContainer}>
        <div className={classes.refineItem}>
          <h2 className={classes.refineTitle}> Type </h2>
          <div className={classes.refineTypes}>
            {pokemonTypes.map(type => {
              let isChecked = this.state.filters.types.includes(type)

              return (
                <FormControlLabel
                  key={type}
                  control={
                    <YellowCheckbox
                      checked={isChecked}
                      onChange={() => this.handleChange('types', type)}
                      name={type}
                    />
                  }
                  label={type}
                />
              )
            })}
          </div>
        </div>
        <div className={classes.refineItem}>
          <h2 className={classes.refineTitle}> Weakness </h2>
          <div className={classes.refineTypes}>
            {pokemonTypes.map(type => {
              let isChecked = this.state.filters.weaknesses.includes(type)

              return (
                <FormControlLabel
                  key={type}
                  control={
                    <YellowCheckbox
                      checked={isChecked}
                      onChange={() => this.handleChange('weaknesses', type)}
                      name={type}
                    />
                  }
                  label={type}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  isFiltered = () => {
    let { filteredPokemon, searchedPokemon } = this.state

    // return searchedPokemon if present, then filteredPokemon, and last pokeArr if neither are present
    if(searchedPokemon) return searchedPokemon
    if(filteredPokemon) return filteredPokemon
    else return this.props.pokeArr
  }

  clearAll = () => {
    this.setState({
      filteredPokemon: null,
      searchedPokemon: null,
      filters: {
        types: [],
        weaknesses: []
      },
      filtExpanded: false
    })

    document.getElementById('searchBar').value = ''

  }

  render() {
    const { classes } = this.props;

    // determine which pokemon cards to show, based on filters
    let cardsToShow = this.isFiltered()

    return (
      <div className={classes.container}>
        <h1 className={classes.title}> Pokédex </h1>
        <div className={classes.optionsContainer}>
          <div className={classes.search}>
            <InputBase
              id='searchBar'
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={this.searchPokemon}
            />
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          </div>
          <button
            className={classes.refineButton}
            onClick={() => this.handleExpandClick()}
          >
            Filters
            <ExpandMoreIcon className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.filtExpanded,
            })} />
          </button>
          <button
            className={classes.clearButton}
            onClick={() => this.clearAll()}
          >
            Clear All
          </button>
        </div>
        { this.state.filtExpanded ? this.filterSection() : null}
        <div className={classes.listContainer}>
          {cardsToShow.map(pokemon => (
            <PokeCard
              key={pokemon.name}
              pokeArr={this.props.pokeArr}
              pokemon={pokemon}
              setSelected={this.props.setSelected}
            />
          ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);
