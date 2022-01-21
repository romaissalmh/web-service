import React, {useState, useEffect, useCallback} from 'react'
import {Container, Row, Col, Spinner} from 'reactstrap'
import MUIDataTable from "mui-datatables"
import {api} from '../../scripts/network'

function ExploreView() {
    const [ads,setAds] = useState({
        data : [],
        loading:true,
       
    })



    useEffect(() => {
        loadAds()
        //setInterval(() => {},10000)
    }, [])


    const loadAds = useCallback(async () => {
        setAds({
            loading:true
        })
        const ads = await fetchAds() 
        setAds({
            data:ads,
            loading:false
        })
    
    }, [])

    const fetchAds = async () => {
        let stats 
        await api.get(`api/ad/`)
         .then ( res => {
             stats = res
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }


    
    const columns = [
        {
         name: "ad_creative_body",
         label: "Ad content",
         options: {
          filter: false,
          sort: true,
         }
        },
        {
         name: "funding_entity",
         label: "Funding Entity",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "currency",
         label: "Currency",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "publisher_platforms",
         label: "Publisher plateforms",
         options: {
          filter: true,
          sort: false,
         }
        },
       ];
       
       const data = [
        { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
        { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
        { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
        { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
       ];
       
       const options = {
         filterType: 'checkbox',
       //filter: false,
         download: false,
         print: false
        };

    return (
        <Container className="analytics">
             <h4> Explore the ads </h4>    <br/> 
              {   ads.loading ?  <Spinner>  </Spinner> :
              <Row style={{marginLeft:"20px", marginTop:"20px"}}>            
                <Col>     
                    <MUIDataTable
                        data={ads.data}
                        columns={columns}
                        options={options}
                        />
                </Col>  
            </Row>  }
        </Container>
    )
}

export default ExploreView
/*
 <Row>
                <h3>
                    This feature has not been unlocked yet.
                </h3>
                <Chart/>
            </Row>

*/