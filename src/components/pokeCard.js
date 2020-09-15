import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const pokeTypeColors = {
  'Grass': { dark: '#4E8234', light: '#A7DB8D' },
  'Poison': { dark: '#682A68', light: '#C183C1' },
  'Fire': { dark: '#9C531F', light: '#F5AC78' },
  'Flying': { dark: '#6D5E9C', light: '#C6B7F5' },
  'Water': { dark: '#445E9C', light: '#9DB7F5' },
  'Bug': { dark: '#6D7815', light: '#C6D16E' },
  'Normal': { dark: '#6D6D4E', light: '#C6C6A7' },
  'Electric': { dark: '#A1871F', light: '#FAE078' },
  'Ground': { dark: '#927D44', light: '#EBD69D' },
  'Fighting': { dark: '#7D1F1A', light: '#D67873' },
  'Psychic': { dark: '#A13959', light: '#FA92B2' },
  'Rock': { dark: '#786824', light: '#D1C17D' },
  'Ice': { dark: '#638D8D', light: '#BCE6E6' },
  'Ghost': { dark: '#493963', light: '#A292BC' },
  'Dragon': { dark: '#4924A1', light: '#A27DFA' }
}

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
  root: {
    marginBottom: 15,
    padding: '5px 7px',
    height: 'fit-content',
    width: '30%',
    color: '#424242',
    border: '5px solid #FFCB05',
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    },
  },
  cardTop: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
  },
  pokeName: {
    margin: 0,
  },
  pokeNum: {
    margin: 0,
  },
  imgContainer: {
    borderRadius: 3,
    border: '3px solid #FFCB05'
  },
  pokeImg: {
    height: 120,
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  evoContainer: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('lg')]: {
      flexFlow: 'row',
      alignItems: 'center',
    },
  },
  evoItem: {
    width: '100%',
  },
  evoPokeContainer: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('lg')]: {
      flexFlow: 'row',
      alignItems: 'center',
    },
  },
  evoImg: {
    height: 85,
    width: 85,
  },
  cardActions: {
    padding: 0,
    paddingTop: 5,
    borderTop: '1px solid #616161',
  },
  infoTitle: {
    margin: '10px 0px',
  },
  infoDesc: {
    margin: 0,
    fontSize: 12
  },
  pokeSizeContainer: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column',
      alignItems: 'center',
    },
  },
  pokeSize: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    border: 'none',
    background: '#9a9a9a',
  },
})

class PokeCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  handleExpandClick = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }))
  }

  getPokeEvo = (evoType, evoArr) => {
    const { classes, pokeArr } = this.props

    // Set evolution title based on type from props, and make plural if more than one
    let evoPlural = evoArr.length > 1 ? 'evolutions' : 'evolution'
    let evoString = `${evoType} ${evoPlural}: `

    return (
      <div className={classes.evoItem}>
        <h5 className={classes.infoTitle}> {evoString} </h5>
        <div className={classes.evoPokeContainer}>
          {evoArr.map(poke => (
            <div className={classes.evoPoke} key={evoType + poke.num} >
              <img
                className={classes.evoImg}
                src={pokeArr[(poke.num - 1)].img}
                alt={poke.name}
              />
              <p className={classes.infoDesc}> {poke.name} </p>
            </div>
          ))}
        </div>
      </div>
    )
  }


  render() {
    const { classes, pokemon } = this.props
    let { expanded } = this.state

    // use the pokemon type to determine the cards background colors
    let backColorLight = pokeTypeColors[pokemon.type[0]].light
    let backColorDark = pokeTypeColors[pokemon.type[0]].dark


    return (
      <Card className={classes.root} style={{ background: backColorLight }}>
        <div className={classes.cardTop}>
          <h3 className={classes.pokeName}> {pokemon.name} </h3>
          <h4 className={classes.pokeNum}> {pokemon.num} </h4>
        </div>
        <div
          className={classes.imgContainer}
          style={{ background: `linear-gradient(135deg, ${backColorLight}, ${backColorDark})` }}
        >
          <CardMedia
            className={classes.pokeImg}
            image={pokemon.img}
            title={pokemon.name}
          />
        </div>
        <CardContent>
          <h5 className={classes.infoTitle}> Type </h5>
          <p className={classes.infoDesc}> {pokemon.type.join(', ')} </p>

          <hr className={classes.divider}/>

          <h5 className={classes.infoTitle}> Weaknesses </h5>
          <p className={classes.infoDesc}> {pokemon.weaknesses.join(', ')} </p>

        </CardContent>
        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div className={classes.pokeSizeContainer}>
              <div className={classes.pokeSize}>
                <h5 className={classes.infoTitle}> Height </h5>
                <p className={classes.infoDesc}> {pokemon.height} </p>
              </div>
              <div className={classes.pokeSize}>
                <h5 className={classes.infoTitle}> Weight </h5>
                <p className={classes.infoDesc}> {pokemon.weight} </p>
              </div>
            </div>

            <hr className={classes.divider}/>

            <div className={classes.evoContainer}>
              {!pokemon.prev_evolution ?
                null :
                this.getPokeEvo('Previous', pokemon.prev_evolution)
              }

              {!pokemon.next_evolution ?
                null :
                this.getPokeEvo('Next', pokemon.next_evolution)
              }
            </div>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

PokeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PokeCard);
