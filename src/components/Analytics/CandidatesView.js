import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Spinner} from 'reactstrap'
import LineChartMultipleDatasets from '../Charts/LineChartMultipleDatasets'
//apis call 
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';

const CandidatesView = () => {
    const intl = useIntl();

	
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
            <h6> {intl.formatMessage({ id: 'candidatesTitle' })}  </h6>    <br/> 
  {
                    adsPerCandidate.loading ? 
                     <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                <LineChartMultipleDatasets
                    title={intl.formatMessage({ id: 'candidatesPlot' })}
                    labels = {adsPerCandidate.labels} 
                    datasets={adsPerCandidate.data}
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