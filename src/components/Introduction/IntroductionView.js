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
        labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022']
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
            console.log(transform)
            setAdsPerMonth({
                data:transform,
                loading:false,
                labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022']

            })
        }
       
    
   
    }, [])
     // fetching data from the server 
     const fetchAdsPerMonth = async () => {
        let stats 
        await api.get(`api/ad/numberOfAdsByMonth/2021`)
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
            <Row style={{marginTop:"16px",marginLeft:"5vw"}}>    
            
                  <Col xl="6" sm="12" > 
                  <p>
                <span className="first-letter"> W </span>
                e live in the age of communication. The media are extending their coverage areas more and more, the communication channels are multiple and the ways of contact are numerous. Hence, campaigns and political parties use a variety of communication tools and data analysis methods to better target voters.

                </p> 

                <p>
                One of these techniques, the mobilization of social networks such as Facebook and Twitter which, using the data they hold of their users, have acquired a strong targeting capacity allowing them to send messages to the targeted audience and even to refine the content of these messages according to their interests.

                </p> 
                <p> 
                Political micro-targeting can therefore indirectly represent a threat to the effectiveness of electoral democracy since online platforms that host this kind of paid content do not comply with transparency obligations; none of them share data about the targeting methods they offer.
                In this context, we have created this web service in order to have a better overview and detailed watch on the use of Facebook as a targeting tool during the period of the French presidential elections.

                </p>    

  
              
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
            <Row  style={{display:"flex", justifyContent:"center", alignItems:"center" , marginBottom:"50px"}}> 
                      <Link  style={{width:"500px"}} to="/dashboard"> 
                        <Button style={{width:"500px"}}>
                            GeneralStatistics     <MdDoubleArrow/>


                        </Button>
                        </Link>
         </Row>
        </Container>
    )
}

export default IntroductionView
