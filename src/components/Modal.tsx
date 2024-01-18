import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../renderer/App.css';
import { Youtube } from 'lucide-react';

interface ModalProps {
  closeModal: () => void;
  closeModalKey: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export default function Modal({ closeModal, closeModalKey }: ModalProps) {
  const [urlInput, setUrlInput] = useState<string>('');
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('savedUrls') || '[]');
    setUrls(storedUrls);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedUrls', JSON.stringify(urls));
  }, [urls]);

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUrlInput(inputValue);
  };

  const addUrl = () => {
    if (urlInput.trim() === '') {
      return;
    }

    const validProtocolRegex = /^(https?:\/\/)/i;
    const fullUrl = validProtocolRegex.test(urlInput)
      ? urlInput
      : `https://${urlInput}`;

    if (urls.includes(fullUrl)) {
      return;
    }

    setUrls((prevUrls: string[]) => [...prevUrls, fullUrl]);
    setUrlInput('');
  };

  const openTabs = () => {
    urls.forEach((url) => {
      window.open(url, '_blank', 'noopener,noreferrer,pinned');
    });
  };

  const clearUrls = () => {
    setUrls([]);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="modal-overlay" role="dialog" onKeyDown={closeModalKey}>
      <div className="modal-content">
        <div className="top-side">
          <input
            type="text"
            value={urlInput}
            onChange={handleUrlInputChange}
            placeholder="Enter a URL"
          />
          <button type="button" onClick={addUrl}>
            Add Url
          </button>
        </div>
        <div className="bottom-side">
          <h1>Suggestions</h1>
          <div>
            <div>
              {urls.map((url) => (
                <div key={uuidv4()}>{url}</div>
              ))}
            </div>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube />
            </a>
          </div>
          <div className="btns-container">
            <button type="button" onClick={openTabs}>
              Open tabs
            </button>
            <button type="button" onClick={clearUrls}>
              Clear URLs
            </button>
            <button type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
