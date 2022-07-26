import React, {useEffect, useState, useCallback} from 'react'
import {Container,Row, Col, Spinner, Modal, ModalBody, ModalHeader} from 'reactstrap'
import MUIDataTable from "mui-datatables"
//apis call 
import {api} from '../../scripts/network'
import { useIntl } from 'react-intl';
import AdCard from '../Charts/AdCard';
import PieChart from '../Charts/PieChart';

const WhoSeesWhat = () => {
    const intl = useIntl();
    const [modalDemo1, setModalDemo1] = useState(false);
    const [modalDemo2, setModalDemo2] = useState(false);

    const colors = ["#b82c73" ,"#3cc5af","#253860","#0e849e","#d02d1e","#dbdff1", "#6e4f22", "#b1a820", "#0976fc", "#f6b9ab", "#bbea4b", "#b604e2", "#BB1D4B" , "#f79c53"  ]
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

    const [adsPerSocialIssuesPart1,setAdsPerSocialIssuesPart1] = useState({
        data : [],
        age:'18-24',
        gender:'male',
        candidate:'',
        loading:true,

    })
  
    const [adsPerSocialIssuesPart2,setAdsPerSocialIssuesPart2] = useState({
        data : [],
        age:'18-24',
        gender:'male',
        candidate:'',
        loading:true,

    })
  
  
    useEffect(() => {
        loadAdsPerSocialIssuesPart1('18-24','male')
        loadAdsPerSocialIssuesPart2('35-44','female')

    }, [])
  
    const toggleModal1 = (social_issue) => {
        adsPart1.age = adsPerSocialIssuesPart1.age
        adsPart1.gender = adsPerSocialIssuesPart1.gender
        adsPart1.social_issue = social_issue !== "Aucune catégorie" ? social_issue : "[]"
        console.log(adsPart1.social_issue)
        setModalDemo1(!modalDemo1);
        loadAdsPart1(adsPart1.age , adsPart1.gender, adsPart1.social_issue)
    }

    const toggleModal2 = (social_issue) => {
        adsPart2.age = adsPerSocialIssuesPart2.age
        adsPart2.gender = adsPerSocialIssuesPart2.gender
        adsPart2.social_issue =social_issue !== "Aucune catégorie" ? social_issue : "[]"
        setModalDemo2(!modalDemo2);
        loadAdsPart2(adsPart2.age , adsPart2.gender, adsPart2.social_issue)
    }


     const loadAdsPart1 = useCallback(async (age,gender,social_issue) => {
        setAdsPart1({
            data:[],
            loading:true,
            age:age,
            gender:gender,
            social_issue:social_issue
        })
        const data = await fetchAdsPart1(age,gender,social_issue)
      

        setAdsPart1({
            data:data,
            loading:false,
            age:age,
            gender:gender,
            social_issue:social_issue
        })

    })

    const loadAdsPart2 = useCallback(async (age, gender, social_issue) => {
        setAdsPart2({
            data:[],
            loading:true,
            age:age,
            gender:gender,
            social_issue:social_issue

        })
        const data = await fetchAdsPart2(age, gender, social_issue)
     

        setAdsPart2({
            data:data,
            loading:false,
            age:age,
            gender:gender,
            social_issue:social_issue
        })

    })

    const loadAdsPerSocialIssuesPart1 = useCallback(async (age,gender) => {
        setAdsPerSocialIssuesPart1({
            data:[],
            loading:true,
            age:age,
            gender:gender,

        })
        let labels = []
        let reach = []
        const data = await fetchAdsPerSocialIssuesPart1(age,gender)
        for(let d in data){
            labels.push(d)
            reach.push(data[d])


        }
        setAdsPerSocialIssuesPart1({
            data:reach,
            loading:false,
            age:age,
            gender:gender,
            labels : labels

        })

    })
    const loadAdsPerSocialIssuesPart2 = useCallback(async (age,gender) => {
        setAdsPerSocialIssuesPart2({
            data:[],
            loading:true,
            age:age,
            gender:gender,

        })
        const data = await fetchAdsPerSocialIssuesPart2(age,gender)
        let labels = []
        let reach = []
        for(let d in data){
            labels.push(d)
            reach.push(data[d])


        }

        setAdsPerSocialIssuesPart2({
            data:reach,
            loading:false,
            age:age,
            gender:gender,
            labels:labels
        })

    })

    // fetching data from the server

    const fetchAdsPart1 =  async (age, gender, social_issue) => {
        let stats 
        await api.get(`api/demographicDistribution/entitiesTargetingAgeGender/`+age+`/`+gender+`/`+social_issue)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

    const fetchAdsPart2 =  async (age, gender, social_issue) => {
        let stats 
        await api.get(`api/demographicDistribution/entitiesTargetingAgeGender/`+age+`/`+gender+`/`+social_issue)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }
    const fetchAdsPerSocialIssuesPart1 =  async (age,gender) => {
        let stats 
        await api.get(`api/demographicDistribution/entitiesTargetingAgeGenderBySocialIssues/`+age+`/`+gender)
         .then ( res => {
             stats = res
         })
         .catch(
             err => console.log(err)
         )
         return stats 
    }

    const fetchAdsPerSocialIssuesPart2 =  async (age,gender) => {
        let stats 
        await api.get(`api/demographicDistribution/entitiesTargetingAgeGenderBySocialIssues/`+age+`/`+gender)
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
                        <select value={adsPerSocialIssuesPart1.gender} onChange={(event) => loadAdsPerSocialIssuesPart1(adsPerSocialIssuesPart1.age,event.target.value)}>
                            <option value="female">{intl.formatMessage({ id: 'female' })} </option>
                            <option value="male">{intl.formatMessage({ id: 'male' })} </option>
                        </select>
                        <select  value={adsPerSocialIssuesPart1.age} onChange={(event) => loadAdsPerSocialIssuesPart1(event.target.value,adsPerSocialIssuesPart1.gender)}>
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
                    <div style={{height:"80vh", width:"100%"}}>
                     {
                        adsPerSocialIssuesPart1.loading ? 
                        <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                        :
                        <PieChart 
                        title = {intl.formatMessage({ id: 'whoseeswhatPlot1' })}
                        colors = {colors}
                        labels = {adsPerSocialIssuesPart1.labels}
                        dataset = {adsPerSocialIssuesPart1.data}
                        loadAds={toggleModal1}
                       />
                     }
                    </div>

                    <div>
                        <Modal style={{width:"80vw", height:"80%"}} isOpen={modalDemo1} toggle={toggleModal1}>
                            <ModalHeader
                                toggle={toggleModal1}></ModalHeader>
                            <ModalBody>
                                {
                                    adsPart1.loading ?  
                                    <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                                    <>
                                    <br/>
                                    <MUIDataTable style={{maxHeight:'100%'}}
                                        data={adsPart1.data}
                                        columns={columns1}
                                        options={options}
                                        />
                                </>  
                                }
                                </ModalBody>
                        </Modal>
                    </div>
                </Col>
                <Col xl="6" sm="12">
                    <div style={{display:"flex",justifyContent:"space-around"}}> 
                        <select value={adsPerSocialIssuesPart2.gender} onChange={(event) => loadAdsPerSocialIssuesPart2(adsPerSocialIssuesPart2.age,event.target.value)}>
                            <option value="female">{intl.formatMessage({ id: 'female' })} </option>
                            <option value="male">{intl.formatMessage({ id: 'male' })} </option>
                        </select>
                        <select  value={adsPerSocialIssuesPart2.age} onChange={(event) => loadAdsPerSocialIssuesPart2(event.target.value,adsPerSocialIssuesPart2.gender)}>
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
                    <div style={{height:"80vh", width:"100%"}}>
                     {
                        adsPerSocialIssuesPart2.loading ? 
                        <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div> 
                        :
                        <PieChart 
                        title = {intl.formatMessage({ id: 'whoseeswhatPlot1' })}
                        colors = {colors}
                        labels = {adsPerSocialIssuesPart2.labels}
                        dataset = {adsPerSocialIssuesPart2.data}
                        loadAds={toggleModal2}
                       />
                     }
                    </div>

                    <div>
                        <Modal style={{width:"80vw", height:"80%"}} isOpen={modalDemo2} toggle={toggleModal2}>
                            <ModalHeader
                                toggle={toggleModal2}>  </ModalHeader>
                            <ModalBody>
                                {
                                    adsPart2.loading ?  
                                    <div style={{display:'flex', justifyContent:"center",alignItems:'center',height: 'inherit'}}>  <Spinner>  </Spinner> </div>  :
                                    <>
                                    <br/>
                                    <MUIDataTable style={{maxHeight:'100%'}}
                                                            data={adsPart2.data}
                                                            columns={columns2}
                                                            options={options}
                                                            />
                                </>  
                                }
                                </ModalBody>
                        </Modal>
                    </div>
                </Col>
            </Row>         
        </Container>
    )
}


export default WhoSeesWhat ;
