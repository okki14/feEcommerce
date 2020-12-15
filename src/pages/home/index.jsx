import React from 'react'
import Header from '../../componen/header'
import Opung from './../../asset/opung.webp'
import ButtonUi from '../../componen/button'
import { Link } from "react-router-dom";


const Home = (props) => {
  return(
    <div>
        <Header />
        <div style={{width:'100%', height:'90vh'}}>
            <img src={Opung} style={{objectFit:'cover'}} width='100%' height='100%'/>
        </div>
        <div className='text-white d-flex align-items-center px-5' style={{height:'8vh',backgroundColor:'#afafaf',justifyContent:"space-between"}}>
            <div>
                Check obat    
            </div> 
            <div>
                <Link to='/products'>
                    <ButtonUi>
                        Ok!
                    </ButtonUi>
                </Link>
            </div>
        </div>
    </div>
   )
  }


export default Home