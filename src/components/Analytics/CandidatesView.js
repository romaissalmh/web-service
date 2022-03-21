import React, {useEffect, useState, useCallback} from 'react'
import {Container, Row, Spinner, Col, ButtonGroup, Button, DropdownToggle,DropdownItem, ButtonDropdown, DropdownMenu} from 'reactstrap'
import LineChartMultipleDatasets from '../Charts/LineChartMultipleDatasets'
import HorizontalBarChart from '../Charts/HorizontalBarChart'
//apis call 
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';
import { i } from 'mathjs'

const CandidatesView = () => {
    const intl = useIntl();
    const [showBy, setShowBy] = useState('overall');
    const [showByTime, setShowByTime] = useState('ads');

    const [activeB1, setActiveB1] = useState(true)
	const [activeB2, setActiveB2] = useState(false)
	const [activeB3, setActiveB3] = useState(false)
	
 	const [adsPerCandidate,setAdsPerCandidate] = useState({
        data : [],
        loading:true,
        labels: ['Jan2022','Feb2022','March2022']


    })
    	
 	const [spendPerCandidate,setSpendPerCandidate] = useState({
        data : [],
        loading:true,
        labels: ['Jan2022','Feb2022','March2022']


    })

    const [globalSpedingPerCandidate,setGlobalSpedingPerCandidate] = useState({
        data : [],
        loading:true,


    })



    useEffect(() => {
        loadInfoPerCandidate()
        loadGlobalSpedingPerCandidate()
    }, [])
  

     const loadInfoPerCandidate = useCallback(async () => {
        setAdsPerCandidate({
            loading:true
        })
        const info = await fetchInfoPerCandidate()

        let candidatesAds = []
        let candidatesSpending = []
        let candidatesImpressions = []
        for (const d of info)
        {
            //console.log(d)
            if(d.data.length <3){
                if(d.data.find(element => element.month === 1) === undefined){
                    d.data.splice(0,0,{
                        month: 1, countAds: 0, impressions: 0, reach: 0, spend: 0
                    })
                }
                if(d.data.find(element => element.month === 2) === undefined){
                    d.data.splice(1,0,{
                        month: 2, countAds: 0, impressions: 0, reach: 0, spend: 0
                    })
                }
                if(d.data.find(element => element.month === 3) === undefined){
                    d.data.splice(2,0,{
                        month: 3, countAds: 0, impressions: 0, reach: 0, spend: 0
                    })
                }
            }
            let countAds = [parseInt(d.data[0].countAds),parseInt(d.data[1].countAds),parseInt(d.data[2].countAds)]
            let impressions = [parseInt(d.data[0].impressions),parseInt(d.data[1].impressions),parseInt(d.data[2].impressions)]
            let spending = [parseInt(d.data[0].spend),parseInt(d.data[1].spend),parseInt(d.data[2].spend)]
            let reach =  [parseInt(d.data[0].reach),parseInt(d.data[1].reach),parseInt(d.data[2].reach)]
        	let element = {
        		"label":d.candidate,
        		"data":countAds }
		   candidatesAds.push(element)
           element = {
            "label":d.candidate,
            "data":spending }
           candidatesSpending.push(element)
           element = {
            "label":d.candidate,
            "data":impressions }
           candidatesImpressions.push(element)


        }
    
       
        setAdsPerCandidate({
            candidatesAds:candidatesAds,
            candidatesSpending:candidatesSpending,
            candidatesImpressions:candidatesImpressions,
            loading:false,
            labels: ['Jan2022','Feb2022','March2022']
        })
       
       
        
    })
 
     function compare_lname( a, b )
            {
               
            if( a.data[0] === undefined)
                a.data.push({spend:0})

                if( b.data[0] === undefined)
                b.data.push({spend:0})
            if ( parseInt(a.data[0].spend) < parseInt(b.data[0].spend)){
                return 1;
            }
            if (parseInt(a.data[0].spend)> parseInt(b.data[0].spend)){
                return -1;
            }
            return 0;
            }

    const loadGlobalSpedingPerCandidate = useCallback(async () => {
        setGlobalSpedingPerCandidate({
            loading:true
        })
        const result = await fetchGlobalSpedingPerCandidate()
        result.sort(compare_lname)
        let spending = []
        let labels = []
        for (const d of result)
        {
            labels.push(d.candidate)
            if(d.data[0] !== undefined){
                spending.push(parseInt(d.data[0].spend))
            }
            else  spending.push(0)
           
        
        }
     
        setGlobalSpedingPerCandidate({
            data:spending,
            loading:false,
            labels:labels
        })
    
    }, [])

    /**
     * 
     * Fetching data from the REST APIIII 
     */
    const fetchInfoPerCandidate = async () => {
        let stats 
        await api.get(`api/general/infoCandidatesByMonth`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }


    const fetchSpendPerCandidate = async () => {
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

    const fetchGlobalSpedingPerCandidate = async () => {
        let stats 
        await api.get(`api/general/spendCandidates`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

   
	return (

		 <Container className="candidates">
            <Row style={{ marginTop:"40px"}}>     
            <h4>  {intl.formatMessage({ id: 'candidatesTitle' })} </h4>  <br/> <br/> <br/> 
            <ButtonGroup >
                    <Button active={activeB1}  onClick={() => {
                        setShowBy('overall')
                        setActiveB2(false)
                        setActiveB3(false)
                        setActiveB1(true)
                    }}>{intl.formatMessage({ id: 'candidatesMenuItem1' })}</Button>
                   
                    <Button active={activeB2}  onClick={() => {
                        setShowBy('overtime')
                        setActiveB3(false)
                        setActiveB1(false)
                        setActiveB2(true)
                    }}> 
                      <select value={showByTime} onChange={(event) => {
                          console.log(event.target.value)
                          setShowBy('overtime')
                          setShowByTime(event.target.value)
                      }} >
                            <option value="ads">{intl.formatMessage({ id: 'candidatesMenuItem21' })}</option>
                            <option value="spending">{intl.formatMessage({ id: 'candidatesMenuItem22' })}</option>
                            <option value="impressions">{intl.formatMessage({ id: 'candidatesMenuItem23' })}</option>
                        
                    </select>
                    </Button>
                 

                    <Button active={activeB3}  onClick={() => {
                        setShowBy('demographics')
                        setActiveB1(false)
                        setActiveB2(false)
                        setActiveB3(true)
                    }}>{intl.formatMessage({ id: 'candidatesMenuItem3' })}</Button>

            </ButtonGroup>
                <Col xl="12"  sm="12" >  
                {showBy === 'overall' 
                ? 
                globalSpedingPerCandidate.loading ?  <div style=  {{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                : 
                <HorizontalBarChart 
                title={intl.formatMessage({ id: 'candidatesPlotTitle1' })}
                labels = {globalSpedingPerCandidate.labels} 
                dataset={globalSpedingPerCandidate.data}
                currency= "€ "
                source={intl.formatMessage({ id: 'plotSource2' })} 
                /> 

                : (showBy === 'overtime' &&  adsPerCandidate.loading )
                ? 
                <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  

                :  (showBy === 'overtime' && showByTime === "ads")? 
                <div>
                 
                    <LineChartMultipleDatasets
                    title={intl.formatMessage({ id: 'candidatesPlot' })}
                    labels = {adsPerCandidate.labels} 
                    showBy = "ads"
                    datasets={adsPerCandidate.candidatesAds}
                    currency=""
                    total="true"
                    color="rgba(56, 56, 116, 1)"
                    colorOpacity="rgba(56, 56, 116, 0.1)"
                    source={intl.formatMessage({ id: 'plotSource1' })}
                />
                </div>
               
                : 
               ( showBy === 'overtime' && showByTime === "spending")? 
                <div>
                <LineChartMultipleDatasets
                    title={intl.formatMessage({ id: 'candidatesPlot2' })}
                    labels = {adsPerCandidate.labels} 
                    showBy = "spending"
                    datasets={adsPerCandidate.candidatesSpending}
                    currency=""
                    total="true"
                    color="rgba(56, 56, 116, 1)"
                    colorOpacity="rgba(56, 56, 116, 0.1)"
                    source={intl.formatMessage({ id: 'plotSource1' })}
                />
                </div>
           
                :  ( showBy === 'overtime' && showByTime === "impressions")? 
                <div>
                <LineChartMultipleDatasets
                    title={intl.formatMessage({ id: 'candidatesPlot3' })}
                    labels = {adsPerCandidate.labels} 
                    showBy = "impressions"
                    datasets={adsPerCandidate.candidatesImpressions}
                    currency=""
                    total="true"
                    color="rgba(56, 56, 116, 1)"
                    colorOpacity="rgba(56, 56, 116, 0.1)"
                    source={intl.formatMessage({ id: 'plotSource1' })}
                />
                </div> :
                
               <h6 style={{margin:"20px"}}>
                   This part is under working !
               </h6>

               
               }
                
               
                </Col>
            </Row>
            <br/>  
        </Container> 
        )
}


export default CandidatesView ;

/*
                    <Button onClick={() => setShowBy('topics')}>Topics</Button>

    <Button active={activeB2}  onClick={() => {
                        setShowBy('overtime')
                        setActiveB3(false)
                        setActiveB1(false)
                        setActiveB2(true)
                    }}>{intl.formatMessage({ id: 'candidatesMenuItem2' })}
                    </Button>
*/