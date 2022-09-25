import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_WEATHER_API_KEY

const ViewButton = ({ status, onClick }) =>
    <button type="button" onClick={onClick}>
        {status ? "hide" : "show"}
    </button>

const Weather = ({ city }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data);
            })
    }, [city]);
    if (Object.keys(weather).length === 0) {
        return <br />
    }
    return (
        <div>
            <h3>Weather in {city}</h3>
            <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`{weather.weather.description}`} />
            <p>Wind {weather.wind.speed}</p>
        </div>
    )
}



const BasicData = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area} sq.km.</p>
            <p><strong>languages:</strong></p>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
            <Weather city={country.capital} />
        </>
    );
}

const CountryData = ({ country, full }) => {
    const [fullView, setFullView] = useState(false);
    if (full) {
        return (<BasicData country={country} />)
    }

    if (fullView) {
        return (
            <div>
                <BasicData country={country} />
                <ViewButton status={fullView} onClick={() => setFullView(!fullView)} />
            </div>
        )
    }
    return (
        <div>
            <p>
                {country.name.common}
                <ViewButton status={fullView} onClick={() => setFullView(!fullView)} />
            </p>

        </div>
    )
};

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    } else if (countries.length > 1) {
        return (
            <div>
                {countries.map((country) => <CountryData key={country.name.common} country={country} />)}
            </div>
        )
    } else if (countries.length > 0) {
        return (<BasicData country={countries[0]} full />)
    } else {
        return (<p>No country matches your search.</p>)
    }
}

export default Countries;