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
import { Card,CardTitle, CardBody,Row,Col,Button} from "reactstrap";
import {lineOptions} from './variables/chart'
import '../../assets/css/styles.css'
import StatsCard from './StatsCard'
import { BiBarChartAlt2, BiLineChart} from "react-icons/bi";

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

  const calcSum = (arr) => {
    try{
      return arr.reduce((a, b) => a + b, 0)
    }
    catch(e){

    }
  }
   
  
function LineChart({chartOptions,dataset,labels,title, currency,color, colorOpacity, source, total /*,shownByMoney, changeShowBy*/}) {
  const [line, setLine] = useState(true)
   

    const data = {
      labels,
      datasets: [ //rgba(56, 56, 116, 1)
        {
          data: dataset,
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
        <Card className="shadow">
            <CardTitle >
                <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)'}} >
                  <Col xl="8" sm="8">
                    <h5 style={{fontFamily:"Gotham-Bold"}}>
                   {title} 
                    </h5>
                  </Col>
                
                        {/*shownByMoney ?
                          <div className="flex">
                            <Button style={{backgroundColor:'var(--night-blue)', borderStyle:'none'}}  type="button" onClick={() => changeShowBy(true)}>
                                    Amount Of Money
                            </Button>
                            <Button style={{ backgroundColor:'var(--lavender)',  color:'var(--night-blue)', borderStyle:'none'}} className="shadow"   type="button" onClick={() => changeShowBy(false)}>
                                    Number Of Ads
                            </Button>
                          </div>
                          :
                          <div className="flex">
                            <Button style={{backgroundColor:'var(--lavender)', color:'var(--night-blue)',borderStyle:'none'}}  className="shadow"  type="button" onClick={() => changeShowBy(true)}>
                                     Amount Of Money
                            </Button>
                            <Button style={{backgroundColor:'var(--night-blue)', borderStyle:'none'}}    type="button" onClick={() => changeShowBy(false)}>
                                      Number Of Ads
                            </Button>
                          </div>
                        */}
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
                
                {
                  total=="true" ? 
                  <Row  style={{marginTop:"10px", flex:"display", justifyContent:"space-between", alignItems:"center"}} >
                  <Col  >
                  {<StatsCard
                                    text={"Total : "}
                                    value={  calcSum(dataset) + currency}
                                    percentage={false}
                                    textColor= {color}
                                    icon={ <BiBarChartAlt2 size="1.5em"/> }
                        />
                    }
                  </Col>
                 
                 </Row>
                  :""
                }
             





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






/* 

<div className="mr-5 mt-2">
                {<StatsCard  className=""
                                  text={"Total : "}
                                  value={calcSum(data)}
                                  percentage={false}
                                  textColor={"dark"}
                                  icon={icon}
                      />
                  }
                </div>









*/