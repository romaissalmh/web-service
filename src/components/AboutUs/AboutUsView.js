import React, { useCallback} from 'react'
import { useIntl } from 'react-intl';
import {Row,Container, Col} from 'reactstrap'
import member3 from '../../assets/img/aboutUs_img3.jpg'
import member2 from '../../assets/img/aboutUs_img1.jpg'
import member1 from '../../assets/img/aboutUs_img2.jpg'
import {FaLinkedinIn,FaTwitter} from 'react-icons/fa';
import { VscMail } from "react-icons/vsc";
function AboutUsView({rtl}) {
    const intl = useIntl();


 
    return (
        <Container className="about">
            <Row>    
          <div className="about-section">
                <h1>{intl.formatMessage({ id: 'aboutUsTitle' })}</h1>
                <p style={{padding:"40px"}}>{intl.formatMessage({ id: 'description' })}</p>
         </div>
        
           
            <h2 style={{textAlign:"center"}}>{intl.formatMessage({ id: 'aboutUsSub' })}</h2>
                <Col xl="4" sm="12">
                            <div className="our-team">
                                <div className="pic">
                                    <img src={member1}/>
                                </div>
                                <h3 className="title">Oana GOGA</h3>
                                <span className="post">Chargée de Recherches CNRS</span>
                                <p>{intl.formatMessage({ id: 'teamMember1' })}</p>
                                <ul className="social">
                                     <li>
                                        <a target="_blank"  href="https://twitter.com/oanagoga" rel="noreferrer">
                                            <FaTwitter className="social-icon"/>          
                                        </a> 
                                    </li>
                                    <li> <a target="_blank"  href="oana.goga@cnrs.fr" rel="noreferrer">
                                            <VscMail className="social-icon"/>          
                                        </a>
                                    </li>
                                    <li><a target="_blank"  href="https://www.linkedin.com/in/oana-goga-0b4b09a/" rel="noreferrer">
                                            <FaLinkedinIn className="social-icon"/>          
                                        </a> 
                                    </li>
                                </ul>
                    </div>
                </Col>
       
                <Col xl="4" sm="12">
                            <div className="our-team">
                                <div className="pic">
                                    <img src={member2} />
                                </div>
                                <h3 className="title">Vera SOSNOVIK</h3>
                                <span className="post">{intl.formatMessage({ id: 'teamMember2Title' })}</span>
                                <p>{intl.formatMessage({ id: 'teamMember2' })}</p>
                                <ul className="social">
                                   <li>
                                        <a target="_blank"  href="https://twitter.com/" rel="noreferrer">
                                            <FaTwitter className="social-icon"/>          
                                        </a> 
                                    </li>
                                    <li> <a target="_blank"  href="sosnovikvera@gmail.com" rel="noreferrer">
                                            <VscMail className="social-icon"/>          
                                        </a>
                                    </li>
                                    <li><a target="_blank"  href="https://www.linkedin.com/in/vera-sosnovik-b46736117/" rel="noreferrer">
                                            <FaLinkedinIn className="social-icon"/>          
                                        </a> 
                                    </li>
                                </ul>


                            </div>
                </Col>
            
                <Col xl="4" sm="12">
                            <div className="our-team">
                                <div className="pic">
                                    <img src={member3}/>
                                </div>
                                <h3 className="title">Romaissa KESSI</h3>
                                <span className="post">{intl.formatMessage({ id: 'teamMember3Title' })}</span>
                                <p>{intl.formatMessage({ id: 'teamMember3' })}</p>
                                <ul className="social">

                                    <li>
                                        <a  target="_blank"  href="https://twitter.com/" rel="noreferrer">
                                            <FaTwitter className="social-icon"/>          
                                        </a> 
                                    </li>
                                    <li> <a target="_blank"  href="hr_kessi@esi.dz" rel="noreferrer">
                                            <VscMail className="social-icon"/>          
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank"  href="https://www.linkedin.com/in/kessiromaissa/" rel="noreferrer">
                                            <FaLinkedinIn className="social-icon"/>          
                                        </a> 
                                    </li>
                                </ul>
                            </div>
                </Col>

        

                
            </Row>  <br/>  
        </Container>
    )
}

export default AboutUsView

/*

                <Col xl="4" sm="12">
                    
                <div className="card">
                    <img src={member1} alt="Oana" style={{width:"100%"}}/>
                    <div className="cont">
                        <h2>Oana GOGA</h2>
                        <p className="title">Chargée de Recherches CNRS</p>
                        <p>{intl.formatMessage({ id: 'teamMember1' })}</p>
                        <p>oana.goga@cnrs.fr</p>
                    </div>
                    </div>
                 </Col>
                 <Col xl="4" sm="12">
      
                    <div className="card">
                    <img src={member2} alt="Vera" style={{width:"100%"}}/>
                    <div className="cont">
                        <h2>Vera SOSNOVIK</h2>
                        <p className="title">{intl.formatMessage({ id: 'teamMember2Title' })}</p>
                        <p>{intl.formatMessage({ id: 'teamMember2' })}</p>
                        <p>vera.sosnovik@univ.grenoble-alpes.fr</p>
                    </div>
                    </div>
                 </Col>
                 <Col xl="4" sm="12">

                    <div className="card">
                    <img src={member3} alt="Romaissa" style={{width:"100%"}}/>
                    <div className="cont">
                        <h2>Romaissa KESSI</h2>
                        <p className="title">{intl.formatMessage({ id: 'teamMember3Title' })}</p>
                        <p>{intl.formatMessage({ id: 'teamMember3' })}</p>
                        <p>hr_kessi@esi.dz</p>
                    </div>
                    </div>
                </Col>

*/