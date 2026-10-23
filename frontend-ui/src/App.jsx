import React, { useState, useEffect } from 'react';
import './App.css';

const TMDB_API_KEY = "bd3bf6bb90012bac6be075d8395bc042"; 
const TMDB_BASE_URL = "https://themoviedb.org";
const IMAGE_BASE_URL = "https://tmdb.org";

function App() {
  const [activeProfile, setActiveProfile] = useState("Uday Jadhav");
  const [movies, setMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState("Checking Key Status...");

  useEffect(() => {
    const checkApiKeyStatus = async () => {
      try {
        const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc`);
        
        if (response.status === 200) {
          const data = await response.json();
          setMovies(data.results.slice(0, 6));
          setApiStatus("SUCCESS: Your TMDB API Key is 100% ACTIVE! 🎉");
        } else if (response.status === 401) {
          setApiStatus("ERROR: Invalid API Key or Not Activated Yet by TMDB Server 😔");
        } else {
          setApiStatus(`Server returned status: ${response.status}`);
        }
      } catch (error) {
        setApiStatus("Network Error: Cannot connect to TMDB.");
      }
    };
    checkApiKeyStatus();
  }, []);

  return (
    <div className="netflix-container" style={{ padding: '4px' }}>
      <div className="left-profiles-section" style={{ width: '25%', background: '#000', padding: '20px' }}>
        <h2 style={{ color: '#E50914' }}>likenetflex-close</h2>
        <p style={{ color: '#fff' }}>Active: {activeProfile}</p>
      </div>
      <div className="right-movies-section" style={{ width: '75%', padding: '40px' }}>
        <div style={{ padding: '20px', backgroundColor: '#222', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>TMDB Live Key Status Terminal:</h3>
          <h2 style={{ color: apiStatus.includes('SUCCESS') ? '#4BB543' : '#FF3333' }}>{apiStatus}</h2>
        </div>
        
        {movies.length > 0 && (
          <div>
            <h3>Live Movies Fetched Dynamically:</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              {movies.map(m => (
                <img key={m.id} src={`${IMAGE_BASE_URL}${m.poster_path}`} alt={m.title} style={{ width: '110px', borderRadius: '4px' }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
