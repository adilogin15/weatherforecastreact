import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import logo from './rainand.png';
import dayjs from 'dayjs';
import * as weatherIcons from './icons';
import * as recommendations from './recommendations';
import useDebounce from './use-debounce';

const useStyles = makeStyles(theme => ({
  root: {
    flexiGrow: 1,
    color: 'black'
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  appLogo: {
    width: '50px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  layout: {
    marginTop: '20px'
  },
  wi: {
    color: '#673ab7'
  },
  atmospheric: {
    fontSize: '28px',
    padding: '5px'
  },
  recommendation: {
    fontFamily: 'Montserrat, sans-serif',
    padding: '20px 0px 10px 0px',
    fontSize: '26px',
    textAlign: 'center'
  },
  wnavBar: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '26px',
    textAlign: 'center',
    color: '#ffffff'
  },
  wnbToolbar: {
    margin: '0 auto'
  },
  wnbToolbartpg: {
    width: '300px',
    color: 'azure'
  },
  buttons: {
    color: 'black'
  },
  list: {
    width: 400
  },
  fullList: {
    width: 'auto'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  search: {
    marginTop: '100px'
  },
  error: {
    color: 'red',
    padding: '10px'
  }
}));

const WeatherSearch = props => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  let [isSearching, setSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const hasError = props.error ? true : false;

  useEffect(() => {
    if (debouncedSearchTerm) {
      props.setCity(debouncedSearchTerm);
      setSearching((isSearching = false));
    }
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.search}>
      <Grid container alignItems='flex-end'>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <FormControl style={{ width: '90%' }} className={`${classes.recommendation} recommendation`}>
            <Input
              id='search-city'
              error={hasError}
              placeholder='Enter city name'
              onChange={e => {
                setSearching((isSearching = true));
                setSearchTerm(e.target.value);
              }}
              startAdornment={
                <InputAdornment position='start'>
                  <Tooltip title='Optional: Enter a two-letter country code after the city name to make the search more precise. For example, London, GB.'>
                    <Search />
                  </Tooltip>
                </InputAdornment>
              }
              endAdornment={
                isSearching && (
                  <InputAdornment position='end'>
                    <CircularProgress size={20} />
                  </InputAdornment>
                )
              }
            />
            {props.error && (
              <Typography className={classes.error}>{props.error}</Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.wnavBar}>
        <Toolbar className={classes.wnbToolbar}>
          <img src={logo} className={classes.appLogo} alt='logo' />
          <Typography className={classes.wnbToolbartpg}>
            React Weather Forecast Application
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};


const AppLayout = props => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WeatherCard
            currentWeather={props.currentWeather}
            forecast={props.forecast}
            icon={props.icon}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const WeatherCardSubheader = props => {
  const date = dayjs().isValid(props.currentWeather.date)
    ? props.currentWeather.date
    : '';
  const description = props.currentWeather.description
    ? props.currentWeather.description
    : '';

  return (
    <>
      {dayjs(date).format('dddd')}, {dayjs(date).format('h:mm')}{' '}
      {dayjs(date).format('A')},{' '}
      {description.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })}
    </>
  );
};

const Forecast = props => {
  const classes = useStyles();
  const prefix = 'wi wi-';
  const result = props.forecast.map((item, index) => {
    const icon = prefix + weatherIcons.default[item.icon_id].icon;
    return (
      <ListItem key={index} className='forecastItem'>
        <ListItemText
          className='week-day'
          primary={dayjs(item.dt_txt).format('dddd')}
          style={{ flex: '1 1 0%', textAlign: 'left' }}
        ></ListItemText>
        <IconButton disabled={true} aria-label='forecast icon'>
          <span
            className={`${classes.wi} ${icon}`}
            style={{ fontSize: '24px', color: '#696864' }}
          ></span>
        </IconButton>
        <span className='temp' style={{ flex: '1 1 0%', textAlign: 'right' }}>
          <Typography variant='body2' component='span' color='textPrimary'>
            {Math.round(item.min)}&deg; /{' '}
          </Typography>
          <Typography variant='body2' component='span' color='textSecondary'>
            {Math.round(item.max)}&deg;
          </Typography>
        </span>
      </ListItem>
    );
  });

  return (
    <List component='nav' aria-label='forecast data'>
      {result}
    </List>
  );
};

const WeatherCard = props => {
  const classes = useStyles();
  return (
    <div className={classes.card} style={{ paddingTop: '15px' }}>
      <Typography
        variant='h2'
        className={`${classes.recommendation} recommendation`}
        color='textPrimary'
        component='h2'
        style={{ fontFamily: 'Montserrat', fontSize: '28px' }}
      >
        <CardHeader
          title={props.currentWeather.city + ', ' + props.currentWeather.country}
          subheader={
            <WeatherCardSubheader currentWeather={props.currentWeather} />
          }
        />
        <Typography>{Math.round(props.currentWeather.temperature)}&deg;C</Typography>
      </Typography>
      <Typography
        variant='h2'
        className={`${classes.recommendation} recommendation`}
        color='textPrimary'
        component='h2'
        style={{ fontFamily: 'Montserrat', fontSize: '28px' }}
      >
        <CardMedia
          className={`${props.icon} ${classes.wi}`}
          src={props.icon}
          style={{ fontSize: '38px', color: '#FF8701' }}
        />
      </Typography>
      <CardContent>
        <Typography
          className={`${classes.recommendation} recommendation`}
          color='textPrimary'
          style={{ fontSize: 'inherit', color: '#288ADB' }}
        >
          Next 5 days Forecast
        </Typography>
        <Typography
          className={`${classes.recommendation} recommendation`}
          color='textPrimary'
          gutterBottom
        >
          {props.recommendation}
        </Typography>
        <Divider variant='middle' />
        <Forecast forecast={props.forecast} />
      </CardContent>
    </div>
  );
};

class Weather extends React.Component {
  render() {
    const { city, currentWeather, forecast, setCity, error } = this.props;
    const prefix = 'wi wi-';
    const icon =
      prefix + weatherIcons.default[this.props.currentWeather.icon_id].icon;
    const recommendation =
      recommendations.default[this.props.currentWeather.icon_id].recommendation;

    return (
      <div>
        <NavBar />
        <WeatherSearch city={city} setCity={setCity} error={error} />
        <AppLayout
          currentWeather={currentWeather}
          forecast={forecast}
          icon={icon}
          recommendation={recommendation}
        />
      </div>
    );
  }
}

export default Weather;
