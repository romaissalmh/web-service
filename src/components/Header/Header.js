//import useState hook to create menu collapse state
import React, { useState } from "react"

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SubMenu
} from "react-pro-sidebar"
import { useIntl } from 'react-intl';

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
    const t = ["intro","car"]

    //create variable for active menus
    const [activeIntro, setActiveIntro] = useState(true)

    const [activeDashboard, setActiveDashboard] = useState(false)
    const [activeAnalytics1, setActiveAnalytics1] = useState(false)
    const [activeAnalytics2, setActiveAnalytics2] = useState(false)
    const [activeAnalytics3, setActiveAnalytics3] = useState(false)
    const [activeAnalytics4, setActiveAnalytics4] = useState(false)

    const [activeExplore, setActiveExplore] = useState(false)

  
    const introClick = () => {
      //condition checking to change state from true to false and vice versa
      setActiveAnalytics1(false);
      setActiveAnalytics2(false);
      setActiveAnalytics3(false);
      setActiveAnalytics4(false);

      setActiveExplore(false);
      setActiveDashboard(false);
      setActiveIntro(true);
    };
    const dashboardClick = () => {
      //condition checking to change state from true to false and vice versa
      setActiveIntro(false)
       setActiveAnalytics1(false);
      setActiveAnalytics2(false);
      setActiveAnalytics3(false);
      setActiveAnalytics4(false);
      setActiveExplore(false)
      setActiveDashboard(true)
    };

    const exploreClick = () => {
      setActiveIntro(false)
       setActiveAnalytics1(false);
      setActiveAnalytics2(false);
      setActiveAnalytics3(false);
      setActiveAnalytics4(false);
      setActiveDashboard(false)
      setActiveExplore(true)
    };

    const analyticsClick1 = () => {
      setActiveIntro(false)
      setActiveDashboard(false)
      setActiveExplore(false)
      setActiveAnalytics2(false);
      setActiveAnalytics3(false);
      setActiveAnalytics4(false);
      setActiveAnalytics1(true);

    };

    const analyticsClick2 = () => {
        setActiveIntro(false)
        setActiveDashboard(false)
        setActiveExplore(false)
        setActiveAnalytics1(false);
        setActiveAnalytics3(false);
        setActiveAnalytics4(false);
        setActiveAnalytics2(true);

      };
     const analyticsClick3 = () => {
      setActiveIntro(false)
      setActiveDashboard(false)
      setActiveExplore(false)
      setActiveAnalytics1(false);
      setActiveAnalytics2(false);
      setActiveAnalytics4(false);
      setActiveAnalytics3(true);

    };
     const analyticsClick4 = () => {
      setActiveIntro(false)
      setActiveDashboard(false)
      setActiveExplore(false)
      setActiveAnalytics2(false);
      setActiveAnalytics3(false);
      setActiveAnalytics1(false);
      setActiveAnalytics4(true);

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
                 
                  <MenuItem style={{width:'100%', height:"100%"}} icon={<BiWorld />} active={activeIntro} onClick={introClick} > <span> Introduction </span> <Link to="/intro" />    
                    </MenuItem>
                
                   
                    <MenuItem  style={{width:'100%', height:"100%"}} icon={<BiBarChartAlt2 />} active={activeDashboard} onClick={dashboardClick} > <span> Dashboard </span>     <Link to="/dashboard"/>
                    </MenuItem>
               
                    <SubMenu title="Analytics" icon={<BiPieChart />}  >
                       
                          <MenuItem style={{width:'100%', height:"100%"}} active={activeAnalytics1} onClick={analyticsClick1} ><span> General </span> <Link to="/analytics" /> </MenuItem>
                          <MenuItem style={{width:'100%', height:"100%"}} active={activeAnalytics2} onClick={analyticsClick2} ><span> Advertisers </span> <Link to="/analytics/advertisers" />  </MenuItem>
                          <MenuItem style={{width:'100%', height:"100%"}} active={activeAnalytics3} onClick={analyticsClick3} ><span> Regions </span> <Link to="/analytics/regions" />  </MenuItem>
                          <MenuItem active={activeAnalytics4} onClick={analyticsClick4} ><span> Demographics </span> <Link to="/analytics/demographics" /> </MenuItem>
                      
                    </SubMenu>

                     <MenuItem icon={<BiSearch />} active={activeExplore} onClick={exploreClick} ><span> Explore </span><Link to="/explore" />
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