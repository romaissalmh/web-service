import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {pieOptions} from './variables/chart'

import { Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ title,icon, labels, dataset }) => {
   
    const pieData = {
        labels: labels,
        datasets: [{
            data: dataset,
            backgroundColor:['#FFCB41','#8675FF','#FF9065','#5eff5a'],
            hoverBorderColor:'#383874'
        }]
    }
    return (
        <>
            <Card className=" shadow">
                <Row  style={{borderBottomStyle:"solid", borderBottomWidth:'1px', borderBottomColor:'var(--lavender)', paddingBottom:'10px'}}>
                    <Col>
                            <h5 style={{marginTop:"5px"}} >
                                 {title} 
                            </h5>
                    </Col>
                    <Col className="col-auto">
                    <div style={{width:"3em", height:"3em", display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"#383874"}} className={"icon icon-shape text-white rounded-circle shadow"}>
                          {icon}
                        </div>
                    </Col>
                </Row>
                <CardBody>
                <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Pie    data={pieData}
                                options={pieOptions}
                                height={450}
                                width={450}/>
                </Row>
              </CardBody>
            </Card>
        </>
    );
}
export default PieChart;
