import React, {useEffect, useState, useCallback} from 'react'
import {Container, Row, Spinner, Col, ButtonGroup, Button, DropdownToggle,DropdownItem, ButtonDropdown, DropdownMenu} from 'reactstrap'
import LineChartMultipleDatasets from '../Charts/LineChartMultipleDatasets'
import HorizontalBarChart from '../Charts/HorizontalBarChart'
//apis call 
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';
import { i } from 'mathjs'
import TwoBarChart from '../Charts/TwoBarChart'
import {
    Chart, Series, ValueAxis,ArgumentAxis, Label, CommonSeriesSettings,
  } from 'devextreme-react/chart';

  import { LabelTemplate } from '../Charts/LabelTemplate';

const CandidatesView = () => {
    const intl = useIntl();

    const [showBy, setShowBy] = useState('overall');
    const [showByTime, setShowByTime] = useState('ads');
    const [showOfBy, setShowOfBy] = useState('ads');

    const [activeB1, setActiveB1] = useState(true)
	const [activeB2, setActiveB2] = useState(false)
	const [activeB3, setActiveB3] = useState(false)

    const [activeOfB1, setActiveOfB1] = useState(true)
	const [activeOfB2, setActiveOfB2] = useState(false)
	const [activeOfB3, setActiveOfB3] = useState(false)

    const [candidateName, setCandidateName] = useState("macron");
	
 	const [adsPerCandidate,setAdsPerCandidate] = useState({
        data : [],
        loading:true,
        labels: ['Jan2022','Feb2022','March2022']


    })
    const [adsPerOfficialCandidate,setAdsPerOfficialCandidate] = useState({
        candidatesAds:[],
        candidatesSpending:[],
        candidatesImpressions:[],
        loading:true,
        labels: []


    })
 

    const [globalSpending,setGlobalSpending] = useState([{
        data : [],
        loading:true,
    }])


    const [demographicBreakdown,setDemographicBreakdown] = useState({
        femaleGender:[],
        maleGender:[],
        loading:true,
        labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    })
    const candidateImages = [
      {
        img: 'https://cdn-apps.letelegramme.fr/files/outils/2021/08/selon-emmanuel-macron-l-etape-zero-c-etait-la-5651902-removebg-preview.png'
      }, 
      {
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/Jean-Luc-MELENCHON-in-the-European-Parliament-in-Strasbourg-2016-cropped-removebg-preview.png'
    },
      {
        img: 'https://cdn-apps.letelegramme.fr/files/outils/2021/08/38h-Mh5b-400x400-removebg-preview.png'
      }, {
        img: 'https://cdn-apps.letelegramme.fr/files/outils/2021/08/LiU7-6Z3-400x400-removebg-preview.png'
      },  {
        img: 'https://cdn-apps.letelegramme.fr/files/outils/2021/08/J4pidVIB-400x400-removebg-preview.png'
      },
    {
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/e-bPnDY6-400x400-removebg-preview.png',
    },
    {
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/TN-L-17x-400x400-removebg-preview.png',
    },{
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/xRGGJGn1-400x400-removebg-preview.png'
    },{
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/taT-x7GV-400x400-removebg-preview.png'
    },{
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/yVqvYNcU-400x400-removebg-preview.png'
    },{
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/4xEOMZ-E-400x400-removebg-preview.png'
    },{
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/4xEOMZ-E-400x400-removebg-preview.png'
    },{
        img:'https://cdn-apps.letelegramme.fr/files/outils/2021/08/UD3loKNE-400x400-removebg-preview.png'
    },




];
      

    useEffect(() => {
        loadInfoPerCandidate()
        loadGlobalSpedingPerCandidate()
        loadDemographicBreakdown(candidateName)
        loadInfoPerOfficialCandidatePages()
        
    }, [])
    const  customizeLabel = (e) => {
        return `${e.value} € `;
      }

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
 
    const loadInfoPerOfficialCandidatePages = useCallback(async () => {
        setAdsPerOfficialCandidate({
            loading:true
        })
        const info = await fetchInfoPerOfficialCandidatePages()
        let candidates = []
       /* let candidatesAds = []
        let candidatesSpending = []
        let candidatesImpressions = []*/
        for (const d of info)
        {
            let element = {
                candidate: d.candidate,
                countAds: d.data[0].countAds, 
                spending:  d.data[0].money !== null ? parseInt(d.data[0].money) : 0,
                impressions :  d.data[0].impressions !== null ? parseInt(d.data[0].impressions) : 0
            }
         /*  candidates.push(d.candidate)
		   candidatesAds.push(d.data[0].countAds)
           d.data[0].impressions !== null ? candidatesImpressions.push(parseInt(d.data[0].impressions)) : candidatesImpressions.push(0)
           d.data[0].money !== null ? candidatesSpending.push(parseInt(d.data[0].money)) : candidatesSpending.push(0)*/
           candidates.push(element)
        }

        setAdsPerOfficialCandidate({

            data:candidates,
            loading:false,
        })

        
    })
 
     function compare_lname( a, b )
            {
               
            if( a.data[0] === undefined)
                a.data.push({spend:0})

                if( b.data[0] === undefined)
                b.data.push({spend:0})
            if ( parseInt(a.data[0].spend) < parseInt(b.data[0].spend)){
                return -1;
            }
            if (parseInt(a.data[0].spend)> parseInt(b.data[0].spend)){
                return 1;
            }
            return 0;
            }

    const loadGlobalSpedingPerCandidate = useCallback(async () => {
       
        setGlobalSpending({
            data:[],
            loading:true
        })
        const result = await fetchGlobalSpedingPerCandidate()
        console.log(result)
        result.sort(compare_lname)
        let spending = []
        let labels = []
        let l = []
        for (const d of result)
        {

            l.push({
                candidate:d.candidate,
                spend: d.data[0] !== undefined ? d.data[0].spend : 0,
            })
            labels.push(d.candidate)
            if(d.data[0] !== undefined){
                spending.push(parseInt(d.data[0].spend))
            }
            else  spending.push(0)
           
        
        }
        setGlobalSpending({
            data:l,
            loading:false
        })
      
    
    }, [])

    const loadDemographicBreakdown = useCallback(async (value) => {
        setCandidateName(value)
        setDemographicBreakdown({
            femaleGender:[],
            maleGender:[],
            loading:true,
            labels:['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
        })
        const data = await fetchDemographicBreakdown(value)
      
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

    const fetchInfoPerOfficialCandidatePages = async () => {
        let stats 
        await api.get(`api/pages/infosOfAdsByCandidateOfficialPages`)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }
    
    const fetchDemographicBreakdown = async (candidate) => {
        let stats 
        await api.get(`api/demographicDistribution/demographicBreakdownOfAdsMentioningCandidates/${candidate}`)
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
                
           <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>     
                
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
                globalSpending.loading ? 
                       <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  

                       :
                       <>
                       <h5>{intl.formatMessage({ id: 'candidatesPlotTitle1' })}</h5>
                       <br/>
                       <Chart id="chart"
                       rotated={true}

                            
                            dataSource={globalSpending.data}>
                            <CommonSeriesSettings 
                                type="bar" 
                                argumentField="candidate" 
                                cornerRadius={5}	
                                barPadding={0.1} >
                                <Label visible></Label>
                            </CommonSeriesSettings>
                            <Series
                                name={intl.formatMessage({ id: 'spend' })}
                                valueField="spend"
                                color="#8AC2E6" />
                            <ValueAxis>
                                    <Label customizeText={customizeLabel} />
                            </ValueAxis>
                            <ArgumentAxis>
                                <Label render={LabelTemplate}></Label>
                            </ArgumentAxis>
                        </Chart>
                       </>
                       
              

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
                    source={intl.formatMessage({ id: 'plotSource3' })}
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
                    source={intl.formatMessage({ id: 'plotSource3' })}
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
                    source={intl.formatMessage({ id: 'plotSource3' })}
                />
                </div> :
                
                       
                         demographicBreakdown.loading ? 
                          <div style={{ width:"100%", height:"400px",
                              display:'flex', justifyContent:"center",alignItems:'center'}}>
                                <Spinner>  </Spinner> 
                          </div> 
                         : 
                         <>
                                <select className='candidateSelect' value={candidateName} onChange={(event) => loadDemographicBreakdown(event.target.value)}>
                                    <option value="Macron">Emmanuel Macron</option>
                                    <option value="Mélenchon">Jean-Luc Mélenchon</option>
                                    <option value="Le pen">Marine Le Pen</option>
                                    <option value="Zemmour">Eric Zemmour</option>
                                    <option value="Roussel">Fabien Roussel</option>
                                    <option value="Hidalgo">Anne Hidalgo</option>
                                    <option value="Arthaud">Nathalie Arthaud</option>
                                    <option value="Dupont-Aignan">Nicolas Dupont-Aignan</option>
                                    <option value="Lassalle">Jean Lassalle </option>
                                    <option value="Poutou">Philippe Poutou</option>
                                    <option value="Jadot">Yannick Jadot</option>
                                    <option value="Pécresse">Valérie Pécresse</option>


                                </select>

                                <TwoBarChart 
                                    title={intl.formatMessage({ id: 'candidatesPlo4' })  + candidateName} 
                                    labels={demographicBreakdown.labels}
                                    dataset1={demographicBreakdown.femaleGender}
                                    dataset2={demographicBreakdown.maleGender}
                                    source  = {intl.formatMessage({ id: 'plotSource3' })}
                                /> 
                         
                       </>

               
               }
                
               
                </Col>
            </Row>

             <Row style={{marginTop:"20px", minHeight:"300px", padding:"30px"}}>  

                 <Col xl="12"  sm="12" >  
                 <ButtonGroup >
                    <Button active={activeOfB1} onClick={() => {
                        setShowOfBy('ads')
                        setActiveOfB2(false)
                        setActiveOfB3(false)
                        setActiveOfB1(true)
                    }}>{intl.formatMessage({ id: 'filterType1' })}</Button>
                    <Button active={activeOfB2} onClick={() => {
                        setShowOfBy('spending')
                        setActiveOfB3(false)
                        setActiveOfB1(false)
                        setActiveOfB2(true)
                    }}> {intl.formatMessage({ id: 'filterType2' })} </Button>
                    <Button active={activeOfB3} onClick={() => {
                        setShowOfBy('impressions')
                        setActiveOfB1(false)
                        setActiveOfB2(false)
                        setActiveOfB3(true)
                    }}>{intl.formatMessage({ id: 'filterType3' })} </Button>
                </ButtonGroup>

                {
                    showOfBy === "ads" ?
                   
                     adsPerOfficialCandidate.loading ? 
                     <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  
                     : 
                     <>
                     <h5>{intl.formatMessage({ id: 'candidatesPlotTitle11' })}</h5>
                     <br/>
                     <Chart 
                        id="chart"
                        rotated={true}
                        dataSource={adsPerOfficialCandidate.data}>
                          <CommonSeriesSettings 
                              type="bar" 
                              argumentField="candidate" 
                              cornerRadius={5}	
                              barPadding={0.1} >
                              <Label visible></Label>
                          </CommonSeriesSettings>
                          <Series
                              name={intl.formatMessage({ id: 'spend' })}
                              valueField="countAds"
                              color="#8AC2E6" />
                          <ArgumentAxis>
                              <Label render={LabelTemplate}></Label>
                          </ArgumentAxis>
                      </Chart>
                     </>
                     : showOfBy === "spending" ? 
                     adsPerOfficialCandidate.loading ?  <div style=  {{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                  
                     <>
                     <h5>{intl.formatMessage({ id: 'candidatesPlot12' })}</h5>
                     <br/>
                     <Chart 
                        id="chart"
                        rotated={true}
                        dataSource={adsPerOfficialCandidate.data}>
                          <CommonSeriesSettings 
                              type="bar" 
                              argumentField="candidate" 
                              cornerRadius={5}	
                              barPadding={0.1} >
                              <Label visible></Label>
                          </CommonSeriesSettings>
                          <Series
                              name={intl.formatMessage({ id: 'spend' })}
                              valueField="spending"
                              color="#8AC2E6" />
                                                        <ValueAxis>
                                    <Label customizeText={customizeLabel} />
                            </ValueAxis>
                          <ArgumentAxis>
                              <Label render={LabelTemplate}></Label>
                          </ArgumentAxis>
                      </Chart>
                     </>
                     :
                     adsPerOfficialCandidate.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                  

                     <>
                     <h5>{intl.formatMessage({ id: 'candidatesPlot13' })}</h5>
                     <br/>
                     <Chart 
                        id="chart"
                        rotated={true}
                        dataSource={adsPerOfficialCandidate.data}>
                          <CommonSeriesSettings 
                              type="bar" 
                              argumentField="candidate" 
                              cornerRadius={5}	
                              barPadding={0.1} >
                              <Label visible></Label>
                          </CommonSeriesSettings>
                          <Series
                              name={intl.formatMessage({ id: 'spend' })}
                              valueField="impressions"
                              color="#8AC2E6" />
                                                 
                          <ArgumentAxis>
                              <Label render={LabelTemplate}></Label>
                          </ArgumentAxis>
                      </Chart>
                     </>
                     } 
                 </Col>    
            </Row>
         
           
        </Container> 
        )
}


export default CandidatesView ;
