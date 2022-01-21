import React, {useState} from 'react';
import { Card,CardTitle, CardBody,Col, Button,Row} from "reactstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { BiBarChartAlt2, BiLineChart} from "react-icons/bi";
import { lineOptions } from './variables/chart';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);



export const options = {
  responsive: true,
  layout: {
    padding: 0
  },
  plugins: {
   
    legend: {
      display: false,
      position: 'top',
      font: {
        size: 12,
        family: 'Gotham-Light'
    }
    },
    title: { 
      display: false,
      font: {
        size: 12,
        family: 'Gotham-Light'
    },
    
    },
    datalabels: {
      display: false,
   }
  },
  scales: {
    x: 
      {
        display:true,
        position:'right',
        ticks: {
          font: {
            size: 14,
            family: 'Gotham-Light'
        }
        
      },
        grid: {
          display: false,
          borderColor: 'transparent'
        },
       
      }
    ,
    y: 
      {
        display:true,
        ticks: {
          font: {
            size: 12,
            family: 'Gotham-Light'
        }},
        grid: {
          display: false,
          borderColor: 'transparent'
        },
      },
  },
  elements: {
    point: {
      radius: 0,
      backgroundColor: 'red',
    },
    line: {
      tension: 0.1, 
      borderWidth: 4,
      borderColor: 'red',
      backgroundColor: 'transparent',
      borderCapStyle: "rounded"
    },
    rectangle: {
      backgroundColor: 'red'
    },
    arc: {
      backgroundColor: 'red',
      borderColor: 'red',
      borderWidth: 4
    }
  },
};

export default function TwoBarChart({title,dataset1,dataset2,labels, source}) {
  
  const [bar, setBar] = useState(true)

  const data = {
  labels,
  padding:10,
  datasets: [
    {
      label: 'Female',
      data: dataset1,
      borderColor: bar ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 112, 139,1)'  ,
      fill: bar ? false : true,
      backgroundColor: bar ? 'rgba(255, 112, 139,1)' :'rgba(255, 112, 139,0.1)',
      borderRadius: 6,
      borderWidth:2,
      barThickness:40,
      pointBorderWidth:3,
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(255, 112, 139,1)",
      pointStyle: 'circle',
      pointRadius:6,
      tension: 0.2,
    },
    {
      label: 'Male',
      data: dataset2,
      fill: bar ? false : true,
      borderColor: bar ? 'rgba(0, 0, 0, 0)': 'rgba(56, 56, 116, 1)' ,
      backgroundColor: bar ? 'rgba(56, 56, 116, 1)' :'rgba(56, 56, 116,0.1)',
      borderRadius: 6,
      barThickness:40,
      borderWidth:2,
      pointBorderWidth:3,
      pointBorderColor: "#fff",
      pointBackgroundColor: "rgba(56, 56, 116, 1)",
      pointStyle: 'circle',
      pointRadius:6,
      tension: 0.2,
    },
  ],
};

  return(
  
        <Card className=" shadow">
        <Row style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)', paddingBottom:'10px'}}>
            <Col xl="8" >
              <CardTitle tag="h5" style={{fontFamily:"Gotham-Bold"}}>
                {title}
              </CardTitle>  
            </Col>
            <Col xl="4"   style={{display:"flex", justifyContent:"flex-end"}}>
                    {bar ? (
                         <div className="flex">
                         <Button style={{backgroundColor:'var(--night-blue)', borderStyle:'none'}}  type="button" onClick={() => setBar(true)}>
                            <BiBarChartAlt2 size={20}/>
                         </Button>
                         <Button style={{ backgroundColor:'var(--lavender)',  color:'var(--night-blue)', borderStyle:'none'}} type="button" onClick={() => setBar(false)}>
                            <BiLineChart size={20}/> 
                         </Button>
                       </div>
                      )
                      :
                      <div className="flex">
                        <Button style={{backgroundColor:'var(--lavender)',  color:'var(--night-blue)', borderStyle:'none'}}  type="button" onClick={() => setBar(true)}>
                            <BiBarChartAlt2 size={20}/>

                        </Button>
                        <Button style={{ backgroundColor:'var(--night-blue)', borderStyle:'none'}} className="shadow"   type="button" onClick={() => setBar(false)}>
                             <BiLineChart size={20}/> 
                        </Button>
                    </div>    
                    }
                </Col>
        </Row>
        <CardBody>
            {
              bar ?   <Bar options={options} data={data} />
              :  <Line options={lineOptions} data={data} />
            }
            
          </CardBody>
          <p style={{fontSize:"11px"}}>
                {source}   
             </p>
                    
        </Card>
  )

}


