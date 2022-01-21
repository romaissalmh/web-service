var mode = "light" //(themeMode) ? themeMode : 'light';

const lineOptions = {
  responsive: true,
  layout: {
    padding: 0
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
  plugins: {
    legend: {
        display:false,
        labels: {
            display:false,
            font: {
                size: 12,
                family: 'Gotham-Light'
            }
        }
    },
      datalabels: {
         display: false,
      }
  },
 
} 




const pieOptions = {
  responsive: false,
  plugins: {
    legend: {
        display:true,
        labels: {
            display:true,
            font: {
                size: 14,
                family: 'Gotham-Bold',

            }
        }
    },
      datalabels: {
         display: true,
         color: '#383874',
         font: {
          size: 14,
          family: 'Gotham-Light',
         }
      }
  },
   elements: {
     
      arc: {
        backgroundColor: ['#8675FF','#FF9065','#FFCB41','#5eff5a'],
        borderColor: '#fff',
        borderWidth: 3,
       /* borderRadius:8*/
      },
      
    },
  
}


module.exports = {
  lineOptions,
  pieOptions
 
  }