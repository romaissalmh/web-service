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
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );



   
  
function LineChart({dataset,labels,currency,color, colorOpacity, source,  /*,shownByMoney, changeShowBy*/}) {
  const [line, setLine] = useState(true)
  const [showBy, setShowBy] = useState('ads');
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
                    <Button onClick={() => setShowBy('ads')}>{intl.formatMessage({ id: 'filterType1' })}</Button>
                    <Button onClick={() => setShowBy('spending')}> {intl.formatMessage({ id: 'filterType2' })} </Button>
                    <Button onClick={() => setShowBy('impressions')}>{intl.formatMessage({ id: 'filterType3' })} </Button>
        </ButtonGroup>
      
        <Card  className="shadow">
            <CardTitle >
             
                <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)'}} >
                  <Col xl="8" sm="8">
              
                    <h5 style={{fontFamily:"Gotham", fontWeight:"bold"}}>
                   {showBy === 'ads' ?  dataset.adsTitle : showBy === 'spending' ? dataset.spendingTitle : dataset.impressionsTitle}
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




