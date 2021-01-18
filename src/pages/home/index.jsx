// import React from 'react'
// import Header from '../../componen/header'
// import Opung from './../../asset/opung.webp'
// import ButtonUi from '../../componen/button'
// import { Link } from "react-router-dom";


// const Home = (props) => {
//   return(
//     <div>
//         <Header />
//         <div style={{width:'100%', height:'90vh'}}>
//             <img src={Opung} style={{objectFit:'cover'}} width='100%' height='100%'/>
//         </div>
//         <div className='text-white d-flex align-items-center px-5' style={{height:'8vh',backgroundColor:'#afafaf',justifyContent:"space-between"}}>
//             <div>
//                 Check obat    
//             </div> 
//             <div>
//                 <Link to='/products'>
//                     <ButtonUi>
//                         Ok!
//                     </ButtonUi>
//                 </Link>
//             </div>
//         </div>
//     </div>
//    )
//   }


// export default Home

import React from 'react'
import Header from '../../componen/header'
import ButtonUi from '../../componen/button'
import { Link } from "react-router-dom";
import CardItem from './CardItems'
import './home.css'


const Home = (props) => {
  return( 
      <div>
            <Header />
            <div className="hero-container" >
                    <video src='/videos/video1.mp4' autoPlay loop muted />
                    <h1>Welcome to CARHO Shop</h1>
                    <p>What are you waiting for ?</p>
                    <div className="hero-btns">
                        <Link to='/products'>
                        <ButtonUi className='btns'>
                            See Products
                        </ButtonUi>
                        </Link>
                        
                        <ButtonUi className='btns'>
                            WATCH TRAILER 
                        </ButtonUi>                   
                    </div>
            </div>
            <div className='cards'>
      <h1>Check out these EPIC Drugs!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/comic.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/rinos.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/sanmol.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <CardItem
              src='images/tolak.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src='images/sanmol.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>







        </div>
 
   )
  }
  export default Home