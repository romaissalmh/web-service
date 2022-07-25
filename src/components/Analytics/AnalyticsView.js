import React, {useEffect, useState, useCallback} from 'react'
import { Modal, ModalFooter,
    ModalHeader, ModalBody,Button,Container,Row, Col, Spinner, ButtonGroup} from 'reactstrap'
import BarChart from '../Charts/BarChart'
import TwoBarChart from '../Charts/TwoBarChart'
//apis call 
import {api} from '../../scripts/network'
import MUIDataTable from "mui-datatables"
import HorizontalBarChart from '../Charts/HorizontalBarChart'
import { useIntl } from 'react-intl';
import AdCard from '../Charts/AdCard'
import LineChartMultipleDatasets from '../Charts/LineChartMultipleDatasets'


const AnalyticsView = () => {
    const intl = useIntl();

    const [activeB1, setActiveB1] = useState(true)
    const [activeB2, setActiveB2] = useState(false)
    const [activeB3, setActiveB3] = useState(false)
   
    const [regionName, setRegionName] = useState("Alsace");
     
    // Modal open state
    const [modalDemo1, setModalDemo1] = useState(false);
    const [modalDemo2, setModalDemo2] = useState(false);

    // Toggle for Modals
    const toggleModal1 = (page) => {
        adsSamplesByAdvertiser.page = page
        setModalDemo1(!modalDemo1);
        if(page !== undefined )
            loadAdsSamplesByAdvertiser(page)
    }

    const toggleModal2 = (gender,age) => {
        adsTargetingAgeGender.age = age
        adsTargetingAgeGender.gender = gender
        setModalDemo2(!modalDemo2);
       
        if(gender !== undefined & age !== undefined)
            loadAdsTargetingAgeGender(age,gender)
    }

   
    const [showBy, setShowBy] = useState('ads');


    const [demographicBreakdown,setDemographicBreakdown] = useState({
        femaleGender:[],
        maleGender:[],
        loading:true,
        labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    })

    const [dataPerMonthPerSocialIssue,setDataPerMonthPerSocialIssue] = useState({
        data: [],
        loading:true,
        labels: []

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

    const [adsSamplesByAdvertiser, setAdsSamplesByAdvertiser] = useState({
        data:[],
        loading:true,
        page:'',
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

/*
    const socialIssuesOptions = [
        { value: 0, label: "Affaires internationales", color:"#ff2d2e" },
        { value: 1, label: "Droits de l’homme libertés publiques et discriminations" , color:"#D84560"},
        { value: 2, label: "Economic", color:"black" },
        { value: 3, label: "Education", color:"#D8B46F" },
        { value: 4, label: "Energie", color:"#8675FF" },
        { value: 5, label:"Environnement", color:"#dbdff1"},
        { value: 6, label: "Immigration", color:"#5eff5a" },
        { value: 7, label: "Justice et criminalité", color:"#ffba69" },
        { value: 8, label: "Opérations gouvernementales", color:"#7C4733" },
        { value: 9, label: "Politique culturelle" , color:"#5541D8"},
        { value: 10, label: "Politique sociale" , color:"#292B68"},
        { value: 11, label: "Politiques urbaines et territoriales" , color:"#382B68"},
        { value: 12, label: "Santé", color:"#BB1D4B" },
        { value: 13, label: "Travail et emploi", color:"#CC1D4B" },
       
      ]*/
      const socialIssuesOptions = [
        { value: 0, label: "Affaires internationales", color:"#b82c73" },
        { value: 1, label: "Energie" , color:"#3cc5af"},
        { value: 2, label: "Immigration", color:"#253860" },
        { value: 3, label: "Justice et criminalité", color:"#0e849e" },
        { value: 4, label: "Opérations gouvernementales", color:"#d02d1e" },
        { value: 5, label: "Politique culturelle", color:"#dbdff1"},
        { value: 6, label: "Politique sociale", color:"#6e4f22" },
        { value: 7, label: "Politiques urbaines et territoriales", color:"#b1a820" },
        { value: 8, label: "Santé", color:"#0976fc" },
        { value: 9, label: "Travail et emploi" , color:"#f6b9ab"},
        { value: 10, label: "Environnement" , color:"#bbea4b"},
        { value: 11, label: "Economic" , color:"#b604e2"},
        { value: 12, label: "Droits de l’homme libertés publiques et discriminations", color:"#BB1D4B" },
        { value: 13, label: "Education", color:"#f79c53" },
       
      ]
    useEffect(() => {
        loadDemographicBreakdown()
        loadAdsPerAdvertiser()
        loadImpressionsPerAdvertiser()
        loadSpentPerAdvertiser()
        loadDateLocationRegion(regionName)
        loadInfoPerMonthPerSocialIssue()
    }, [])
   
    const loadDemographicBreakdown = useCallback(async () => {
        setDemographicBreakdown({
            femaleGender:[],
            maleGender:[],
            loading:true,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
        })
        const data = await fetchDemographicBreakdown()

      
        let data1 =  data.map(
            a => a.gender === "female" ?  Math.floor(a.reach) :null
        )
        let data2 = data.map(
            a => a.gender === "male" ?  Math.floor(a.reach) :null
        )
        data1 = data1.filter(function (value, index, arr){
            return value !== null
        })
        data2 = data2.filter(function (value, index, arr){
            return value !== null
        })
        setDemographicBreakdown({
            femaleGender: data1,
            maleGender: data2,
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
    
    const loadAdsSamplesByAdvertiser = useCallback(async (page) => {
        setAdsSamplesByAdvertiser ({
            loading:true,
            page:page,
        })
        const data = await fetchAdsSamplesByAdvertiser(page)
      
        setAdsSamplesByAdvertiser ({
            data:data,
            loading:false, 
            page:page,
        })
    
    }, [])

     const loadAdsTargetingAgeGender = useCallback(async (age,gender) => {
        setAdsTargetingAgeGender({
            loading:true,
            age:age,
            gender:gender,
        })
        const data = await fetchAdsTargetingAgeGender(age,gender)
      
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
        setDateLocationRegion({
            data:data,
            loading:false,
            labels:labels
        })
    
    }, [])

    const loadInfoPerMonthPerSocialIssue = useCallback(async () => {
        setDataPerMonthPerSocialIssue({
            loading:true
        })
        const data = await fetchInfoPerMonthPerSocialIssue()
        
        let dataset = []
        
        for(let socialIssue in data){
            let transform1 = []
            let transform2 = []
            //let transform3 = []
            data[socialIssue].map((ad)=>{
                transform1.push(parseInt(ad.countAds)) 
                transform2.push(parseInt(ad.countMoney))
                //transform3.push(parseInt(ad.countImpressions)) 
            })
            dataset.push({
                "ads":transform1,
                "data": transform2,
                "label": socialIssue
            })

        }
        let labels = []
        data["Affaires internationales"].map((ad)=>{
            labels.push(ad.CharMonth) 
        })

        setDataPerMonthPerSocialIssue({
            data : dataset,
            labels: labels,
            loading:false,
            adsTitle : intl.formatMessage({ id: 'plotTitle1' }),
            spendingTitle:  intl.formatMessage({ id: 'plotTitle2' }),
            impressionsTitle:  intl.formatMessage({ id: 'plotTitle3' }),

        })

       
    })
    
    // fetching data from the server
     

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
     const fetchAdsSamplesByAdvertiser = async (page) => {
        let stats 
        await api.get(`api/pages/entitiesByPages/${page}`)
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
     const fetchInfoPerMonthPerSocialIssue = async () => {
        let stats 
        await api.get(`api/general/infoPerMonthPerSocialIssue`)
         .then ( res => {
             stats = res; 
             //console.log(stats)
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }



     const columns1 = [
        {
            name: intl.formatMessage({ id: 'filterType1' }),           
            options: {
             filter: false,
             sort: false,
             customBodyRenderLite: (dataIndex) => {
               return <AdCard date={adsSamplesByAdvertiser.data[dataIndex].ad_delivery_start_time} ad={adsSamplesByAdvertiser.data[dataIndex].ad_creative_body} advertiser={adsSamplesByAdvertiser.data[dataIndex].page_name} funding = {adsSamplesByAdvertiser.data[dataIndex].funding_entity}/> 
    }  }  }, ];    

    const options = {
        filterType: 'checkbox',
    //filter: false,
        download: false,
        print: false,
        search: false,
        filter:false,
        viewColumns:false,
        selectableRowsHeader:false,
        selectableRows:'none'
        
    };

    return (
        <Container className="analytics">
            
           
           <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>  
           <h4> {intl.formatMessage({ id: 'analyticsTitle' })}  </h4>    <br/> 

             <h6>  {intl.formatMessage({ id: 'analyticsSubTitle1' })}</h6>  
                 <Col xl="12"  sm="12" >  
                 <ButtonGroup >
                    <Button active={activeB1} onClick={() => {
                        setShowBy('ads')
                        setActiveB2(false)
                        setActiveB3(false)
                        setActiveB1(true)
                    }}>{intl.formatMessage({ id: 'filterType1' })}</Button>
                    <Button active={activeB2} onClick={() => {
                        setShowBy('spending')
                        setActiveB3(false)
                        setActiveB1(false)
                        setActiveB2(true)
                    }}> {intl.formatMessage({ id: 'filterType2' })} </Button>
                    <Button active={activeB3} onClick={() => {
                        setShowBy('impressions')
                        setActiveB1(false)
                        setActiveB2(false)
                        setActiveB3(true)
                    }}>{intl.formatMessage({ id: 'filterType3' })} </Button>
                </ButtonGroup>

                {
                    showBy === "ads" ?
                   
                     adsPerAdvertiser.loading ? 
                     <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                       <HorizontalBarChart 
                     loadAds={toggleModal1}
                     title={intl.formatMessage({ id: 'analyticsPlotTitle1' })} 
                     labels = {adsPerAdvertiser.labels} 
                     dataset={adsPerAdvertiser.data}
                      source={intl.formatMessage({ id: 'plotSource3' })} 
                      disclaimer = {intl.formatMessage({ id: 'disclaimer4' })}

                     /> 
                       
                     : showBy === "spending" ? 
                     spentPerAdvertiser.loading ?  <div style=  {{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title={intl.formatMessage({ id: 'analyticsPlotTitle3' })}
                     labels = {spentPerAdvertiser.labels} 
                     dataset={spentPerAdvertiser.data}
                     currency= "€ "
                     source={intl.formatMessage({ id: 'plotSource4' })} 
                     /> 
                     :
                     impressionsPerAdvertiser.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title={intl.formatMessage({ id: 'analyticsPlotTitle2' })} 
                     labels = {impressionsPerAdvertiser.labels} 
                     dataset={impressionsPerAdvertiser.data}
                      source={intl.formatMessage({ id: 'plotSource3' })} 
                     /> 

                     
                     } 
                 </Col>    
            </Row> 

            <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>  
            <h6>  {intl.formatMessage({ id: 'analyticsSubTitle5' })}</h6>  
            <Col xl="12"  sm="12" >  
                     {
                        dataPerMonthPerSocialIssue.loading ?
                         <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                        <LineChartMultipleDatasets
                                title={intl.formatMessage({ id: 'socialIssuesPlot1' })}
                                showBy = "ads"
                                labels={dataPerMonthPerSocialIssue.labels}
                                datasets={dataPerMonthPerSocialIssue.data}
                                candidatesOptions = {socialIssuesOptions}
                                currency=""
                                total="true"
                                color="rgba(56, 56, 116, 1)"
                                colorOpacity="rgba(56, 56, 116, 0.1)"
                                source={intl.formatMessage({ id: 'plotSource3' })}
                            />
                     }
                </Col>
            </Row>
            <div>
                <Modal style={{width:"80vw", height:"80%"}} isOpen={modalDemo1} toggle={toggleModal1}>
                    <ModalHeader
                        toggle={toggleModal1}>  </ModalHeader>
                    <ModalBody>
                        {
                            adsSamplesByAdvertiser.loading ?  
                            <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                            <>
                            <br/>
                            <MUIDataTable style={{maxHeight:'100%'}}
                                data={adsSamplesByAdvertiser.data}
                                columns={columns1}
                                options={options}
                            />
                        </>  
                        }
                         </ModalBody>
                </Modal>
            </div>
          
            
            <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>     
                <Col xl="12"  sm="12" >  
                <h6> {intl.formatMessage({ id: 'analyticsSubTitle2' })}  </h6>  
                        {
                         demographicBreakdown.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: '300PX'}}>  <Spinner>  </Spinner> </div> 
                         : 
                         <TwoBarChart 
                         loadAds={toggleModal2}
                         title={intl.formatMessage({ id: 'analyticsPlotTitle4' })} 
                         labels={demographicBreakdown.labels}
                         dataset1={demographicBreakdown.femaleGender}
                         dataset2={demographicBreakdown.maleGender}
                         source  = {intl.formatMessage({ id: 'plotSource1' })}
                         disclaimer = {intl.formatMessage({ id: 'disclaimer' })}
                         /> }
                </Col>  
                
            </Row>

            <div>            


              <Modal style={{width:"80vw", height:"80%"}} isOpen={modalDemo2} toggle={toggleModal2}>
                <ModalHeader
                    toggle={toggleModal2}>{intl.formatMessage({ id: 'analyticsSubTitle3' })}</ModalHeader>
                <ModalBody>
                    {
                        adsTargetingAgeGender.loading ?  
                        <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                        <>
                        <h6 style={{fontWeight:"bold"}}>{ "Age: "+ adsTargetingAgeGender.age + intl.formatMessage({ id: 'genre' }) +adsTargetingAgeGender.gender} </h6>
                        <br/>
                            <>
                                <AdCard ad={adsTargetingAgeGender.data[0].ad_creative_body} advertiser={adsTargetingAgeGender.data[0].page_name} funding = {adsTargetingAgeGender.data[0].funding_entity}/> 
                                <AdCard ad={adsTargetingAgeGender.data[1].ad_creative_body} advertiser={adsTargetingAgeGender.data[1].page_name} funding = {adsTargetingAgeGender.data[1].funding_entity}/> 
                                <AdCard ad={adsTargetingAgeGender.data[2].ad_creative_body} advertiser={adsTargetingAgeGender.data[2].page_name} funding = {adsTargetingAgeGender.data[2].funding_entity}/> 
                                <AdCard ad={adsTargetingAgeGender.data[3].ad_creative_body} advertiser={adsTargetingAgeGender.data[3].page_name} funding = {adsTargetingAgeGender.data[3].funding_entity}/> 
                                <AdCard ad={adsTargetingAgeGender.data[4].ad_creative_body} advertiser={adsTargetingAgeGender.data[4].page_name} funding = {adsTargetingAgeGender.data[4].funding_entity}/> 
                                <AdCard ad={adsTargetingAgeGender.data[5].ad_creative_body} advertiser={adsTargetingAgeGender.data[5].page_name} funding = {adsTargetingAgeGender.data[5].funding_entity}/> 
                                <AdCard ad={adsTargetingAgeGender.data[6].ad_creative_body} advertiser={adsTargetingAgeGender.data[6].page_name} funding = {adsTargetingAgeGender.data[6].funding_entity}/> 
                                <AdCard ad={adsTargetingAgeGender.data[7].ad_creative_body} advertiser={adsTargetingAgeGender.data[7].page_name} funding = {adsTargetingAgeGender.data[7].funding_entity}/> 
                            </>
                        </>  
                    }
                      
                </ModalBody>
            
            </Modal>
            </div>
            <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>     
            <Col xl="12"  sm="12" >  
       
            <h6> {intl.formatMessage({ id: 'analyticsSubTitle4' })} </h6>     
                    
                   
                    <select value={regionName} onChange={(event) => loadDateLocationRegion(event.target.value)}>
                            <option value="Auvergne">Auvergne Rhône Alpes</option>
                            <option value="Bourgogne">Bourgogne Franche Comté</option>
                            <option value="Bretagne">Bretagne</option>
                            <option value="Centre">Centre Val de Loire</option>
                            <option value="Corse">Corse</option>
                            <option value="Alsace">Grand Est</option>
                            <option value="Picardie">Hauts de France</option>
                            <option value="Île-de-France">Île de France</option>
                            <option value="Haute-Normandie">Normandie </option>
                            <option value="Limousin">Nouvelle Aquitaine</option>
                            <option value="Midi-Pyrénées">Occitanie</option>
                            <option value="Pays de la Loire">Pays de la Loire</option>
                            <option value="Provence-Alpes-Côte d'Azur">Provence Alpes Côte d'Azur </option>
                    </select>
                        {
                        dateLocationRegion.loading
                        ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                        : <BarChart 
                        title={intl.formatMessage({ id: 'plotTitle2' })} 
                        labels = {dateLocationRegion.labels} 
                        dataset={dateLocationRegion.data}
                        currency=" €" 
                        total="true"
                        color="rgba(56, 56, 116, 1)"
                        colorOpacity="rgba(56, 56, 116, 0.1)"
                        source={intl.formatMessage({ id: 'plotSource3' })} 
                        />
                        }  
                </Col>  
            </Row>
        </Container>
    )
}
export default AnalyticsView


