import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import axios from 'axios';
import { AppState } from '../Context';
import { Box, Container, ThemeProvider } from '@mui/system';
import { createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1)

  const { currency, symbol } = AppState();

  const navigate = useNavigate();

  const fetchCoins = async() => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  }

  // console.log(coins);

  useEffect(() => {
    fetchCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign: 'center'}}>
        <Typography variant='h4' style={{margin: 18, fontFamily: 'Montserrat', textTransform: 'capitalize'}}>
          cryptocurrency prices by market cap
        </Typography>
        <TextField
          label='search'
          variant='outlined'
          style={{marginBottom: 20, width: '100%'}}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {
            loading ? (
              <LinearProgress style={{backgroundColor: '#F7AB8A'}}/>
            ) : (
              <Table>
                <TableHead style={{backgroundColor: '#F7AB8A'}}>
                  <TableRow>
                    {['coin', 'price', '24h change', 'market cap'].map((head) => (
                      <TableCell
                        style={{
                          color: 'black',
                          fontWeight: '700',
                          fontFamily: 'Montserrat',
                        }}
                        key={head}
                        align={head === 'coin' ? 'inherit' : 'right'}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page-1) * 10, (page-1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`coins/${row.id}`)}
                          key={row.name}
                          sx={{
                            backgroundColor: '#16171a',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: '#131111'
                            },
                            fontFamily: 'Montserrat'
                          }}
                        >
                          <TableCell
                            component='th'
                            scope='row'
                            style={{
                              display: 'flex',
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height='50'
                              style={{marginBottom: 10}}
                            />
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <span style={{textTransform: 'uppercase', fontSize: 22,}}>
                                {row.symbol}
                              </span>
                              <span style={{ color:'darkgray' }}>
                                {row.name}
                              </span>
                            </Box>
                          </TableCell>
                          <TableCell
                            align='right'
                          >
                            {symbol} {" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align='right'
                            style={{
                              color: profit > 0 ? 'rgb(14, 203, 129)' : 'rgb(255, 16, 16)',
                              fontWeight: 500,
                            }}
                          >
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell>
                            {symbol}{' '}
                            {numberWithCommas(
                              row.market_cap.toString()//.slice(0, -6)
                            )}
                          </TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
        <Pagination
          count={+(handleSearch()?.length/10).toFixed(0)}
          sx={{
            p: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            "& .MuiPaginationItem-root": {
              color: '#F7AB8A',
            }
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable