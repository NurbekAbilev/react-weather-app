import { useCallback, useEffect, useState } from "react";

const API_KEY = '998ec8c1dd074e61965223423242806'

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

export default function Search({addFavorite}) {
    const [inputValue, setInputValue] = useState('')
    const [autoCompleteElements, setAutoCompleteElements] = useState([])
    const [showSuggestion, setShowSuggestions] = useState(false)
    // const [timer, setTimer] = useState(null)

    function add() {
        setAutoCompleteElements([...autoCompleteElements, 'New York'])
    }

    function remove() {
        const newAutoCompleteElements = autoCompleteElements.slice()
        newAutoCompleteElements.pop()
        setAutoCompleteElements(newAutoCompleteElements)
    }

    const debouncedSetCities = useCallback(debounce((value) => {
        querySearch(value).then((response) => {
            setAutoCompleteElements(response)
        })
    }, 1000),[])

    function handleChange(event) {
        setShowSuggestions(true)
        setInputValue(event.target.value)
    }

    function handleAddFavorite(city) {
        return (event) => {
            setShowSuggestions(false)
            addFavorite(city)
        }
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
            <button onClick={add}>Add</button>
            <button onClick={remove}>Remove</button>
            <h2>Weather app</h2>
            <div className="app-search">
                <input onChange={handleChange} className="app-search-input" autoComplete="off" placeholder="Enter your city name"></input>
                <button className="app-search-button"><img className="app-search-img" alt="search" src="/images/search.png"/></button>
                <div className="app-search-autocomplete-container" style={{display: showSuggestion ? 'block' : 'none'}}>
                    {autoCompleteElements.map((el) =>
                        <div key={el.id} className="app-search-autocomplete-element" onClick={handleAddFavorite(el)}>{el.country} {el.name} {el.region}</div>
                    )}
                </div>
            </div>            
        </>

    );
}
