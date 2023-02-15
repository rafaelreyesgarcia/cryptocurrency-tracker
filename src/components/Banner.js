import { Box, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(./banner.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Container
        sx={{
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Box
          sx={{
            height: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'montserrat',
            }}
          >
            Cryptocurrency Tracker
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgray',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get the latest price action of your favorite cryptocurrency
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  )
}

export default Banner