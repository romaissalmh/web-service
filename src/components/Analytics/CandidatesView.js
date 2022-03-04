import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner, Dropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap'
import PieChart from '../Charts/PieChart'
import LineChartMultipleDatasets from '../Charts/LineChartMultipleDatasets'
import TwoBarChart from '../Charts/TwoBarChart'
import { BiEuro } from "react-icons/bi" 
//apis call 
import {api} from '../../scripts/network'
import HorizontalBarChart from '../Charts/HorizontalBarChart'
import { useIntl } from 'react-intl';

const CandidatesView = () => {
    const intl = useIntl();

	const [adsPerOfficialCandidate,setAdsPerOfficialCandidate] = useState({
        data : [{"label":"Emmanuel Macron","data":[10,54,100,35,47,48]},
           {"label":"Jean-Luc Mélenchon","data":[0,9,6,11,1,2]},
           {"label":"Anne Hidalgo","data":[0,1,6,45,2,7]},
           {"label":"Marine Le Pen","data":[62,0,80,50,47,78]},
           {"label":"Eric Zemmour","data":[7,0,20,47,48,38]}],
        loading:true,
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
       // ['Emmanuel Macron', 'Valérie Pécresse', 'Marine Le Pen', 'Eric Zemmour']

    })
 	const [adsPerCandidate,setAdsCandidate] = useState({
        data : [],
        loading:true,
        labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022','Feb2022']


    })



    useEffect(() => {
        loadAdsPerCandidate()
      
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
        	let transform = []
        	let element = {
        		"label":d.candidate,
        		"data":[]
        	}
        	d.countAds.map((ad)=>(
                 element.data.push(parseInt(ad.countAds)) 
            ))
            
			candidates.push(element)
        }
            
    
       
        setAdsCandidate({
            data:candidates,
            loading:false,
            labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022','Feb2022']
        })
        console.log(adsPerCandidate)
    })


  


    const fetchAdsPerCandidate = async () => {
        let stats 
        await api.get(`api/general/numberOfEntitiesOfCandidatesByMonth`)
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
            <Row style={{ padding:"30px"}}>     
                <h6>  </h6>   {
                    adsPerCandidate.loading ? 
                     <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                <LineChartMultipleDatasets
                    title={intl.formatMessage({ id: 'candidatesPlot' })}
                    labels = {adsPerCandidate.labels} 
                    datasets={adsPerCandidate.data}
                    color = "#8675FF"
                    currency=""
                    total="true"
                    color="rgba(56, 56, 116, 1)"
                    colorOpacity="rgba(56, 56, 116, 0.1)"
                    source={intl.formatMessage({ id: 'plotSource1' })}
                   />}
            </Row>
            <br/>  
        </Container> 
        )
}


export default CandidatesView ;