import React, {useState,useRef, useEffect} from 'react'
import Header from '../../componen/header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {BiPlusCircle} from 'react-icons/bi'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {API_URLbe, priceFormatter } from '../../helpers/idrformat'
import axios from 'axios'
import {connect} from 'react-redux'
import ButtonUi from './../../componen/button'





const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function AdminProduct(props) {

    const [banner,setbanner]=useState(null)
    const [product,setProduct]=useState([])  

    const [kimia, setkimia]=useState([])
    const [addresep,setresep]=useState([
      {
        dosis:'',
        kimiaid:'1'
      }
    ])

  const [addform,setaddform]=useState({
  namaprod:useRef(),
  banner:useRef(),
  harga:'',
  tanggal:useRef(),

  })
  
  




const onhargachange=(e)=>{
    if(e.target.value===''){
      setaddform({...addform,harga:0})
    }
    if(Number(e.target.value)){
        if(addform.harga === 0){
            setaddform({...addform,harga:e.target.value[1]})
        }else{
            setaddform({...addform,harga:e.target.value})    
        }
    }
  }



useEffect(()=>{
  console.log('masuk')
  const fetch=()=>{
    axios.get(`${API_URLbe}/auth/getproduct`)
    .then((res)=>{
      axios.get(`${API_URLbe}/auth/getkimia`)
      .then((res1)=>{
        setkimia(res1.data)
        setProduct(res.data)
      })
    }).catch((err)=>{
      console.log(err)
    })

  }
  fetch()
},[])






const oninputfilechange=(e)=>{
    console.log(e.target.files)
    if(e.target.files[0]){
        console.log(e.target.files[0])
        setbanner(e.target.files[0])
    }else{
        console.log('hapus')
        setbanner(null)
    }
  }

const OnAdddataClick=()=>{
    var formData=new FormData()
    var options={
        headers:{
          'Content-type':'multipart/form-data',
        }
    }
    var namaprod = addform.namaprod.current.value
    var harga=addform.harga
    var resep=addresep
    var data={
      namaprod:namaprod,
      harga,
      resep
    }
    console.log(data)
    formData.append('image',banner)
    formData.append('data',JSON.stringify(data))
      axios.post(`${API_URLbe}/auth/prod`,formData,options)
      .then((res)=>{
        console.log(res.data);
        alert('berhasil')
        setModal(!modal);
      }).catch((err)=>{
        console.log(err)
      })
    
}

const addresepClick=()=>{
  var oldarr=addresep
  oldarr=[...oldarr,{kimiaid:'1',dosis:''}]
  setresep([...oldarr])
}

const renderbahankimia=()=>{
  return addresep.map((val,index)=>{
    return(
      <>
      <select className="form-control" value={val.kimiaid} onChange={(e)=>onResepkimiaChange(e,index)}> {renderkimia()} </select>
      <input type='number' value={val.dosis} onChange={(e)=>onResepdosisChange(e,index)}  placeholder='Masukkan Nama dosis' className='form-control mb-2'/>
      </>
    )
  })
}

//manggil input
const onResepkimiaChange=(e,index)=>{
  var oldarr=addresep
  oldarr[index]={...oldarr[index],kimiaid:e.target.value}
  setresep([...oldarr])
}
const onResepdosisChange=(e,index)=>{
  var oldarr=addresep
  oldarr[index]={...oldarr[index],dosis:e.target.value}
  setresep([...oldarr])
}
const saveClick=()=>{
  console.log(addresep)
  setModal1(!modal1)
  setresep([{
    kimiaid:'',
    dosis:''
  }])
}
const renderkimia=()=>{
  return kimia.map((val, index)=>{
    return(
      <option value={val.id}>{val.komponen} </option>
    )
  })
}

const renderTable=()=>{
    return product.map((val,index)=>{
      return(
        <TableRow key={val.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{val.namaprod}</TableCell>
            <TableCell>
              <div style={{maxWidth:'200px'}}>
                <img width='100%' height='100%' src={API_URLbe+val.banner} alt={val.namaprod}/>
              </div>
            </TableCell>
            <TableCell>{priceFormatter(val.harga)}</TableCell>
            
       
        </TableRow>
      )
    })
  }

  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);


  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);


  return (
    <>
        <Header/>
       <Modal style={{marginTop:80}} isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle}>Tambahkan Product</ModalHeader>
              <ModalBody>
                 <input type='text' ref={addform.namaprod} placeholder='Masukkan Nama Obat' className='form-control mb-2'/>
                 <input type="file" className='form-control' onChange={oninputfilechange} />
                 {
                   banner?
                   <div className='my-2'>
                     <img src={URL.createObjectURL(banner)} height='200'
                     widht='200' alt="foto"/>

                   </div>
                   :
                   null
                 }
                 <input type='text' onChange={onhargachange} placeholder='Rp....' value={addform.harga} className='form-control mb-2'/>
                 
                 <ButtonUi onClick={toggle1} className='my-3' >
                      Resep
                  </ButtonUi>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={OnAdddataClick}>Add Product</Button>
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
          </Modal>

          <Modal style={{marginTop:80}} isOpen={modal1} toggle={toggle1} >              
              <ModalBody>
                 {renderbahankimia()}
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={addresepClick}>Add Resep</Button>
                  <Button color="primary" onClick={saveClick}>Save Resep</Button>
                  <Button color="secondary" onClick={toggle1}>Cancel</Button>
              </ModalFooter>
          </Modal>
      <div className='px-5 mt-5'>
            <ButtonUi onClick={toggle} className='my-3' >
                  Add Data Product
              </ButtonUi>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id.</TableCell>
                    <TableCell>Nama obat</TableCell>
                    <TableCell style={{width:'200px'}}>Gambar</TableCell>
                    <TableCell>Harga</TableCell>
                 
                  
                  </TableRow>
                </TableHead>

                <TableBody>
                  {renderTable()}
                </TableBody>

              </Table>
            </TableContainer>
          </Paper>
         
         
      </div>
    </>
  );
}

const MapstatetoProps=({Auth})=>{
  return{
  
    username:Auth.username,
    isLogin:Auth.isLogin,
    role:Auth.role
    
  }
}
export default connect(MapstatetoProps)(AdminProduct);