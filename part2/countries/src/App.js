import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const filtered_countries = filter === ''
    ? countries
    : countries.filter((country) => {
      return country.name.common.toLowerCase().includes(filter.toLowerCase())
    });

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  },
    [])
  return (
    <div>
      <p>find countries <input value={filter} onChange={(e) => setFilter(e.target.value)} /></p>
      <Countries countries={filtered_countries} />
    </div>
  );
}

export default App;
