import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner, Dropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap'
import HorizontalBarChart from '../Charts/HorizontalBarChart'
import { BiEuro } from "react-icons/bi" 
//apis call 
import {api} from '../../scripts/network'

const DemographicView = () => {
    
    const [demographicBreakdown,setDemographicBreakdown] = useState({
        data : [],
        age:'18-24',
        gender:'male',
        loading:true,
        labels: []

    })
  
    useEffect(() => {
        loadDemographicBreakdown('18-24','male')
      
    }, [])
 

     const loadDemographicBreakdown = useCallback(async (age,gender) => {
        setDemographicBreakdown({
            data:[],
            loading:true,
            age:age,
            gender:gender,
            labels:[],

        })
        const data = await fetchDemographicBreakdown(age,gender)
       let pages = data.map(
            a => a.page_name 
        )
        let impressions = data.map(
            a => Math.round(parseInt(a.reach)) 
        )

          setDemographicBreakdown({
            data:impressions,
            loading:false,
            age:age,
            gender:gender,
            labels:pages,

        })
          console.log(demographicBreakdown)

    })
    // fetching data from the server

    const fetchDemographicBreakdown =  async (age,gender) => {
        let stats 
        await api.get(`api/demographicDistribution/pageReachByGenderAge/`+age+`/`+gender)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
     }


	return (

		 <Container className="analytics">
            <br/> 
            <Row style={{marginLeft:"5vw"}}>     
            <h6> Audience demographics statistics </h6>         
              <div style={{display:"flex","justify-content":"space-around"}}> 
            
                  <select value={demographicBreakdown.gender} onChange={(event) => loadDemographicBreakdown(demographicBreakdown.age,event.target.value)}>
                         <option value="female">Female</option>
                         <option value="male">Male</option>
                </select>


                <select  value={demographicBreakdown.age} onChange={(event) => loadDemographicBreakdown(event.target.value,demographicBreakdown.gender)}>
                        <option value="13-17">13-17</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="35-44">35-44</option>
                        <option value="45-54">45-54</option>
                        <option value="55-64">55-64</option>
                        <option value="65+">65+</option>

                </select>


             </div> 
              

                <Col xl="12"  sm="12" >  
                 {
                     demographicBreakdown.loading ?  <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                     : 
                     <HorizontalBarChart 
                     title={"Pages that reached " +demographicBreakdown.age+" years-old "+demographicBreakdown.gender+ " the most"}
                    labels = {demographicBreakdown.labels} 
                    dataset={demographicBreakdown.data}

                    // color="rgba(255, 186, 105, 1)"
                    // colorOpacity="rgba(255, 186, 105, 0.1)"
                      source="Source: Facebook Ad Library. Total spent on Facebook ads since July 1, 2021 targeting french regions. This chart is displaying number of people reached by some Facebook pages"
                     />  

                   }      
                   
            

                </Col>  
                
            
              </Row>  
        </Container>
            )
}


export default DemographicView ;