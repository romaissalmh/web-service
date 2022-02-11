import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner, Dropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap'
import LineChart from '../Charts/LineChart'
import TwoBarChart from '../Charts/TwoBarChart'
import { BiEuro } from "react-icons/bi" 
//apis call 
import {api} from '../../scripts/network'
import HorizontalBarChart from '../Charts/HorizontalBarChart'

const RegionsView = () => {
    
	return (

		 <Container className="analytics">
            <br/> 
            <Row style={{marginLeft:"5vw", minHeight:"300px"}}>     
            <p> Page under working </p>         
            
              </Row>  
        </Container>
            )
}


export default RegionsView ;