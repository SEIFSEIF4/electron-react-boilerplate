import { Youtube } from 'lucide-react';
import '../renderer/App.css';

export default function Modal({ closeModal }: any) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="top-side">
          <input type="text" name="url" id="url" placeholder="Enter a Url" />
          <button type="button" onClick={closeModal}>
            Add Url
          </button>
        </div>
        <div className="bottom-side">
          <h1>Suggestions</h1>
          <div>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
