import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner, Dropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap'
import PieChart from '../Charts/PieChart'
import LineChart from '../Charts/LineChart'
import TwoBarChart from '../Charts/TwoBarChart'
import { BiEuro } from "react-icons/bi"
//apis call 
import {api} from '../../scripts/network'
import MUIDataTable from "mui-datatables"
import HorizontalBarChart from '../Charts/HorizontalBarChart'

//I'll make it i'll make because i'm ROMA i'll make it like everytime !!!!

const AnalyticsView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [regionName, setRegionName] = useState("Alsace");


    const [adsPerMonth,setAdsPerMonth] = useState({
        adsPerMonth : [],
        loading:true,
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    })
    const [spentOfMoneyPerMonth, setSpentOfMoneyPerMonth] = useState({
        adsPerMonth : [],
        loading:true,
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    })

    const [demographicBreakdown,setDemographicBreakdown] = useState({
        femaleGender:[],
        maleGender:[],
        loading:true,
        labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    })

    const [currencies,setCurrencies] = useState({
        currency:[],
        countAds: [],
        loading:true
    })

    const [dateLocationTime,setDateLocationTime] = useState({
        data:[],
        loading:true,
        labels:[]
    })
    const [dateLocationRegion,setDateLocationRegion] = useState({
        data:[],
        loading:true,
        labels:[]
    })

    const [adsPerAdvertiser,setAdsPerAdvertiser] = useState({
        data : [],
        loading:true,
        labels: []
    })
    const [spentPerAdvertiser,setSpentPerAdvertiser] = useState({
        data : [],
        loading:true,
        labels: []
    })
    const [impressionsPerAdvertiser,setImpressionsPerAdvertiser] = useState({
        data : [],
        loading:true,
        labels: []
    })
    useEffect(() => {
        loadAdsPerMonth()
        loadSpentOfMoneyPerMonth()
        loadDemographicBreakdown()
        loadCurrenciesPercentage()
        loadAdsPerAdvertiser()
        loadImpressionsPerAdvertiser()
        loadSpentPerAdvertiser()
        loadDateLocationTime()
        loadDateLocationRegion(regionName)
        //setInterval(() => {},10000)
    }, [])
     const toggle = () => setIsOpen(prevState => !prevState)
     

    const loadAdsPerMonth = useCallback(async () => {
            setAdsPerMonth({
                loading:true
            })
            const adsPerMonth = await fetchAdsPerMonth()
            
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            adsPerMonth.map((ad)=>(
                transform[ad.month - 1]= ad.countAds
            ))
    
            setAdsPerMonth({
                adsPerMonth:transform.slice(6,12),
                loading:false
            })
        
        }, [])


   

    const loadSpentOfMoneyPerMonth = useCallback(async () => {
        setSpentOfMoneyPerMonth({
            loading:true
        })
        const adsPerMonth = await fetchSpentOfMoneyPerMonth()

        let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
        adsPerMonth.map((ad)=>(
            transform[ad.month - 1]=parseInt(ad.countMoney)
        ))
        
        setSpentOfMoneyPerMonth({
            adsPerMonth:transform.slice(6,12),
            loading:false
        })
    })

   

    const loadCurrenciesPercentage = useCallback(async () => {
        setCurrencies({
            loading:true,
        })
        const data = await fetchCurrenciesPercentage()
        let currenciesData = data.map(
            a => a.currency 
        )
        let countAds = data.map(
            a => a.countAds 
        )
       
        setCurrencies({
            currency:currenciesData.slice(0,4),
            countAds:countAds.slice(0,4),
            loading:false
        })
    })

    const loadDateLocationTime = useCallback(async () => {
        setDateLocationTime({
            loading:true,
        })
        const data = await fetchDateLocationTime()
        let dates = data.map(
            a => a.date 
        )
        let countAds = data.map(
            a => parseInt(a.totalSpent )
        )
       
        setDateLocationTime({
            data: countAds,
            labels: dates ,
            loading:false
        })
    })


    const loadDemographicBreakdown = useCallback(async () => {
        setDemographicBreakdown({
            femaleGender:[],
            maleGender:[],
            loading:true,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
        })
        const data = await fetchDemographicBreakdown()

      
        let data1 =  data.map(
            a => a.gender =="female" ?  a.reachAds :null
        )
        let data2 = data.map(
            a => a.gender =="male" ?  a.reachAds :null
        )
        data1 = data1.filter(function (value, index, arr){
            return value != null
        })
        data2 = data2.filter(function (value, index, arr){
            return value != null
        })
        setDemographicBreakdown({
            femaleGender: data1,
            maleGender: data2,
            //demographicBreakdown:transform.slice(6,12),
            loading:false,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']

        })
   

    })

    const loadAdsPerAdvertiser = useCallback(async () => {
        setAdsPerAdvertiser({
            loading:true
        })
        const adsPerAdvertiser = await fetchAdsByAdvertiser()
        let data = adsPerAdvertiser.map(
            a => a.countAds 
        )
        let labels = adsPerAdvertiser.map(
            a => a.page_name 
        )
        setAdsPerAdvertiser({
            data:data,
            loading:false,
            labels:labels
        })
    
    }, [])

    const loadImpressionsPerAdvertiser = useCallback(async () => {
        setImpressionsPerAdvertiser({
            loading:true
        })
        const adsPerAdvertiser = await fetchImpressionsByAdvertiser()
        let data = adsPerAdvertiser.map(
            a => a.countImpressions 
        )
        let labels = adsPerAdvertiser.map(
            a => a.page_name 
        )
        setImpressionsPerAdvertiser({
            data:data,
            loading:false,
            labels:labels
        })
    
    }, [])

    const loadSpentPerAdvertiser = useCallback(async () => {
        setSpentPerAdvertiser({
            loading:true
        })
        const adsPerAdvertiser = await fetchSpentByAdvertiser()
        let data = adsPerAdvertiser.map(
            a => a.countExpenditure 
        )
        let labels = adsPerAdvertiser.map(
            a => a.page_name 
        )
        setSpentPerAdvertiser({
            data:data,
            loading:false,
            labels:labels
        })
    
    }, [])
    const loadDateLocationRegion  = useCallback(async (value) => {
        setRegionName(value)
        console.log("reg"+value)
        setDateLocationRegion({
            loading:true
        })
        
        const res = await fetchDateLocationRegion(value)
        let data = res.map(
            a => a.money 
        )
        let labels = res.map(
            a => a.date 
        )
        console.log(data)
        console.log(labels)
        setDateLocationRegion({
            data:data,
            loading:false,
            labels:labels
        })
    
    }, [])


    // fetching data from the server

    const fetchAdsPerMonth = async () => {
        let stats 
        await api.get(`api/ad/numberOfAdsByMonth/2021`)
         .then ( res => {
             stats = res
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

           
    const fetchSpentOfMoneyPerMonth = async () => {
        let stats 
        await api.get(`api/ad/spentOfMoneyByMonth/2021`)
         .then ( res => {
             stats = res
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

     const fetchCurrenciesPercentage = async () => {
         //change the api url
        let stats 
        await api.get(`api/ad/numberOfAdsByCurrency`)
         .then ( res => {
             stats = res
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }
     

     const fetchDemographicBreakdown = async () => {
       let stats 
       await api.get(`api/demographicDistribution/demographicBreakdownByGenderAge`)
        .then ( res => {
            stats = res
           // console.log(stats)
        })
        .catch(
            err => console.log(err)
        )
        return stats 
    }
    
    const fetchDateLocationTime = async () => {
       let stats 
       await api.get(`api/dateLocationTime/dateLocationTimeByDay`)
        .then ( res => {
            stats = res; 
           // console.log(stats)
        })
        .catch(
            err => console.log(err)
        )
        return stats 
    }
    const fetchDateLocationRegion = async (region) => {
        let stats 
        await api.get(`api/dateLocationTime/dateLocationTimeByRegion/${region}`)
         .then ( res => {
             stats = res; 
             console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

    const fetchAdsByAdvertiser = async () => {
        let stats 
        await api.get(`api/advertiser/numberOfAdsByAvertiser`)
         .then ( res => {
             stats = res; 
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }
     const fetchImpressionsByAdvertiser = async () => {
        let stats 
        await api.get(`api/advertiser/numberOfImpressionsByAvertiser`)
         .then ( res => {
             stats = res; 
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }
     const fetchSpentByAdvertiser = async () => {
        let stats 
        await api.get(`api/advertiser/expenditureByAvertiser`)
         .then ( res => {
             stats = res; 
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }



    const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "company",
         label: "Company",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "city",
         label: "City",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "state",
         label: "State",
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
            <h4> Detailed statistics </h4>    <br/> 
            <Row style={{marginLeft:"20px", minHeight:"300px"}}>     
            <h6> Overview of ads in the ad library  </h6>         
                    <Col xl="6" sm="12" >  
                    {
                     adsPerMonth.loading ?  
                     <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit', margin:"50%"}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <LineChart 
                     title="Ads published during the last months" 
                     labels = {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} 
                     dataset={adsPerMonth.adsPerMonth}
                     currency = ""
                     total="true"
                     color ="#383874"
                     color="rgba(56, 56, 116, 1)"
                     colorOpacity="rgba(56, 56, 116, 0.1)"
                     source="Source: Facebook Ad Library. Total of french ads published on Facebook ads since July 1, 2021"
                     />  
                     }
                    </Col>  
                    <Col xl="6"  sm="12" >  
                    {
                     spentOfMoneyPerMonth.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <LineChart 
                     title="Total spent to show ads the last months" 
                     labels = {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} 
                     dataset={spentOfMoneyPerMonth.adsPerMonth}
                     currency = " EUR"
                     total="true"
                     color = "#8675FF"
                     color="rgba(255, 186, 105, 1)"
                     colorOpacity="rgba(255, 186, 105, 0.1)"
                     source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 using french language"
                     />  }
                    </Col>  
            </Row>  <br/>  
             
            <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>   
            <h6> Rankings</h6>     
         
                 <Col>     
                     {
                     currencies.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <PieChart 
                     icon={<BiEuro size="1.5em"/> } 
                     value={244}  
                     title="The main advert payment currencies" 
                     labels={currencies.currency} 
                     dataset={currencies.countAds}/> }
                   </Col>  
           </Row>
           <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>   
                <Col xl="12"  sm="12" >  
                {
                     adsPerAdvertiser.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title="Pages running the highest number of ads" 
                     labels = {adsPerAdvertiser.labels} 
                     dataset={adsPerAdvertiser.data}
                    // color="rgba(255, 186, 105, 1)"
                    // colorOpacity="rgba(255, 186, 105, 0.1)"
                      source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 using french language"
                     />  }       
                </Col>
            </Row>
              
            <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>   
                <Col xl="12"  sm="12" >  
                {
                     spentPerAdvertiser.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title="Pages that generated the most expenditure" 
                     labels = {spentPerAdvertiser.labels} 
                     dataset={spentPerAdvertiser.data}
                   //color="rgba(255, 186, 105, 1)"
                   //colorOpacity="rgba(255, 186, 105, 0.1)"
                     source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 using french language"
                     />  
                    }       
                </Col>
            </Row>
              
            <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>   
           <Col xl="12"  sm="12" >  

           {
                     impressionsPerAdvertiser.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title="Pages with the highest number of impressions" 
                     labels = {impressionsPerAdvertiser.labels} 
                     dataset={impressionsPerAdvertiser.data}
                    // color="rgba(255, 186, 105, 1)"
                    // colorOpacity="rgba(255, 186, 105, 0.1)"
                      source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 using french language"
                     />  }       
                </Col>
            </Row>
            <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>            
                   
                   <Col xl="12"  sm="12" >  

                   {
                    dateLocationTime.loading
                    ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                    : <LineChart 
                    title="Total spent in the last month per day" 
                    labels = {dateLocationTime.labels} 
                    dataset={dateLocationTime.data}
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


            <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>            
            <h6> Audience demographics </h6>     
                    <Col xl="12"  sm="12" >  
                    {
                     demographicBreakdown.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <TwoBarChart 
                     title="Breakdown of the population reached by the ads by gender and age Percentage" 
                     labels={demographicBreakdown.labels}
                     dataset1={demographicBreakdown.femaleGender}
                     dataset2={demographicBreakdown.maleGender}
                     /> }
               </Col>  
            </Row>

            <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>            
            <h6> Region statistics </h6>     
                    
                    <Col xl="12"  sm="12" >  
                   
                    <select value={regionName} onChange={(event) => loadDateLocationRegion(event.target.value)}>
                            <option value="Alsace">Alsace</option>
                            <option value="Aquitaine">Aquitaine</option>
                            <option value="Auvergne">Auvergne</option>
                            <option value="Basse-Normandie">Basse-Normandie</option>
                            <option value="Bourgogne">Bourgogne</option>
                            <option value="Bretagne">Bretagne</option>
		            </select>
                        {
                        dateLocationRegion.loading
                        ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                        : <LineChart 
                        title="Total spent in the last month per day" 
                        labels = {dateLocationRegion.labels} 
                        dataset={dateLocationRegion.data}
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
       

        </Container>
    )
}
export default AnalyticsView


/* 
 //Pages running the highest number of ads
 //Pages with the highest number of impressions 
 //Pages that generated the most expenditure 


                 <LineChart title="Ads published per month" labels = {['July', 'August', 'September', 'October', 'November', 'October', 'December']} dataset={[253299,194339,163690,142867,72162,66818,57952]} />
      
                 <HorizontalBarChart title="Total spent to show ads (€)" labels={['Amazon Europe','European Parliament','The Climate Pledge','European Commission','CCFD-Terre Solidaire','Crédit Agricole','Amnesty International France']} dataset={[253299,194339,163690,142867,72162,66818,57952]} />
         
                  <VerticalBarChart title="Pages running the highest number of ads" labels={['Helios','Mediapart','Médecins Sans Frontières / MS','Médecins du Monde France','Amnesty International France']} dataset={[1327,1028,801,709,653]} />

          
                 <VerticalBarChart title="The main advert payment currencies" labels={['EUR','USD','GBP']} dataset={[17276,1675,171]} />
         

*/