import { useEffect, useState } from 'react';
import './App.css';
import CurrencyInput from './components/CurrencyInput';
import axios from "axios";


function App() {

  const [amount1,setAmount1]=useState(1);
  const [currency1,setCurrency1]=useState("USD");
  const [amount2,setAmount2]=useState(1);
  const [currency2,setCurrency2]=useState("INR");
  const [rates , setRates]=useState([]);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }


 useEffect(()=>{
  axios.get('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_8RXAMBLqXKfmcbwix8VtSf9463jzflgD5vZVz82Z')
  .then((response)=>{
    setRates(response.data.data)
    console.log(response.data.data)
  })
 },[])

  return (
    <div className='App'>
      <h1>Currency Converter</h1>
      <CurrencyInput amount={amount1} currency={currency1} currencies={Object.keys(rates)} onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change}/>
      <CurrencyInput amount={amount2} currency={currency2} currencies={Object.keys(rates)} onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change}/>
    </div>
  );
}

export default App;
