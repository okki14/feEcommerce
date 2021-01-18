import React, { Component, createRef } from 'react';
import Header from './../../componen/header';
import { Link, Redirect } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,Modal,ModalBody,ModalFooter} from 'reactstrap';
import Axios from 'axios'
import {connect} from 'react-redux'
import {AddcartAction} from './../../redux/Actions/AuthAction'
import { API_URLbe } from '../../helpers/idrformat';
import ButtonUi from '../../componen/button'
import Spin from 'react-reveal/Spin';
import './detailprod.css'

class DetailProduct extends Component {
    state = { 
        barang:{},
        isOpen:false,
        kelogin:false,
        loading:true,
        qty:createRef(),
     }

    //untuk ngeGet Product terlebih dahulu
    componentDidMount(){
        Axios.get(`${API_URLbe}/auth/getproduct/${this.props.match.params.id}`)
        .then((res)=>{
            this.setState({barang:res.data.dataprod, loading:false})
            console.log(this.state.barang);
        }).catch((err)=>{
            console.log(err);
        })
    }

    onAddToCart=()=>{
        if(this.props.role==='admin'){
            alert('Anda terdaftar sebagai Admin')
        }else if(this.props.role==='user'){
            if(this.state.qty.current.value){
                Axios.post(`${API_URLbe}/trans/cart`,{
                    userid:this.props.id,
                    productid:this.state.barang.id,
                    qty:this.state.qty.current.value
               
                }).then((res)=>{
                    this.props.AddcartAction(res.data)
                    alert('berhasil masuk cart')
                }).catch((err)=>{
                    console.log(err)
                    alert(err)
                })
            }else{
               alert("Belum ada isi Cart")
            }
        }else{
            this.setState({isOpen:true})
        }
    }

    //untuk perintah Login dulu, baru bellanja
    onRedirecttoLogin=()=>{
        this.setState({isOpen:false,kelogin:true})
    }

     
    render() { 
        const {barang,isOpen}=this.state

        if(this.state.kelogin){
            return <Redirect to='/login' />
        } 

        return ( 
            <div>
                <Modal isOpen={isOpen} toggle={()=>this.setState({isOpen:false})} style={{paddingTop:"3%"}}>
                    <ModalBody>
                       Lakukan Login terlebih dahulu
                    </ModalBody>
                    <ModalFooter>
                        <ButtonUi onClick={this.onRedirecttoLogin}>
                            Ok
                        </ButtonUi>
                    </ModalFooter>
                </Modal>
                <Header />
                <Breadcrumb className='tranparant mt-5 pt-3 px-2'>
                    <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem ><Link className='link-class' to="/products">Products</Link></BreadcrumbItem>
                    <BreadcrumbItem active >{this.state.barang.namaprod}</BreadcrumbItem>
                </Breadcrumb>
                    <Spin>
                    <div className= "app"  >
                        <div className="table">                    
                                <div  className="detail-img  ">
                                    <img src={API_URLbe + barang.banner}  height='10%' width='50%' alt={"foto"}/>
                                </div>
                                <div className="detailbarang " >
                                    <h1>Nama Obat : {barang.namaprod}</h1>
                                    <h1>Harga     : {barang.harga}</h1>
                                    <input type="number" className={'form-control mt-3'} placeholder='Quantity' style={{width:200}} ref={this.state.qty}/>
                                    <button className='mt-3'
                                            onClick={this.onAddToCart}
                                            style={{border:'black 1px solid',backgroundColor:"teal ", color:"white"}}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            
                        </div>

                    </div>
                    </Spin>
         
            </div>

         );
    }
}
 
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction}) (DetailProduct);