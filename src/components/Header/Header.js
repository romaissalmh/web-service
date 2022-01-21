//import useState hook to create menu collapse state
import React, { useState } from "react"

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter
} from "react-pro-sidebar"

import { Link } from 'react-router-dom'
//import icons from react icons
import { BiBarChartAlt2, BiWorld, BiSearch,BiPieChart } from "react-icons/bi"
import {FaInstagram,FaFacebookF,FaLinkedinIn,FaTwitter} from 'react-icons/fa';
import { VscMail } from "react-icons/vsc";
import logo from '../../assets/img/logo bleu.svg'

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css"
import "./Header.css"

const Header = ({toggled, handleToggleSidebar }) => {

    //create variable for active menus
    const [activeIntro, setActiveIntro] = useState(true)

    const [activeDashboard, setActiveDashboard] = useState(false)
    const [activeAnalytics, setActiveAnalytics] = useState(false)
    const [activeExplore, setActiveExplore] = useState(false)

  
    const introClick = () => {
      //condition checking to change state from true to false and vice versa
      setActiveAnalytics(false);
      setActiveExplore(false);
      setActiveDashboard(false);
      setActiveIntro(true);
    };
    const dashboardClick = () => {
      //condition checking to change state from true to false and vice versa
      setActiveIntro(false)
      setActiveAnalytics(false)
      setActiveExplore(false)
      setActiveDashboard(true)
    };

    const exploreClick = () => {
      setActiveIntro(false)
      setActiveAnalytics(false)
      setActiveDashboard(false)
      setActiveExplore(true)
    };

    const analyticsClick = () => {
      setActiveIntro(false)
      setActiveDashboard(false)
      setActiveExplore(false)
      setActiveAnalytics(true)
    };

  return (
    <>
          <ProSidebar 
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
          
                >
                <SidebarHeader>

                  <div className="logotext">
                    <img alt="logo" src={logo} height="100%" width="100%" />               
                  </div>
                
                </SidebarHeader>
                <SidebarContent>
                  <Menu iconShape="square">
                  <MenuItem icon={<BiWorld />} active={activeIntro} onClick={introClick} >
                      Introduction  <Link to="/intro" />
                    </MenuItem>
                    <MenuItem icon={<BiBarChartAlt2 />} active={activeDashboard} onClick={dashboardClick} >
                      Dashboard  <Link to="/dashboard" />
                    </MenuItem>
                    <MenuItem icon={<BiPieChart />} active={activeAnalytics} onClick={analyticsClick} >
                      Analytics  <Link to="/analytics" />
                    </MenuItem>
                    <MenuItem icon={<BiSearch />} active={activeExplore} onClick={exploreClick}  >
                      Explore <Link to="/explore" />
                    </MenuItem>
                  </Menu>
                </SidebarContent>
                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                      className="sidebar-btn-wrapper"
                      style={{
                        padding: '2px 4px',
                      }}
                    >
                     
                     <ul className="social-icons">

                    <li>
                        <a className="link" target="_blank"  href="https://www.linkedin.com/company/lig-laboratoire-d-informatique-de-grenoble/" rel="noreferrer">
                            <FaLinkedinIn className="social-icon"/>          
                        </a> 
                    </li>

                    <li>
                        <a className="link" target="_blank"  href="lig-contact@univ-grenoble-alpes.fr" rel="noreferrer">
                            <VscMail className="social-icon"/>          
                        </a> 
                    </li>
                    
                   
                    <li>
                        <a className="link" target="_blank"  href="https://twitter.com/LIGLab" rel="noreferrer">
                            <FaTwitter className="social-icon"/>          
                        </a> 
                    </li>
                </ul>
                    </div>
                  </SidebarFooter>
          
              </ProSidebar>
    </>
  );
};

export default Header;

/*



   






        
*/