import React, { useEffect, useState } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register/register'
import Admin from './pages/Admin/admin'
import AdminProd from './pages/Admin/adminprod'
import AdminInven from './pages/Admin/admininventori'
import Product from './pages/listprod'
import DetailProduct from './pages/detailprod'
import Cart from './pages/cart'
import {connect} from 'react-redux'
import { LoginThunk, LoginFunc} from './redux/Actions/AuthAction'
import Axios from 'axios'
import {API_URLbe} from './helpers/idrformat'
import Loading from './componen/loading'
import Verified from './pages/verified/verifiedakun';
import Sendverified from './pages/verified/sendverified';


function App(props) {
  const [loading,setloading]=useState(true)

  useEffect( ()=>{
    var id=localStorage.getItem('id')
    if(id){ 
      Axios.get(`${API_URLbe}/auth/keeplogin/${id}`)
      .then((res)=>{
        props.LoginFunc(res.data.datauser,res.data.cart)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setloading(false)
      })
    }else{
      setloading(false)
    }
  },[props])
  if(loading){
    return(
      <Loading/>
    )
  }

  return (
    <div>      
     
        <Switch>
          <Route exact path= '/' exact component={Home} />
          <Route exact path= '/login' component={Login} />
          <Route exact path= '/register' component={Register} />
          <Route exact path= '/verified' component={Verified} />
          <Route exact path= '/products' component={Product} />
          <Route  path= '/products/:id' component={DetailProduct}/>
          <Route path= '/keranjang' component={Cart} />
          <Route exact path='/admin' component={Admin}/>
          <Route exact path='/adminprod' component={AdminProd}/>
          <Route exact path='/admininvetori' component={AdminInven}/>
          <Route exact path= './sendverified' component={Sendverified} />
        </Switch>
    
    </div>
  );
}
const MapstatetoProps=({Auth})=>{
  return{
    username:Auth.username,
    isLogin:Auth.isLogin,
    role:Auth.role
   
  }
}
export default connect(MapstatetoProps,{LoginFunc}) (App);