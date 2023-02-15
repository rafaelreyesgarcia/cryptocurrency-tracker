import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppState } from '../Context';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';
import CoinInfo from '../components/CoinInfo';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Carousel';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = AppState();

  const theme = useTheme();

  const marketData = {
    alignSelf: 'start',
    p: 5,
    pt: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start',
    }
  }

  const fetchCoin = async() => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  // console.log(coin);

  useEffect(() => {
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{backgroundColor: '#F7AB8A'}} />;

  return (
    <Box
      sx={{
        display: 'flex',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: '30%',
          [theme.breakpoints.down('md')]: {
            width: '100%',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
          borderRight: '2px solid grey',
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height='200'
          style={{marginBottom: 20}}
        />
        <Typography
          variant='h3'
          style={{
            fontWeight: 'bold',
            marginBottom: 20,
            fontFamily: 'Montserrat',
          }}
        >
          {coin?.name}
        </Typography>
        <Typography variant=''>
          {parse(String(coin?.description.en.split('.')[0]))}.
        </Typography>
        {/* MARKET DATA */}
        <Box sx={marketData}>
          <span style={{display: 'flex'}}>
            <Typography variant='h5' style={{fontFamily: 'Montserrat'}}>
              Rank:
            </Typography>
            <Typography variant='h5' style={{fontFamily: 'Montserrat'}}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display: 'flex'}}>
            <Typography variant='h5' style={{fontFamily: 'Montserrat'}}>
              Current Price:
            </Typography>
            <Typography variant='h5' style={{fontFamily: 'Montserrat'}}>
              {symbol} {' '}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{display: 'flex'}}>
            <Typography variant='h5' style={{fontFamily: 'Montserrat'}}>
              Market Cap:
            </Typography>
            <Typography variant='h5' style={{fontFamily: 'Montserrat'}}>
              {symbol} {" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
              )}
            </Typography>
          </span>
        </Box>
      </Box>
      <CoinInfo coin={coin}/>
    </Box>
  )
}

export default Coin