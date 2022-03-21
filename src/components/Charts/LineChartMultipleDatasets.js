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

import { default as ReactSelect } from "react-select";

import { Line } from 'react-chartjs-2';
import { Card,CardTitle, CardBody,Row,Col,Button} from "reactstrap";
import '../../assets/css/styles.css'
import { components } from "react-select";


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


  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
   const candidatesOptions = [
    { value: 0, label: "Emmanuel Macron", color:"#ff2d2e" },
    { value: 1, label: "Jean-Luc Mélenchon", color:"#8675FF" },
    { value: 2, label: "Marine Le Pen", color:"#5eff5a" },
    { value: 3, label: "Eric Zemmour", color:"#ffba69" },
    { value: 4, label: "Fabien Roussel", color:"#7C4733" },
    { value: 5, label: "Anne Hidalgo" , color:"#5541D8"},
    { value: 6, label: "Nathalie Arthaud" , color:"#292B68"},
    { value: 7, label: "Nicolas Dupont-Aignan", color:"#BB1D4B" },
    { value: 8, label: "Jean Lassalle", color:"#D8B46F" },
    { value: 9, label: "Philippe Poutou" , color:"#D84560"},
    { value: 10, label: "Yannick Jadot", color:"black" },
    {value:11, label:"Valérie Pécresse", color:"#dbdff1"}
  ];
function LineChartMultipleDatasets({datasets,labels,title, currency,color, colorOpacity, source, total}) {
  const [optionSelected, setOptionSelected] = useState([
    {value: 0, label: 'Emmanuel Macron'},
    {value: 1, label: 'Jean-Luc Mélenchon'},
    {value: 2, label: 'Marine Le Pen'},
    {value: 3, label: 'Eric Zemmour'}
  ])
  const [dataList, setDataList] = useState([
      {
        label:datasets[0].label,
        data: datasets[0].data.spending,
        borderColor: candidatesOptions[0].color,
        fill: true,
        backgroundColor:"transparent",
        borderRadius: 1,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[0].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
     
      },
       {
        label:datasets[1].label,
        data: datasets[1].data.spending,
        borderColor: candidatesOptions[1].color,
        fill:  true ,
        backgroundColor:  "transparent" ,
        borderRadius: 1,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[1].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
      },
       {
        label:datasets[2].label,
        data: datasets[2].data.spending,
        borderColor: candidatesOptions[2].color,
        fill: true,
        backgroundColor: "transparent",
        borderRadius: 1,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[2].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
     
      },
       {
        label:datasets[3].label,
        data: datasets[3].data.spending,
        borderColor:candidatesOptions[3].color,
        fill: true,
        backgroundColor: "transparent" ,
        borderRadius: 2,
        BarThickness: 40,
        pointBorderWidth:3,
        pointBorderColor: "#fff",
        pointBackgroundColor: candidatesOptions[3].color,
        pointStyle: 'circle',
        pointRadius:6,
        tension: 0.2,
     
      },
    
    ],)
  const options = {    
    scales:{
      y:{
        ticks: {beginAtZero: true,}
      }
    },
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

  const onChangeSelected = (selected) => {
    setOptionSelected(selected)
    let list = []
      for(let s in selected) {
        console.log(selected[s])
        list.push({
          label:datasets[selected[s].value].label,
          data: datasets[selected[s].value].data.spending,
          borderColor: candidatesOptions[selected[s].value].color,
          fill: true,
          backgroundColor: "transparent",
          borderRadius: 1,
          BarThickness: 40,
          pointBorderWidth:3,
          pointBorderColor: "#fff",
          pointBackgroundColor: candidatesOptions[selected[s].value].color,
          pointStyle: 'circle',
          pointRadius:6,
          tension: 0.2,
        })
      }
      setDataList(list)
  }
    let l = ['Jan2022','Feb2022','March2022']
    const data = {
      labels,
      datasets: dataList,
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
                
                      
              
             
                </Row>
                
             
             





            </CardTitle>
            <CardBody>
                      <ReactSelect
                      options={candidatesOptions}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        Option
                      }}
                      onChange={ (selected ) => {onChangeSelected(selected)}}
                      allowSelectAll={true}
                      value={optionSelected}
                    />
                <div className="chart">
                  
                     <Line options={options} data={data} />

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




