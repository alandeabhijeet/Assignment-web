import React, { useEffect, useState } from 'react';
import './App.css';  

function App() {
  const [num, setNum] = useState(0); 
  const [history, setHistory] = useState([0]);  
  const [currentIndex, setCurrentIndex] = useState(0);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('fade-out');
      }
    }
  }, [loading]);

  const handleAdd = () => {
    if (num < 150) {
      const newNum = num + 1;
      updateHistory(newNum);
    }
  };

  const handleSubtract = () => {
    if (num > 0) {
      const newNum = num - 1;
      updateHistory(newNum);
    }
  };

  const updateHistory = (newNum) => {
    const newHistory = history.slice(0, currentIndex + 1);
    setHistory([...newHistory, newNum]);
    setCurrentIndex(newHistory.length);
    setNum(newNum);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      const prevNum = history[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      setNum(prevNum);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const nextNum = history[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setNum(nextNum);
    }
  };

  return (
    <div className="App">
      {loading && (
        <div id="loader">
          <h1>Increment</h1>
          <h1>Decrement</h1>
          <h1>Undo-Redo</h1>
        </div>
      )}
      {!loading && (
        <>
          <br /><br />
          <h1>Number : {num}</h1>
          <br /><br />
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${(num / 150) * 100}%` }}></div>
          </div><br />
          <div className="buttons">
            <button className="btn-class-name" onClick={handleSubtract} disabled={num === 0}>
              <span className="back"></span>
              <span className="front">-</span>
            </button>
            <span> </span>
            <button className="btn-class-name" onClick={handleAdd} disabled={num === 150}>
              <span className="back"></span>
              <span className="front">+</span>
            </button>
          </div>
          <div className="undo-redo">
            <button className="Btn" onClick={handleUndo} disabled={currentIndex === 0}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M134.1 406.1L11.3 283.3c-7.2-7.2-11.3-17.1-11.3-27.3s4.1-20.1 11.3-27.3L134.1 105.9c6.4-6.4 15-9.9 24-9.9 18.7 0 33.9 15.2 33.9 33.9l0 62.1 128 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-128 0 0 62.1c0 18.7-15.2 33.9-33.9 33.9-9 0-17.6-3.6-24-9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                </svg>
              </div>
              <div className="text">Undo</div>
            </button>
            <button className="Btn" onClick={handleRedo} disabled={currentIndex === history.length - 1}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="text">Redo</div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
