import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner, PaginationItem, Pagination, PaginationLink} from 'reactstrap'
import MUIDataTable from "mui-datatables"
//apis call 
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';
import AdCard from '../Charts/AdCard';

const WhoSeesWhat = () => {
    const intl = useIntl();

    const [adsPart1,setAdsPart1] = useState({
        data : [],
        age:'18-24',
        gender:'male',
        candidate:'',
        loading:true,

    })
  
    const [adsPart2,setAdsPart2] = useState({
        data : [],
        age:'35-44',
        gender:'female',
        candidate:'',
        loading:true,

    })
  
    useEffect(() => {
        loadAdsPart1('18-24','male')
        loadAdsPart2('35-44','female')

    }, [])
  

     const loadAdsPart1 = useCallback(async (age,gender) => {
        setAdsPart1({
            data:[],
            loading:true,
            age:age,
            gender:gender,

        })
        const data = await fetchAdsPart1(age,gender)
      

        setAdsPart1({
            data:data,
            loading:false,
            age:age,
            gender:gender,

        })

    })

    const loadAdsPart2 = useCallback(async (age,gender) => {
        setAdsPart2({
            data:[],
            loading:true,
            age:age,
            gender:gender,

        })
        const data = await fetchAdsPart2(age,gender)
     

        setAdsPart2({
            data:data,
            loading:false,
            age:age,
            gender:gender,
        })

    })
    // fetching data from the server

    const fetchAdsPart1 =  async (age,gender) => {
        let stats 
        await api.get(`api/demographicDistribution/entitiesTargetingAgeGender/`+age+`/`+gender)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

    const fetchAdsPart2 =  async (age,gender) => {
        let stats 
        await api.get(`api/demographicDistribution/entitiesTargetingAgeGender/`+age+`/`+gender)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

    const columns1 = [
        {
            name: intl.formatMessage({ id: 'filterType1' }),           
            options: {
             filter: false,
             sort: false,
             customBodyRenderLite: (dataIndex) => {
               return <AdCard date={adsPart1.data[dataIndex].ad_delivery_start_time} ad={adsPart1.data[dataIndex].ad_creative_body} advertiser={adsPart1.data[dataIndex].page_name} funding = {adsPart1.data[dataIndex].funding_entity}/> 
         }  }  }, ];
        
    const columns2 = [
            {
                name: intl.formatMessage({ id: 'filterType1' }),           
                options: {
                 filter: false,
                 sort: false,
                 customBodyRenderLite: (dataIndex) => {
                   return <AdCard date={adsPart2.data[dataIndex].ad_delivery_start_time} ad={adsPart2.data[dataIndex].ad_creative_body} advertiser={adsPart2.data[dataIndex].page_name} funding = {adsPart2.data[dataIndex].funding_entity}/> 
        }  }  }, ];    

    const options = {
        filterType: 'checkbox',
      //filter: false,
        download: false,
        print: false,
        search: false,
        filter:false,
        viewColumns:false,
        selectableRowsHeader:false,
        selectableRows:'none'
        
       };

	return (
		<Container className="analytics">
            <Row style={{padding:"30px"}}>  
                <h6 style={{fontSize:"22px"}}> {intl.formatMessage({ id: 'menuItem6' })}   
                  <span style={{fontSize:"16px", fontWeight:"lighter"}}>{intl.formatMessage({ id: 'whoseesWhatDesc' })} </span>      </h6>  
         
                  
                <br/>      <br/>
                <Col xl="6" sm="12" >
                    <div style={{display:"flex", justifyContent:"space-around"}}> 
                        <select value={adsPart1.gender} onChange={(event) => loadAdsPart1(adsPart1.age,event.target.value)}>
                            <option value="female">{intl.formatMessage({ id: 'female' })} </option>
                            <option value="male">{intl.formatMessage({ id: 'male' })} </option>
                        </select>
                        <select  value={adsPart1.age} onChange={(event) => loadAdsPart1(event.target.value,adsPart1.gender)}>
                            <option value="13-17">13-17</option>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="55-64">55-64</option>
                            <option value="65+">65+</option>
                        </select>
                    </div> 
                    <br/>
                    <div style={{height:"80vh"}}>
                    <MUIDataTable style={{maxHeight:'100%'}}
                        data={adsPart1.data}
                        columns={columns1}
                        options={options}
                        />
                    </div>
                   
                </Col>
                <Col xl="6" sm="12">
                    <div style={{display:"flex",justifyContent:"space-around"}}> 
                        <select value={adsPart2.gender} onChange={(event) => loadAdsPart2(adsPart2.age,event.target.value)}>
                            <option value="female">{intl.formatMessage({ id: 'female' })} </option>
                            <option value="male">{intl.formatMessage({ id: 'male' })} </option>
                        </select>
                        <select  value={adsPart2.age} onChange={(event) => loadAdsPart2(event.target.value,adsPart2.gender)}>
                            <option value="13-17">13-17</option>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="55-64">55-64</option>
                            <option value="65+">65+</option>
                        </select>
                    </div> 
                    <br/>
                    <div style={{height:"80vh"}}>
                    <MUIDataTable style={{maxHeight:'100%'}}
                        data={adsPart2.data}
                        columns={columns2}
                        options={options}
                        />
                    </div>
                </Col>
            </Row>         
        </Container>
    )
}


export default WhoSeesWhat ;
