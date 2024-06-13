import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('https://freetestapi.com/api/v1/countries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const sortCountries = (property, order) => {
    const sortedCountries = [...countries].sort((a, b) => {
      if (order === 'asc') {
        if (typeof a[property] === 'string') {
          return a[property].localeCompare(b[property]);
        }
        return a[property] - b[property];
      }
       else {
        if (typeof a[property] === 'string') {
          return b[property].localeCompare(a[property]);
        }
        return b[property] - a[property];
      }
    });
    setCountries(sortedCountries);
    setSortOrder(order);
  };

  const handleSort = (property) => {
    const newOrder = sortBy === property && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(property);
    sortCountries(property, newOrder);
  };

  return (
    <div className="App">
      <h1>Country Population Data</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>
              Country
              <button onClick={() => handleSort('name')}>
                {sortBy === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : '▲'}
              </button>
            </th>
            <th>
              Population
              <button onClick={() => handleSort('population')}>
                {sortBy === 'population' ? (sortOrder === 'asc' ? '▲' : '▼') : '▲'}
              </button>
            </th>
            <th>Area</th>
            <th>Capital</th>
          </tr>
        </thead>
        <tbody>
          {countries?.map((country, index) => (
            <tr key={index}>
              <td>{country.id}</td>
              <td>{country.name}</td>
              <td>{country.population.toLocaleString()}</td>
              <td>{country.land_area.toLocaleString()}</td>
              <td>{country.capital}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
