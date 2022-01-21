import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner,Button} from 'reactstrap'
import { MdDoubleArrow } from "react-icons/md";
import LineChart from '../Charts/LineChart'
import {api} from '../../scripts/network'


function IntroductionView() {
    const [adsPerMonth,setAdsPerMonth] = useState({
        adsPerMonth : [],
        loading:true,
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    })

    useEffect(() => {
        loadAdsPerMonth()
        //setInterval(() => {},10000)
    }, [])

    const loadAdsPerMonth = useCallback(async () => {
        setAdsPerMonth({
            loading:true
        })
        const adsPerMonth = await fetchAdsPerMonth()
        if(adsPerMonth != undefined){
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            adsPerMonth.map((ad)=>(
                transform[ad.month - 1]= ad.countAds
            ))
            console.log(transform.slice(6,12))
            setAdsPerMonth({
                adsPerMonth:transform.slice(6,12),
                loading:false
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
            <Row style={{marginTop:"16px"}}>    
            
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
                     labels = {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} 
                     dataset={adsPerMonth.adsPerMonth}
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
                        <Button style={{width:"500px"}}>
                            General Statistics     <MdDoubleArrow/>
                        </Button>
         </Row>
        </Container>
    )
}

export default IntroductionView
