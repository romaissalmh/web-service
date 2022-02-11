import React from 'react';
import { Card,CardTitle, CardBody,Col } from "reactstrap";
import { Bar } from 'react-chartjs-2';




export default function HorizontalBarChart({title,dataset,labels, source}) {
    function abbreviateNumber(number){
       var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier == 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }
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
          },
          callback: function(value, index, values) {
                        return abbreviateNumber(value);
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
              family: 'Gotham'
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
                  family: 'Gotham'
              }
          }
      },
      datalabels: {
        display: false,
        color: '#fff',
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
            <CardTitle tag="h5" style={{fontFamily:"Gotham", fontWeight:"bold"}}>
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
