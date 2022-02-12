import React, {useEffect, useState, useCallback} from 'react'
import { Modal, ModalFooter,
    ModalHeader, ModalBody,Button,Container,Row, Col, Spinner, Dropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap'
import PieChart from '../Charts/PieChart'
import LineChart from '../Charts/LineChart'
import TwoBarChart from '../Charts/TwoBarChart'
import { BiEuro } from "react-icons/bi" 
//apis call 
import {api} from '../../scripts/network'
import MUIDataTable from "mui-datatables"
import HorizontalBarChart from '../Charts/HorizontalBarChart'

const AnalyticsView = () => {

  
    const [isOpen, setIsOpen] = useState(false);
    const [regionName, setRegionName] = useState("Alsace");
     
    // Modal open state
    const [modalDemo, setModalDemo] = useState(false);
  
    // Toggle for Modal
    const toggleModal = (gender,age) => {
        adsTargetingAgeGender.age = age
        adsTargetingAgeGender.gender = gender
        setModalDemo(!modalDemo);
       
        if(gender != undefined & age != undefined)
            loadAdsTargetingAgeGender(age,gender)
    }

    const [adsPerMonth,setAdsPerMonth] = useState({
        adsPerMonth : [],
        loading:true,
        labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022']
    })
    const [spentOfMoneyPerMonth, setSpentOfMoneyPerMonth] = useState({
        adsPerMonth : [],
        loading:true,
        labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022']
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
    const [adsTargetingAgeGender,setAdsTargetingAgeGender] = useState({
        data:[],
        loading:true,
        age:"",
        gender:""
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
     

    const loadAdsPerMonth = useCallback(async () => {
            setAdsPerMonth({
                loading:true
            })
            const adsPerMonth = await fetchAdsPerMonth()
            
            let transform = []
            adsPerMonth.map((ad)=>(
                transform.push(parseInt(ad.countAds))
            ))
    
            setAdsPerMonth({
                adsPerMonth:transform,
                loading:false,
                labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022']

            })
        
        }, [])


   

    const loadSpentOfMoneyPerMonth = useCallback(async () => {
        setSpentOfMoneyPerMonth({
            loading:true
        })
        const adsPerMonth = await fetchSpentOfMoneyPerMonth()

        let transform = []
        adsPerMonth.map((ad)=>(
            transform.push(parseInt(ad.countMoney)) 
        ))

        setSpentOfMoneyPerMonth({
            adsPerMonth:transform,
            loading:false,
            labels: ['Jul2021', 'Aug2021', 'Sep2021', 'Oct2021', 'Nov2021', 'Dec2021','Jan2022']

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

            a => a.date.slice(0, 10)
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
            a => a.gender =="female" ?  Math.floor(a.reach) :null
        )
        let data2 = data.map(
            a => a.gender =="male" ?  Math.floor(a.reach) :null
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
        // add getting detailed data

    })

    const loadAdsPerAdvertiser = useCallback(async () => {
        setAdsPerAdvertiser({
            loading:true
        })
        const adsPerAdvertiser = await fetchAdsByAdvertiser()
        let data = adsPerAdvertiser.map(
            a => parseInt(a.countAds)  
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
            a => parseInt(a.countImpressions)  
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

     const loadAdsTargetingAgeGender = useCallback(async (age,gender) => {
        setAdsTargetingAgeGender({
            loading:true,
            age:age,
            gender:gender,
        })
        const data = await fetchAdsTargetingAgeGender(age,gender)
        console.log(data)
        /*let data = adsPerAdvertiser.map(
            a => parseInt(a.countExpenditure)
        )
        let labels = adsPerAdvertiser.map(
            a => a.page_name 
        )*/
        setAdsTargetingAgeGender({
            data:data,
            loading:false, age:age,
            gender:gender,
        })
    
    }, [])

    const loadSpentPerAdvertiser = useCallback(async () => {
        setSpentPerAdvertiser({
            loading:true
        })
        const adsPerAdvertiser = await fetchSpentByAdvertiser()
        let data = adsPerAdvertiser.map(
            a => parseInt(a.countExpenditure)
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
            a => parseInt(a.money) 
        )
        let labels = res.map(
            a => a.date.slice(0, 10)
        )
        console.log(data)
        setDateLocationRegion({
            data:data,
            loading:false,
            labels:labels
        })
    
    }, [])


    // fetching data from the server

    const fetchAdsPerMonth = async () => {
        let stats 
        await api.get(`api/general/numberOfEntitiesByMonth/2021`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

           
    const fetchSpentOfMoneyPerMonth = async () => {
        let stats 
        await api.get(`api/general/spentOfMoneyByMonth/2021`)
         .then ( res => {
             stats = res
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

      const fetchAdsTargetingAgeGender = async (age,gender) => {
         //change the api url
        let stats 
        await api.get(`api/demographicDistribution/entitiesTargetingAgeGender/`+age+`/`+gender)
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
        await api.get(`api/general/numberOfEntitiesByCurrency`)
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
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }

    const fetchAdsByAdvertiser = async () => {
        let stats 
        await api.get(`api/pages/numberOfEntitiesByPage`)
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
        await api.get(`api/pages/numberOfImpressionsByPage`)
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
        await api.get(`api/pages/expenditureByPage`)
         .then ( res => {
             stats = res; 
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }



    const columnsTargetingTable = [
        {
         name: "page_name",
         label: "Advertiser page name",
         options: {
          filter: true,
          sort: false,
           delete:false,
         }
        },
        {
         name: "ad_creative_body",
         label: "Ad text",
         options: {
          filter: true,
          sort: true,
          delete:false,
         }
        },
       
        {
         name: "reach",
         label: "Number of people reached",
         options: {
          filter: true,
          sort: false,
           delete:false,
         }
        },
       
       ];

       const optionsTargetingTable = {
        // filterType: 'checkbox',
         filter: false,
         download: false,
         print: false,
          delete:false,
          selectableRowsHideCheckboxes:true
        };

    return (
        <Container className="analytics">
            
            <Row style={{marginLeft:"5vw",  minHeight:"300px"}}>     
            <h4> Detailed statistics </h4>    <br/> 
            <h6> Overview of ads in the ad library  </h6>         
                    <Col xl="6" sm="12" >  
                    {
                     adsPerMonth.loading ?  
                        <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                     <LineChart 
                     title="Ads published during the last months" 
                     labels = {spentOfMoneyPerMonth.labels} 
                     dataset={adsPerMonth.adsPerMonth}
                     currency = ""
                     total="true"
                     color ="#383874"
                     color="rgba(56, 56, 116, 1)"
                     colorOpacity="rgba(56, 56, 116, 0.1)"
                     source="Source: Facebook Ad Library. Total of french ads published on Facebook ads since July 1, 2021 targeting french regions"
                     />  
                     }
                    </Col>  
                    <Col xl="6"  sm="12" >  
                    {
                     spentOfMoneyPerMonth.loading ? 
                        <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                     <LineChart 
                     title="Total of money spent to show ads the last months" 
                     labels = {spentOfMoneyPerMonth.labels} 
                     dataset={spentOfMoneyPerMonth.adsPerMonth}
                     currency = " €"
                     total="true"
                     color = "#8675FF"
                     color="rgba(255, 186, 105, 1)"
                     colorOpacity="rgba(255, 186, 105, 0.1)"
                     source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 targeting french regions"
                     />  }
                    </Col>  
            </Row>  <br/>  
             {/*
            <Row style={{marginLeft:"20px", marginTop:"20px", minHeight:"300px"}}>   
               
              
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
           </Row> */
               }
           <Row style={{marginLeft:"5vw", marginTop:"20px", minHeight:"300px"}}>  
             <h6> Rankings</h6>  
 
                <Col xl="12"  sm="12" >  
                {
                     adsPerAdvertiser.loading ? 
                     <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                     <HorizontalBarChart 
                     title="Pages running the highest number of ads" 
                     labels = {adsPerAdvertiser.labels} 
                     dataset={adsPerAdvertiser.data}
                    // color="rgba(255, 186, 105, 1)"
                    // colorOpacity="rgba(255, 186, 105, 0.1)"
                      source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 targeting french regions"
                     />  }       
                </Col>
            </Row>
              
            <Row style={{marginLeft:"5vw", marginTop:"20px", minHeight:"300px"}}>   
                <Col xl="12"  sm="12" >  
                {
                     spentPerAdvertiser.loading ?  <div style=  {{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title="Pages that generated the most expenditure (in euro)" 
                     labels = {spentPerAdvertiser.labels} 
                     dataset={spentPerAdvertiser.data}
                   //color="rgba(255, 186, 105, 1)"
                   //colorOpacity="rgba(255, 186, 105, 0.1)"
                     source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 targeting french regions"
                     />  
                    }       
                </Col>
            </Row>
              
            <Row style={{marginLeft:"5vw", marginTop:"20px", minHeight:"300px"}}>   
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
            {
                /*

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
                                currency="€"
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
          

            <Row style={{marginLeft:"5vw", marginTop:"20px", minHeight:"300px"}}>            
            <h6> Audience demographics </h6>     
                    <Col xl="12"  sm="12" >  
                    {
                     demographicBreakdown.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <TwoBarChart 
                     loadAds={toggleModal}
                     title="Breakdown of the population reached by the ads by gender and age Percentage" 
                     labels={demographicBreakdown.labels}
                     dataset1={demographicBreakdown.femaleGender}
                     dataset2={demographicBreakdown.maleGender}
                     /> }
               </Col>  
            </Row>

            <div>            


              <Modal style={{width:"80vw", height:"80%"}} isOpen={modalDemo} toggle={toggleModal}>
                <ModalHeader
                    toggle={toggleModal}>We are searching for ads that targeted the age and gender selected</ModalHeader>
                <ModalBody>
                    {
                        adsTargetingAgeGender.loading ?  
                        <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                        <>
                       <h6 style={{fontWeight:"bold"}}>{ "Samples of ads that are targeting "+ adsTargetingAgeGender.age +" years-old " +adsTargetingAgeGender.gender} </h6>
                        <br/>
                     <MUIDataTable 
                        data={adsTargetingAgeGender.data}
                        columns={columnsTargetingTable}
                        options={optionsTargetingTable}
                    />
                      </>  
                    }
                      
                </ModalBody>
                <ModalFooter>
                    <Button style={{backgroundColor:"#8675FF"}} color="#8675FF" onClick={toggleModal}>Okay</Button>
                </ModalFooter>
            </Modal>
            </div>
            <Row style={{marginLeft:"5vw", marginTop:"20px", minHeight:"300px"}}>            
            <h6> Regions statistics </h6>     
                    
                    <Col xl="12"  sm="12" >  
                   
                    <select value={regionName} onChange={(event) => loadDateLocationRegion(event.target.value)}>
                            <option value="Alsace">Alsace</option>
                            <option value="Aquitaine">Aquitaine</option>
                            <option value="Auvergne">Auvergne</option>
                            <option value="Basse-Normandie">Basse-Normandie</option>
                            <option value="Bourgogne">Bourgogne</option>
                            <option value="Bretagne">Bretagne</option>
                            <option value="Centre">Centre</option>
                            <option value="Champagne-Ardenne">Champagne-Ardenne</option>
                            <option value="Corse">Corse</option>
                            <option value="Franche-Comté">Franche-Comté</option>
                            <option value="Haute-Normandie">French Polynesia </option>
                            <option value="Languedoc-Roussillon"> Languedoc-Roussillon </option>
                            <option value="Limousin">Limousin</option>
                            <option value="Lorraine">Lorraine</option>
                            <option value="Midi-Pyrénées">Midi-Pyrénées</option>
                            <option value="Nord-Pas-de-Calais">Nord-Pas-de-Calais</option>
                            <option value="Pays de la Loire">Pays de la Loire</option>
                            <option value="Picardie">Picardie</option>
                            <option value="Poitou-Charentes">Poitou-Charentes</option>
                            <option value="Provence-Alpes-Côte d'Azur">Provence-Alpes-Côte d'Azur </option>
                            <option value="Reunion Island">Reunion Island</option>
                            <option value="Rhône-Alpes">Rhône-Alpes</option>
                            <option value="Saint-Barthelemy">Saint-Barthelemy</option>
                            <option value="Île-de-France">Île-de-France</option>
                            <option value="French Southern Territories">French Southern Territories</option>


		            </select>
                        {
                        dateLocationRegion.loading
                        ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                        : <LineChart 
                        title="Total spent in the last months per day" 
                        labels = {dateLocationRegion.labels} 
                        dataset={dateLocationRegion.data}
                        color = "#8675FF"
                        currency=" €" 
                        total="true"
                        color="rgba(56, 56, 116, 1)"
                        colorOpacity="rgba(56, 56, 116, 0.1)"
                        source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 targeting french regions"

                        />
                        
                        }
               </Col>  
            </Row>
       

        </Container>
    )
}
export default AnalyticsView


