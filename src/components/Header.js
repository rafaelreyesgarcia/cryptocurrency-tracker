import React from 'react'
import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AppState } from '../Context';

const Header = () => {
  const navigate = useNavigate();
  const clickHandler = () => navigate('./');
  const { currency, setCurrency } = AppState();


  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        color='transparent'
        position='static'
      >
        <Container>
          <Toolbar>
            <Typography
              sx={{
                flex: 1,
                color: '#F7AB8A',
                fontFamily: 'montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={clickHandler}
            >
              Crypto Tracker
            </Typography>
            <Select
              variant='outlined'
              sx={{
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"BTC"}>BTC</MenuItem>
              <MenuItem value={"ETH"}>ETH</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header