import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg } from 'reactstrap';
import {Link} from 'react-router-dom'
import  Header  from '../../componen/header';
import './list.css'
import { API_URLbe, priceFormatter } from '../../helpers/idrformat';
import Axios from 'axios'


class Product extends Component {
    state = { 
        barang:[]
     }
     componentDidMount(){
        Axios.get(`${API_URLbe}/auth/getproduct`)
        .then((res)=>{
            console.log(res.data);
            this.setState({barang:res.data})
            // this.setState({barang:res.data}) 
        }).catch((err)=>{
            console.log(err)
        })
    }
     rederCart=()=>{
         return this.state.barang.map((val,index)=>{
             return(
                <div key={val.id} className="col-md-3" style={{paddingTop:7}}>
                    <Link to={'/products/'+val.id}>
                        <Card class="productimage">
                            <CardImg top width="100%" height={200}  src={API_URLbe +val.banner} />
                            <div style={{fontWeight:"bold"}}>
                                {val.namaprod}
                            </div>
                            <div style={{fontSize:17, fontWeight:"bold"}}>
                                {priceFormatter(val.harga)}
                            </div>
                        </Card>
                    </Link>                   
                </div>
             )
         })
     }

    render() { 
        return ( 
            <div className="px-4" style={{paddingTop:"5%"}}>
                <Header />
                <div>
                    <div className="row p-0 m-0">
                        {this.rederCart()}
                    </div>
                </div>
            </div>
         );
        }
}
    
    export default Product;
    {/* <Breadcrumb>
        <BreadcrumbItem ><Link to="/">Home</Link></BreadcrumbItem>
        <BreadcrumbItem active>Product</BreadcrumbItem>                       
    </Breadcrumb> */}