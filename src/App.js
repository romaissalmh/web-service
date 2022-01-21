import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
//compoenents
import DashboardView from './components/Dashboard/DashboardView';
import AnalyticsView from './components/Analytics/AnalyticsView'
import IntroductionView from './components/Introduction/IntroductionView'
import ExploreView from './components/Explore/ExploreView'

//styling sheets
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {  FaBars } from 'react-icons/fa';


function App() {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    document.title = "French Elections";

  }, []);

 
	
  /*useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=5")
      const data = await res.json()
      setChartData({
        labels: data.data.map((crypto) => crypto.name),
        datasets: [
          {
            label: "Price in USD",
            data: data.data.map((crypto) => crypto.priceUsd),
            backgroundColor: [
              "#ffbb11",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ]
          }
        ]
      });
    };
    fetchPrices()
  }, []); */

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  
  return (
 
    <Router>
        <div className="App">
            <div className="app-content">
                <Header
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                />
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                  <FaBars />
                </div>
                <Routes>
                  <Route path="/"  element={<IntroductionView />} />
                  <Route path="/intro" element={<IntroductionView />}/>

                  <Route path="/dashboard" element={<DashboardView />}/>
                  <Route path="/analytics"  element={<AnalyticsView />}/>
                  <Route path="/explore" element={<ExploreView />}/>
                </Routes>
            </div>
        </div> 
  </Router>

 
  );
}

export default App;
