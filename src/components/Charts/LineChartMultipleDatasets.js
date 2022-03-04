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


  
function LineChartMultipleDatasets({chartOptions,datasets,labels,title, currency,color, colorOpacity, source, total}) {
  const [line, setLine] = useState(true)
      const options = {    
   
    plugins: {
      legend: {
          display:true,
          labels: {
              //display:false,
              // This more specific font property overrides the global property
              font: {
                  size: 14,
                  family: 'Gotham'
              }
          }
      },
      datalabels: {
        display: false,
        color: '#383874',
        font: {
         size: 14,
         family: 'Gotham',
        }
     }
    },
    
   
  };
    console.log(datasets[0].label)
    const data = {
      labels,
      datasets: [ 
        {
          label:datasets[0].label,
          data: datasets[0].data,
          borderColor: "#8675FF",
          fill: line ? true : false,
          backgroundColor: line ? "rgba(134, 117, 255, 0.2)" :"#8675FF",
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: "#8675FF",
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
         {
          label:datasets[1].label,
          data: datasets[1].data,
          borderColor: "#ff2d2e",
          fill: line ? true : false,
          backgroundColor: line ? "rgba(255, 45, 46, 0.2)" :"#ff2d2e",
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: "#ff2d2e",
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
        },
         {
          label:datasets[2].label,
          data: datasets[2].data,
          borderColor: "#5eff5a",
          fill: line ? true : false,
          backgroundColor: line ? "rgba(94, 255, 90, 0.2)" :"#5eff5a",
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: "#5eff5a",
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
         {
          label:datasets[3].label,
          data: datasets[3].data,
          borderColor: "#ffba69",
          fill: line ? true : false,
          backgroundColor: line ? "rgba(255, 186, 105, 0.2)" :"#ffba69",
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: "#ffba69",
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
         {
          label:datasets[4].label,
          data: datasets[4].data,
          borderColor: "rgb(255, 112, 139)",
          fill: line ? true : false,
          backgroundColor: line ? "rgb(255, 112, 139,0.2)" :"rgb(255, 112, 139)",
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgb(255, 112, 139)",
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
        {
          label:datasets[5].label,
          data: datasets[5].data,
          borderColor: "rgba(56, 56, 116, 1)",
          fill: line ? true : false,
          backgroundColor: line ? "rgba(56, 56, 116, 0.2)" :"rgba(56, 56, 116, 1)",
          borderRadius: 2,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(56, 56, 116, 1)",
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
       
        },
      ],
    };
    return (
        <>
        <Card className="shadow">
            <CardTitle >
                <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)'}} >
                  <Col xl="8" sm="8">
                    <h5 style={{fontFamily:"Gotham", fontWeight:"bold"}}>
                   {title} 
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
                     <Line options={options} data={data} />

                  
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

export default LineChartMultipleDatasets




