import {useState,React} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler 
  } from 'chart.js'; 
import { Line, Bar } from 'react-chartjs-2';
import { Card,CardTitle, CardBody,Row,Col,Button,ButtonGroup} from "reactstrap";
import {lineOptions} from './variables/chart'
import '../../assets/css/styles.css'
import { BiBarChartAlt2, BiLineChart} from "react-icons/bi";
import { useIntl } from 'react-intl';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
  );

  
function LineChart({dataset,labels,color, colorOpacity, source}) {
  const [line, setLine] = useState(true)
  const [showBy, setShowBy] = useState('ads');
  const [activeB1, setActiveB1] = useState(true)
  const [activeB2, setActiveB2] = useState(false)
  const [activeB3, setActiveB3] = useState(false)
  const intl = useIntl();
    const data = {
      labels,
      datasets: [ 
        {
          data: showBy === 'ads' ?  dataset.ads : showBy === 'spending' ? dataset.spending : dataset.impressions,
          borderColor: color,
          fill: line ? true : false,
          backgroundColor: line ? colorOpacity :color,
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: color,
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        }
      ],
    };
    return (
        <>
        <ButtonGroup > 
                    <Button active={activeB1} onClick={() => {
                            setShowBy('ads') 
                            setActiveB2(false)
                            setActiveB3(false)
                            setActiveB1(true)
                    } }>{intl.formatMessage({ id: 'filterType1' })}</Button>
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
      
        <Card  className="shadow">
            <CardTitle >
             
                <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)'}} >
                  <Col xl="8" sm="8">
              
                    <h5 style={{fontFamily:"Gotham", fontWeight:"bold"}}>
                   {showBy === 'ads' ? intl.formatMessage({ id: 'plotTitle1' }) : showBy === 'spending' ?  intl.formatMessage({ id: 'plotTitle2' }) : intl.formatMessage({ id: 'plotTitle3' })}
                    </h5>
                  </Col>
                
                       <Col style={{display:"flex", justifyContent:"flex-end",paddingBottom:"10px"}}>
                    {line ? (
                         <div className="flex">
                         <Button style={{backgroundColor:color, borderStyle:'none'}}  type="button" onClick={() => setLine(true)}>
                            <BiLineChart size="22" />
                         </Button>
                         <Button style={{ backgroundColor:colorOpacity,  color:color, borderStyle:'none'}} type="button" onClick={() => setLine(false)}>
                            <BiBarChartAlt2 size="22"/> 
                         </Button>
                       </div>
                      )
                      :
                      <div className="flex">
                        <Button style={{backgroundColor:colorOpacity,  color:color, borderStyle:'none'}}  type="button" onClick={() => setLine(true)}>
                            <BiLineChart size="22"/>

                        </Button>
                        <Button style={{ backgroundColor:color, borderStyle:'none'}} className="shadow"   type="button" onClick={() => setLine(false)}>
                             <BiBarChartAlt2 size="22"/> 
                        </Button>
                    </div>    
                    }
                </Col>
              
             
                </Row>
                
             





            </CardTitle>
            <CardBody>
                
                <div className="chart">
                  {/* Chart wrapper */}
                  {line ? (
                     <Line options={lineOptions} data={data} />

                  
                  ) :
                  (
                    <Bar options={lineOptions} data={data} />

                  )
                  }   
                </div>
               
            </CardBody>
             <p style={{fontSize:"11px"}}>
                {source}   
             </p>
                    
        </Card>
        </>
    )
}

export default LineChart




