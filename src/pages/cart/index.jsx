import React, { Component, createRef } from 'react';
import Header from '../../componen/header'
import {connect} from 'react-redux'
import Axios from 'axios'
import {API_URLbe, priceFormatter, credit} from '../../helpers/idrformat'
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
            this.setState({cart:res.data,idtrans:res.data[0].idtrans})
        }).catch((err)=>{
            console.log(err)
        })
    }

    //input file bukti transfer
    oninputfilechange=(e)=>{
        if(e.target.files[0]){
            this.setState({buktitrans:e.target.files[0]})
        }else{
            this.setState({buktitrans:null})
        }
      }

    //checkout
    onCheckOutClick=()=>{
        this.setState({isOpen:true})
    }

    //buat total harga
    renderTotalHarga=()=>{
        var total=this.state.cart.reduce((total,num)=>{
            return total+(num.harga*num.qty)
        },0)
        return total
    }

    //buat looping cart
    rendeCart=()=>{
        return this.state.cart.map((val,index)=>{
            return(
                <TableRow key={index}>
                <TableCell style={{color:'black', fontWeight:"bold" }}>{index+1}</TableCell>
                <TableCell style={{color:'black', fontWeight:"bold" }}>{val.namaprod}</TableCell>
                <TableCell style={{color:'black', fontWeight:"bold" }}>
                    <div style={{maxWidth:'200px'}}>
                        <img width='100%' height='100%' src={API_URLbe+val.banner} alt={val.namaproduct}/>
                    </div>
                </TableCell>
                <TableCell style={{color:'black', fontWeight:"bold" }}>{val.qty}</TableCell>
                <TableCell style={{color:'black', fontWeight:"bold" }}>{priceFormatter(val.harga)}</TableCell>
                <TableCell style={{color:'black', fontWeight:"bold" }}>{priceFormatter(val.harga*val.qty)}</TableCell>
                </TableRow>
            )
        })
    }

    //buat opsi metode pembayaran
    onBayarClick=()=>{
        const {pilihan} =this.state
        if(pilihan==='1'){
            this.onbayarpakebukti()
        }else if(pilihan==='2'){
            if(credit(parseInt(this.state.cc.current.value))){
                this.onbayarpakeCC()
            }else{
                alert('bukan cc')
            }
        }else{
            alert('pilih dulu tipe pembayarannya bro')
        }
    }

    //bayar dengan kartu kredit
    onbayarpakeCC=()=>{
        Axios.post(`${API_URLbe}/trans/bayarcc`,{
            idtrans:this.state.idtrans,
            nomercc:this.state.cc.current.value,
            datacart:this.state.cart
        },{
            headers:{
                'Authorization':`Bearer ${this.props.token}`
            }
        }).then((res)=>{
            if(res.data === 'berhasil'){
                this.props.AddcartAction([])
                this.setState({cart:[],isOpen:false})
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    //bayar dengan bukti transfer
    onbayarpakebukti=()=>{
        var formData=new FormData()
        var options={
            headers:{
              'Content-type':'multipart/form-data',
              'Authorization':`Bearer ${this.props.token}`
            },
            params:{
                userid:this.props.id
            }
        }
        formData.append('bukti',this.state.buktitrans)
        formData.append('data',JSON.stringify({idtrans:this.state.idtrans}))
        Axios.post(`${API_URLbe}/trans/bayarbukti`,formData,options)
        .then((res)=>{
            if(res.data === 'berhasil'){
                this.props.AddcartAction([])
                this.setState({cart:[],isOpen:false,buktitrans:null})
            }
        }).catch((err)=>{
            console.log(err)
        })
    }


    render() { 
        if(this.props.role==='user'){
            return ( 
                <div>
                    <Modal style={{marginTop:80}} isOpen={this.state.isOpen} toggle={()=>this.setState({isOpen:false})}>
                        <ModalHeader toggle={()=>this.setState({isOpen:false})}>Pembayaran</ModalHeader>
                        <ModalBody>
                            <select onChange={(e)=>this.setState({pilihan:e.target.value})} className='form-control' defaultValue={0} >
                                <option value="0" hidden>Select payment</option>
                                <option value="1">input bukti transfer</option>
                                <option value="2">Credit card</option>
                            </select>
                            {
                                this.state.pilihan==2?
                                <input className='form-control' ref={this.state.cc} placeholder='masukkan cc'/>
                                :
                                this.state.pilihan==1?
                                <CustomInput className='form-control' onChange={this.oninputfilechange} type='file'   label={this.state.buktitrans?this.state.buktitrans.name:'Select bukti'}/>
                                :
                                null
                            }
                            <div>
                              Total Harga  {priceFormatter(this.renderTotalHarga())}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={this.onBayarClick}>
                                Bayar
                            </button>
                        </ModalFooter>
                    </Modal>




















                    <Header />
                    <div className="px-5" style={{paddingTop:90}}>
                        <Paper >
                            <TableContainer >
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                        <TableCell style={{color:'black', fontWeight:"bold" }}>Id.</TableCell>
                                        <TableCell style={{color:'black', fontWeight:"bold" }}>Nama Product</TableCell>
                                        <TableCell style={{color:'black', fontWeight:"bold" }}>Gambar</TableCell>
                                        <TableCell style={{color:'black', fontWeight:"bold" }}>Qty</TableCell>
                                        <TableCell style={{color:'black', fontWeight:"bold" }}>Harga</TableCell>
                                        <TableCell style={{color:'black', fontWeight:"bold" }}>Total Belanja</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.rendeCart()}
                                    </TableBody>
                                    <TableFooter>
                                        <TableCell colSpan={4}></TableCell>
                                        <TableCell style={{fontWeight:"bolder",color:"black", fontSize:25}}>Total Belanja</TableCell>
                                        <TableCell style={{color:'black', fontWeight:"bolder" ,fontSize:20}}>{priceFormatter(this.renderTotalHarga())}</TableCell>
                                    </TableFooter>
                                </Table>
                                <button  style={{backgroundColor:"teal", color:"white"}} onClick={this.onCheckOutClick} className='my-3' >
                                    CheckOut
                                </button>
                            </TableContainer>
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