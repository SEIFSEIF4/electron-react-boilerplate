import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../renderer/App.css';

function Main() {
  const [urlInput, setUrlInput] = useState<string>('');
  const [urls, setUrls] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Load suggestions from local storage on component mount
    const storedSuggestions = localStorage.getItem('suggestions');
    if (storedSuggestions) {
      setSuggestions(JSON.parse(storedSuggestions));
    }
  }, []); // Empty dependency array ensures this effect runs once on mount

  const updateSuggestions = (newSuggestions: string[]) => {
    // Update suggestions state and local storage
    setSuggestions(newSuggestions);
    localStorage.setItem('suggestions', JSON.stringify(newSuggestions));
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUrlInput(inputValue);

    // Filter suggestions based on the input
    const filteredSuggestions = urls.filter((url) =>
      url.toLowerCase().includes(inputValue.toLowerCase()),
    );

    updateSuggestions(filteredSuggestions);
  };
  const addUrl = () => {
    // Check if the input is empty
    if (urlInput.trim() === '') {
      // If empty, do not add it and return
      return;
    }

    // Check if the input starts with a valid protocol
    const validProtocolRegex = /^(https?:\/\/)/i;
    const fullUrl = validProtocolRegex.test(urlInput)
      ? urlInput
      : `https://${urlInput}`;

    // Check if the URL is already in the list
    if (urls.includes(fullUrl)) {
      // If duplicate, do not add it and return
      return;
    }

    // Add the valid and non-duplicate URL to the list
    setUrls((prevUrls: string[]) => [...prevUrls, fullUrl]);
    setUrlInput('');

    // Update suggestions with the updated URLs
    updateSuggestions([...urls, fullUrl]);
  };

  const openTabs = () => {
    urls.forEach((url) => {
      window.open(url, '_blank', 'noopener,noreferrer,pinned');
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUrlInput(suggestion);
    updateSuggestions([]);
  };

  const handleSuggestionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    suggestion: string,
  ) => {
    if (e.key === 'Enter') {
      setUrlInput(suggestion);
      updateSuggestions([]);
    }
  };

  const clearUrls = () => {
    // Clear URLs and suggestions
    setUrls([]);
    updateSuggestions([]);
  };

  return (
    <div className="main-container">
      <h1>Save Time ⌚ when Opening tabs</h1>
      <div className="url-container">
        <input
          type="text"
          value={urlInput}
          onChange={handleUrlInputChange}
          placeholder="Enter URL"
        />
        <button type="button" onClick={addUrl}>
          Add URL
        </button>
        {/* Display suggestions when there are any */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={uuidv4()}
                onClick={() => handleSuggestionClick(suggestion)}
                onKeyDown={(e) => handleSuggestionKeyDown(e, suggestion)}
                // tabIndex={0}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {urls.map((url) => (
          <div key={uuidv4()}>{url}</div>
        ))}
      </div>
      <div className="btns-container">
        <button type="button" onClick={openTabs}>
          Open tabs
        </button>
        <button type="button" onClick={clearUrls}>
          Clear URLs
        </button>
        <button type="button">
          <a href="/empty">go to empty</a>
        </button>
      </div>
    </div>
  );
}

export default function Copy() {
  return <Main />;
}
