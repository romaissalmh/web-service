import React, {useEffect,useState,useCallback} from 'react'
import {Container, Row, Col, Spinner} from 'reactstrap'

// core components
import Summary from '../Charts/Summary'
import CustomHorizontalBarChart from '../Charts/CustomHorizontalBarChart'
import FranceMap from '../Charts/FranceMap.js'

//apis call 
import {api} from '../../scripts/network'

const DashboardView= () =>  {
    //declare variables
    const limitsArray = [0, 80, 200, 300];

    const limits = ["Active Cases", "desc", limitsArray];

    const color = [
        "green", // if the statistics value is equal or less than 0
        "yellow", // if the statistics value is equal or less than 25
        "orange", // if the statistics value is equal or less than 50
        "red", // if the statistics value is equal or less than 75,
                // theres no greater than color...
        ];
    const [generalStatistics,setGeneralStatistics] = useState({
         data:[],
         loading:true
    })

    const [adsByRegion,setAdsByRegion] = useState({
        data:[],
        loading:true
    })
    const [spentByRegion,setSpentByRegion] = useState({
        data:[],
        loading:true
    })
    const [adsByAdvertiser,setAdsByAdvertiser] = useState({
        pageNames:[],
        pageAds:[],
        loading:true
    })

    useEffect(() => {
        loadGeneralStatistics()
        loadAdsByRegion()
        loadAdsByAdvertiser()
        loadSpentByRegion()
        //setInterval(() => {},10000)
    }, [])

    const loadAdsByAdvertiser  = useCallback(async () => {
        setAdsByAdvertiser({
            pageNames:[],
            pageAds:[],
            loading:true
        })
        let data = await fetchNumberOfAdsPerAdvertiser()

       if(data != undefined){

        let pageNames = data.map(
            a => a.page_name 
        )
        let pageAds = data.map(
            a => parseInt(a.countAds ) 
        )
       // console.log(pageNames.slice(0,4))
        
        setAdsByAdvertiser({
            pageNames:pageNames.slice(0,6),
            pageAds:pageAds.slice(0,6),
            loading:false
        })
       }
       // console.log(adsByAdvertiser)
    }, []);

    const loadGeneralStatistics = useCallback(async () => {
        setGeneralStatistics({
            loading:true
        })
        let data =  await fetchGeneralStatistics()
        if(data != undefined){
            // console.log(data)
            setGeneralStatistics({
                data : data,
                loading: false
            })
        }


      }, []);

    const loadAdsByRegion = useCallback(async () => {
        setAdsByRegion({
            loading:true
        })
        let data = await fetchAdsByRegion()
        if( data != undefined){
            setAdsByRegion({
                data:data,
                loading:false
            })
        }
      }, []);

    const loadSpentByRegion = useCallback(async () => {
        setSpentByRegion({
            loading:true
        })
        let data = await fetchSpentByRegion()
        if(data != undefined){
            setSpentByRegion({
                data:data,
                loading:false
            })
        }
      }, []);

    // get the general statistics 
    const fetchGeneralStatistics = async () => {
       let stats 
        await api.get(`api/general/generalStatistics/`)
        .then ( res => {
            stats = res[0] ; 
            //console.log(stats)
        })
        .catch(
            err => console.log(err)
        )
        return stats 
    }
 
    // get the number of ads per region 
    const fetchAdsByRegion = async () => {
        let stats = []

       await api.get(`api/regionDistribution/entitiesByRegion/`)
        .then ( res => {
            stats = res

        })
        .catch(
            err => console.log(err)
        )
       return stats 
    }

       // get the expenditure per region 
    const fetchSpentByRegion = async () => {
        let stats = []

       await api.get(`api/regionDistribution/spentByRegion/`)
        .then ( res => {
            stats = res

        })
        .catch(
            err => console.log(err)
        )
       return stats 
    }

     // get the number of ads per advertiser
     const fetchNumberOfAdsPerAdvertiser = async () => {
        let stats = []

        await api.get(`api/pages/numberOfEntitiesByPage`)
        .then ( res => {
            stats = res
            //console.log(res) 

        })

        .catch(
            err => console.log(err)
        )
       return stats 
    }



    return (
            <Container  className="dashboard">
               
                    <Row style={{ marginTop:"20px"}}>            
                     <h4> General statistics </h4>    <br/> 
                        <Col xl="6" sm="12" >  
                            <h6> All ads </h6>  
                            <Row > 
                                {
                                    generalStatistics.loading ? <Spinner> Loading </Spinner> 
                                    :   
                                <> 
                                 <h1>   {generalStatistics.data.numberAds != undefined ? generalStatistics.data.numberAds.toLocaleString("en-US") : ""} </h1>  
                                 <Summary data={generalStatistics.data}/>
                                </> 

                                }

                            </Row> 

                            <Row style={{ display:"flex", justifyConten:'center', alignItems:"center"}}> 
                            {
                                adsByAdvertiser.loading ? <Spinner> Loading </Spinner> 
                                :
                                <CustomHorizontalBarChart title="Most politicaly engaged pages" labels={adsByAdvertiser.pageNames} dataset={adsByAdvertiser.pageAds} />

                              }
                            </Row> 
                              
                            
                           
                        </Col>  
                        
                        <Col style={{minHeight:"85vh"}} xl="6"  sm="12" >  
                        {
                            adsByRegion.loading || spentByRegion.loading ?  <Spinner> Loading </Spinner> 
                            :   <FranceMap
                                colors={color}
                                limits={limits}
                                dataAds={adsByRegion.data} 
                                dataSpent={spentByRegion.data}/>
                        }
                          
                        </Col>              
                    </Row> 
                
              
            </Container>
    )
}
export default DashboardView
