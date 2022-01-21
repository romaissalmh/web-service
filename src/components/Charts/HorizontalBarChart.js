import React from 'react';
import { Card,CardTitle, CardBody,Col } from "reactstrap";
import { Bar } from 'react-chartjs-2';




export default function HorizontalBarChart({title,dataset,labels, source}) {
  const options = {    
    responsive: true,
    //maintainAspectRatio: false,
    indexAxis: 'y', 
    layout: {
      padding: 0
    },
    scales: {
      x: 
        {
          ticks: {
            font: {
              size: 14,
              family: 'Gotham-Light'
          }
        },
          grid: {
            display: true,
            borderColor: 'transparent'
          }
        }
      ,
      y: 
        {
          //display:true,
          ticks: {
     
            font: {
              size: 14,
              weight:'bold',
              family: 'Gotham-Light'
          }
        },
          grid: {
            display: true,
            borderColor: 'transparent'
          },
          
        }
      
    },
    plugins: {
      legend: {
          display:false,
          labels: {
              //display:false,
              // This more specific font property overrides the global property
              font: {
                  size: 14,
                  family: 'Gotham-Light'
              }
          }
      },
      datalabels: {
        display: false,
        color: '#383874',
        font: {
         size: 14,
         family: 'Gotham-Light',
        }
     }
    },
    
   
  };
    const data = {
        labels,
        padding:10,
        datasets: [
          {
          
            data: dataset,
            labels:labels,
            backgroundColor:[ '#383874','#8675FF'],
            borderRadius: 6,
            //barThickness:40,
            //borderWidth:5,
            //borderSkipped:false,
            borderColor: 'rgba(0, 0, 0, 0)',
            maxBarThickness: 50,
            barPercentage: 0.9,
            categoryPercentage: 0.9,
            ticks: {
              min: 0,
            },
           
      
          },
         
        ],
      };
      
  return(
  <>
      
        <Card className=" shadow">
           
          <CardBody>
            <CardTitle tag="h5" style={{fontFamily:"Gotham-Bold"}}>
                {title}
            </CardTitle>
            <div className="" style={{height:""}}>
          
             
                <Bar options={options} data={data} />
              
                 
            </div>
          </CardBody>
          <p style={{fontSize:"11px"}}>
                {source}   
             </p>
                    
        </Card>
    
    </>)
  
  
  
  
  
  
  
  
  
  
  
}

//  
