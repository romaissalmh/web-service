//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { BiBarChartAlt2, BiWorld, BiSearch } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";


const Header = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create variable for active menus
    const [activeDashboard, setActiveDashboard] = useState(true)
    const [activeAnalytics, setActiveAnalytics] = useState(false)
    const [activeExplore, setActiveExplore] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
    const dashboardClick = () => {
      //condition checking to change state from true to false and vice versa
      setActiveAnalytics(false);
      setActiveExplore(false);
      setActiveDashboard(true);
    };

    const exploreClick = () => {
      setActiveAnalytics(false);
      setActiveDashboard(false);
      setActiveExplore(true);
    };

    const analyticsClick = () => {
      setActiveDashboard(false);
      setActiveExplore(false);
      setActiveAnalytics(true);
    };

  

  return (
    <>
      <div className={ menuCollapse ? "header header-min": "header"}>
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<BiWorld />} active={activeDashboard} onClick={dashboardClick} >
                Dashboard  <Link to="/dashboard" />
              </MenuItem>
              <MenuItem icon={<BiBarChartAlt2 />} active={activeAnalytics} onClick={analyticsClick} >
                Analytics  <Link to="/analytics" />
              </MenuItem>
              <MenuItem icon={<BiSearch />} active={activeExplore} onClick={exploreClick}  >
                Explore <Link to="/explore" />
              </MenuItem>
            </Menu>
          </SidebarContent>
       {  /* <SidebarFooter>
            <Menu iconShape="square">
            import { BiBarChartAlt2, BiLineChart, BiWorld, BiSearch } from "react-icons/bi";

              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter> */ } 
        </ProSidebar>
        
      </div>
    </>
  );
};

export default Header;





