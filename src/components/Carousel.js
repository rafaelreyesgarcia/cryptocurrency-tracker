import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TrendingCoins } from '../config/api';
import { AppState } from '../Context';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const carouselItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
  color: 'white',
};

const Carousel = () => {

  const [trending, setTrending] = useState([]);

  const { currency, symbol } = AppState();
  // console.log(currency);

  const fetchTrendingCoins = async() => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  }

  useEffect(() => {
    fetchTrendingCoins();
    // console.log(trending);
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} style={carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height='80'
          style={{ marginBlock: 10}}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129)' : 'rgb(255, 16, 16)',
            }}
          >
            {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{fontSize: 22, fontWeight: 500}}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })

  const responsive = {
    0: {
      items :2,
    },
    512: {
      items: 4,
    },
    780: {
      items: 6,
    }
  };

  return (
    <Box
      sx={{
        height: '50%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  )
}

export default Carousel