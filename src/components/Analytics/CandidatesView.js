import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner, Dropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap'
import PieChart from '../Charts/PieChart'
import LineChartMultipleDatasets from '../Charts/LineChartMultipleDatasets'
import TwoBarChart from '../Charts/TwoBarChart'
import { BiEuro } from "react-icons/bi" 
//apis call 
import {api} from '../../scripts/network'
import HorizontalBarChart from '../Charts/HorizontalBarChart'

const CandidatesView = () => {


	const [adsPerOfficialCandidate,setAdsPerOfficialCandidate] = useState({
        data : [{"label":"Emmanuel Macron","data":[10,54,100,35,47,48]},
           {"label":"Valérie Pécresse","data":[0,0,1,1,0,8]},
           {"label":"Anne Hidalgo","data":[0,1,6,45,2,7]},
           {"label":"Marine Le Pen","data":[62,0,80,50,47,78]},
           {"label":"Eric Zemmour","data":[7,0,20,47,48,38]}],
        loading:true,
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       // ['Emmanuel Macron', 'Valérie Pécresse', 'Marine Le Pen', 'Eric Zemmour']

    })
 	const [adsPerCandidate,setAdsCandidate] = useState({
          data : [
           {"label":"Emmanuel Macron","data":[62,62,95,128,67,48]},
           {"label":"Valérie Pécresse","data":[0,0,1,2,0,8]},
           {"label":"Anne Hidalgo","data":[0,1,6,2,2,7]},
           {"label":"Marine Le Pen","data":[62,0,95,50,47,39]},
           {"label":"Eric Zemmour","data":[7,0,27,54,33,31]}
           ],
        loading:true,
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    })



    useEffect(() => {
        //loadAdsPerOfficialCandidate()
        //loadAdsPerCandidate()
      
    }, [])
 

     const loadAdsPerCandidate = useCallback(async () => {
        setAdsCandidate({
            loading:true
        })
        const data = await fetchAdsPerCandidate()
        console.log(data)
        let candidates = []
        
        for (const d of data)
        {
        	let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
        	let element = {
        		"label":d.candidate,
        		"data":[]
        	}
        	d.map((ad)=>(
                transform[ad.month - 1]= parseInt(ad.countAds)
            ))
            element.data = transform.slice(6,12)
			candidates.push(element)
        }
            
    
       
        setAdsCandidate({
            data:candidates,
            loading:false,
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        })
        console.log(adsPerCandidate)
    })


    // fetching data from the server

    const fetchAdsPerOfficialCandidate =  async () => {
        let stats 
        await api.get(`api/advertiser/`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }


    const fetchAdsPerCandidate = async () => {
        let stats 
        await api.get(`api/ad/numberOfAdsOfCandidatesByMonth`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }





	return (

		 <Container className="analytics">
            <br/> 
            <Row style={{marginLeft:"20px", minHeight:"300px"}}>     
            <h6> The use of Facebook ads by certain political movements  </h6>         
              <Col xl="12"  sm="12" >  

                   {
                   <LineChartMultipleDatasets
                    title="Number of ads mentionning electoral candidates" 
                    labels = {adsPerCandidate.labels} 
                    datasets={adsPerCandidate.data}
                    color = "#8675FF"
                    currency=""
                    total="true"
                    color="rgba(56, 56, 116, 1)"
                    colorOpacity="rgba(56, 56, 116, 0.1)"
                    source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021"

                   />
                    
                    }

                        

                   </Col>  
            </Row>
            <br/><br/><br/>
         {
            /*
            <Row style={{marginLeft:"20px", minHeight:"300px"}}>     
              <Col xl="12"  sm="12" >  

                   {
                   <LineChartMultipleDatasets
                    title="Number of ads published by official candidates" 
                    labels = {adsPerOfficialCandidate.labels} 
                    datasets={adsPerOfficialCandidate.data}
                    color = "#8675FF"
                    currency=""
                    total="true"
                    color="rgba(56, 56, 116, 1)"
                    colorOpacity="rgba(56, 56, 116, 0.1)"
                    source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021"

                   />
                    
                    }

                        

                   </Col>  
            </Row> 


            */
         }
              
            <br/>  
        </Container>
            )
}


export default CandidatesView ;