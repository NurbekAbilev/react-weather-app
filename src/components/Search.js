import { useCallback, useEffect, useState } from "react";
import { API_KEY } from "../Constants";

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

async function querySearch(cityName) {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${cityName}`)
    const jsonResponse = await response.json()
    return jsonResponse
}

export default function Search({handleSelectCity}) {
    const [inputValue, setInputValue] = useState('')
    const [autoCompleteElements, setAutoCompleteElements] = useState([])
    const [showSuggestion, setShowSuggestions] = useState(false)

    const debouncedSetCities = useCallback(debounce((value) => {
        querySearch(value).then((response) => {
            setAutoCompleteElements(response)
        })
    }, 500),[])

    function handleChange(event) {
        setShowSuggestions(true)
        setInputValue(event.target.value)
    }

    function selectCity(city) {
        return (event) => {
            setShowSuggestions(false)
            handleSelectCity(city.id)
        }
    }

    function handleInputFocus(event) {
        return () => setShowSuggestions(true)
    }

    useEffect(() => {
        if (inputValue.trim()) {
            debouncedSetCities(inputValue);
        } else {
            setAutoCompleteElements([]);
        }
    }, [inputValue, setAutoCompleteElements]);

    return (
        <>
            <div className="app-search">
                <input onChange={handleChange} onFocus={handleChange} className="app-search-input" autoComplete="off" placeholder="Enter city name..."></input>
                <button className="app-search-button"><img className="app-search-img" alt="search" src="/images/search.png"/></button>
                <div className="app-search-autocomplete-container" style={{display: showSuggestion ? 'block' : 'none'}}>
                    {autoCompleteElements.map((el) =>
                        <div key={el.id} className="app-search-autocomplete-element" onClick={selectCity(el)}>{el.country} {el.name} {el.region}</div>
                    )}
                </div>
            </div>            
        </>

    );
}
