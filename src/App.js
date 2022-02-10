import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
//compoenents
import DashboardView from './components/Dashboard/DashboardView'
import AnalyticsView from './components/Analytics/AnalyticsView'
import CandidatesView from './components/Analytics/CandidatesView'
import DemographicView from './components/Analytics/DemographicView'
import RegionsView from './components/Analytics/RegionsView'
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
                  <Route path="/analytics/advertisers"  element={<CandidatesView />}/>
                  <Route path="/analytics/demographics"  element={<DemographicView />}/>
                  <Route path="/analytics/regions"  element={<RegionsView />}/>


                  <Route path="/explore" element={<ExploreView />}/>
                </Routes>
            </div>
        </div> 
  </Router>

 
  );
}

export default App;
