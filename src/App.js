// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [inputCurrencyValue, setInputCurrencyValue] = useState("");
  const [outputCurrencyValue, setOutputCurrencyValue] = useState("");
  const [activeField, setActiveField] = useState(false);

  function handleFromCurrencyChange(e) {
    setFromCurrency(e.target.value);
  }

  function handleToCurrencyChange(e) {
    setToCurrency(e.target.value);
  }

  function handleinputCurrencyValueChange(e) {
    setInputCurrencyValue(e.target.value);
  }

  useEffect(
    function () {
      async function currencyConversionAPI() {
        try {
          setActiveField((curr) => !curr);
          const url = `https://api.frankfurter.app/latest?amount=${inputCurrencyValue}&from=${fromCurrency}&to=${toCurrency}`;
          const res = await fetch(url);
          const data = await res.json();
          setOutputCurrencyValue(data.rates[`${toCurrency}`]);
          setActiveField((curr) => !curr);
        } catch (error) {
          console.log(error);
        }
      }
      if (inputCurrencyValue.length === 0) {
        setOutputCurrencyValue("");
        return;
      }
      if (fromCurrency === toCurrency) {
        setOutputCurrencyValue(inputCurrencyValue);
        return;
      }
      currencyConversionAPI();
    },
    [inputCurrencyValue, fromCurrency, toCurrency]
  );

  return (
    <main>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-coins"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" />
        <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" />
        <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" />
        <path d="M3 6v10c0 .888 .772 1.45 2 2" />
        <path d="M3 11c0 .888 .772 1.45 2 2" />
      </svg>
      <h1>Currency Converter</h1>
      <input
        disabled={activeField}
        value={inputCurrencyValue}
        onChange={handleinputCurrencyValueChange}
        type="text"
      />
      <div className="currency-options">
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          disabled={activeField}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrows-exchange-2"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 10h-14l4 -4" />
          <path d="M7 14h14l-4 4" />
        </svg>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          disabled={activeField}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p className="output-text">
        {outputCurrencyValue} {outputCurrencyValue ? toCurrency : ""}
      </p>
    </main>
  );
}
