import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner,Button} from 'reactstrap'
import { MdDoubleArrow } from "react-icons/md";
import LineChart from '../Charts/LineChart'
import {api} from '../../scripts/network'

import { Link } from 'react-router-dom'

function IntroductionView() {
    const [adsPerMonth,setAdsPerMonth] = useState({
        data : [],
        loading:true,
        labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022','Feb2022']
    })

    useEffect(() => {
        loadAdsPerMonth()
        //setInterval(() => {},10000)
    }, [])

    const loadAdsPerMonth = useCallback(async () => {
        setAdsPerMonth({
            loading:true
        })
        const result = await fetchAdsPerMonth()
        if(result != undefined){
            let transform = []
            result.map((ad)=>(
                transform.push(parseInt(ad.countAds))
            ))
            setAdsPerMonth({
                data:transform,
                loading:false,
                labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022','Feb2022']

            })
        }
       
    
   
    }, [])
     // fetching data from the server 
     const fetchAdsPerMonth = async () => {
        let stats 
        await api.get(`api/general/numberOfEntitiesByMonth`)
         .then ( res => {
             stats = res
             console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

    return (
        <Container className="intro">
            <Row style={{marginLeft:"", display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>    
         
                <Col xl="6" sm="12"  style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", padding:"20px"}} > 
                <p style={{padding:"20px"}} >
                 This web portal is your way to discover all the Facebook political ads that are being published in France and have a better overview and detailed watch on the use of Facebook as a targeting tool during the period of the French presidential elections.
                </p>  <br/>  <br/> 
  
                      <Link   style={{display:"flex", justifyContent:"center", alignItems:"center" , marginBottom:"50px",width:"300px"}}  to="/dashboard"> 
                        <Button style={{width:""}}>
                            Let's explore    <MdDoubleArrow/>
                        </Button>
                        </Link>
           

                  </Col> 
                  <Col xl="6" sm="12" >  
                    {
                     adsPerMonth.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <LineChart 
                     title="Ads published during the last months" 
                     labels = {adsPerMonth.labels} 
                     dataset={adsPerMonth.data}
                     currency = ""
                     total = "false"
                     color ="#383874"
                     color="rgba(255, 112, 139, 1)"
                     colorOpacity="rgba(255, 112, 139, 0.1)"
                     source="Source: Facebook Ad Library. Total of french ads published on Facebook ads since July 1, 2021"
                     />  }
                   
                  </Col>
            </Row>  
             <br/>  
          
        </Container>
    )
}

export default IntroductionView
