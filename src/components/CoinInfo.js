import React, { useEffect, useState } from 'react'
import { AppState } from '../Context';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { CircularProgress, createTheme, ThemeProvider, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Line } from 'react-chartjs-2';

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'chart!'
//     }
//   }
// };


const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = AppState();

  const theme = useTheme();

  const fetchHistoricData = async() => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  }

  console.log(historicalData);

  useEffect(() => {
    fetchHistoricData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
  });

  // const labels = [historicalData.map((coin) => {
  //   let date = new Date(coin[0]);
  //   let time = date.getHours() > 12
  //     ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
  //     : `${date.getHours()}: ${date.getMinutes()} AM`;

  //   return days === 1
  //     ? time
  //     : date.toLocaleDateString();})]
  
  // const data = {
  //   labels,
  //   datasets: [historicalData.map((coin) => coin[1])]
  // }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 25,
          p: 40,
          [theme.breakpoints.down('md')]: {
            width: '100%',
            mt: 0,
            p: 20,
            pt: 0,
          }
        }}
      >
        {/* {!historicalData ? (
          <CircularProgress
            style={{color: '#F7AB8A'}}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              options={options}
              data={data}
            />
          </>
        )} */}

      </Box>
    </ThemeProvider>
  )
}

export default CoinInfo