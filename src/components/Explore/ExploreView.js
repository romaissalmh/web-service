import React, {useState, useEffect, useCallback} from 'react'
import {Container, Row, Col, Spinner} from 'reactstrap'
import MUIDataTable from "mui-datatables"
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';

function ExploreView() {
    const intl = useIntl();

    const [ads,setAds] = useState({
        data : [],
        loading:true,
       
    })

    useEffect(() => {
        loadAds()
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
        await api.get(`api/general/`)
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
         label:  intl.formatMessage({ id: 'exploreColumn1' }),
         options: {
          filter: false,
          sort: false,
         }
        },
        {
            name: "page_name",
            label:  intl.formatMessage({ id: 'exploreColumn6' }),
            options: {
             filter: true,
             sort: true,
            }
           },
        {
         name: "funding_entity",
         label:  intl.formatMessage({ id: 'exploreColumn2' }),
         options: {
          filter: false,
          sort: false,
         }
        },
        {
         name: "mean_impressions",
         label:  intl.formatMessage({ id: 'exploreColumn3' }),
         options: {
          filter: false,
          sort: true,
         }
        },
        {
         name: "publisher_platforms",
         label:  intl.formatMessage({ id: 'exploreColumn4' }),
         options: {
          filter: false,
          sort: false,
         }
        },
{
         name: "FROM_UNIXTIME(a.ad_delivery_start_time)",
         label:  intl.formatMessage({ id: 'exploreColumn5' }),
         options: {
          filter: false,
          sort: true,
         }
        },
      



       ];
       
       
       const options = {
         filterType: 'checkbox',
       //filter: false,
         download: false,
         print: false,
         searchOpen	:true,
         filter:false,
         viewColumns:false
         
        };

    return (
        <Container className="analytics">
           
             <Row style={{ padding:"30px", marginTop:"20px"}}> 
               <h4> {intl.formatMessage({ id: 'exploreTitle' })} </h4>    <br/>  
                 {   ads.loading ?  <Spinner>  </Spinner> :
          
                <Col>     
                    <MUIDataTable
                        data={ads.data}
                        columns={columns}
                        options={options}
                        />
                </Col> } 
            </Row>  
        </Container>
    )
}

export default ExploreView
