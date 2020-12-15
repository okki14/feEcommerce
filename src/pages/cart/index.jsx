import React, { Component, createRef } from 'react';
import Header from '../../componen/header'
import {connect} from 'react-redux'
import Axios from 'axios'
import {API_URLbe, priceFormatter} from '../../helpers/idrformat'
import NotFound from '../notfound';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import ButtonUi from '../../componen/button'
import {AddcartAction} from './../../redux/Actions'
import {Modal,ModalHeader,ModalBody,ModalFooter,CustomInput} from 'reactstrap'

class Cart extends Component {
    state = { 
        cart:[],
        isOpen:false,
        pilihan:0,
        bukti:createRef(),
        cc:createRef(),
        idtrans:0,
        buktitrans:null,
     }

    componentDidMount(){
        console.log(this.props.id)
        Axios.get(`${API_URLbe}/trans/getcart`,{
            params:{
                userid:this.props.id,
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({cart:res.data,idtrans:res.data[0].idtrans})
        }).catch((err)=>{
            console.log(err)
        })
    }

    onCheckOutClick=()=>{
        this.setState({isOpen:true})
    }

    renderTotalHarga=()=>{
        var total=this.state.cart.reduce((total,num)=>{
            return total+(num.harga*num.qty)
        },0)
        return total
    }

    rendeCart=()=>{
        return this.state.cart.map((val,index)=>{
            return(
                <TableRow key={val.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{val.namaprod}</TableCell>
                <TableCell>
                    <div style={{maxWidth:'200px'}}>
                        <img width='100%' height='100%' src={API_URLbe+val.banner} alt={val.namaproduct}/>
                    </div>
                </TableCell>
                <TableCell>{val.qty}</TableCell>
                <TableCell>{priceFormatter(val.harga)}</TableCell>
                <TableCell>{priceFormatter(val.harga*val.qty)}</TableCell>
                </TableRow>
            )
        })
    }


    render() { 
        if(this.props.role==='user'){
            return ( 
                <div>
                    <Header />
                    <div className="px-5" style={{paddingTop:90}}>
                        <Paper >
                            <TableContainer >
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>Id.</TableCell>
                                        <TableCell>Nama Product</TableCell>
                                        <TableCell>Gambar</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Harga</TableCell>
                                        <TableCell>Total Belanja</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.rendeCart()}
                                    </TableBody>
                                    <TableFooter>
                                        <TableCell colSpan={4}></TableCell>
                                        <TableCell style={{fontWeight:"bold", fontSize:25}}>Total Belanja</TableCell>
                                        <TableCell style={{color:'black',fontSize:20}}>{priceFormatter(this.renderTotalHarga())}</TableCell>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <ButtonUi onClick={this.onCheckOutClick}  className='my-3' >
                                CheckOut
                            </ButtonUi>
                        </Paper>
                    </div>
                </div>
                );
        }else{
            <NotFound />
        }
    }
}
 
const Mapstatetoprops=({Auth})=>{
    return{
        ...Auth
    }
  }
  
  export default  (connect(Mapstatetoprops,{AddcartAction})(Cart));