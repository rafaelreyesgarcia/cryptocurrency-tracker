import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppState } from '../Context';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import { Box, useTheme } from '@mui/material';
import CoinInfo from '../components/CoinInfo';

const Coin = () => {
  const { id } = useParams();
  const [coin, setcoin] = useState();

  const { currency, symbol } = AppState();

  const theme = useTheme();

  const fetchCoin = async() => {
    const { data } = await axios.get(SingleCoin(id));
    setcoin(data);
  }

  // console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

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
      </Box>
      <CoinInfo coin={coin}/>
    </Box>
  )
}

export default Coin