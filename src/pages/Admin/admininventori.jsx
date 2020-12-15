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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {API_URLbe} from '../../helpers/idrformat'
import axios from 'axios'
import {connect} from 'react-redux'





const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function Inventori(props) {

  const [addform,setaddform]=useState({
  kimia_id:useRef(),
  stok:useRef(),
  satuan:useRef(),
  tgl:useRef(),
  komponen:useRef(),
  kimia_id:useRef(),
  totalstok:useRef()
})

const dateformat=(n)=>{
  var today = new Date(n);
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '-' + dd + '-' + yyyy;
  return today
}

const [inventori,setinventori]=useState([])
const [inventoristok,setinventoristok]=useState([])

useEffect(()=>{
  console.log('masuk')
  const fetch=()=>{
    axios.get(`${API_URLbe}/auth/getinventory`)
    .then((res)=>{
      setinventori(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    axios.get(`${API_URLbe}/auth/getinventorytot`)
    .then((res)=>{
      setinventoristok(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  fetch()
},[])

// useEffect(()=>{
//   console.log('masuk')
//   const fetch=()=>{
//     axios.get(`${API_URLbe}/auth/getinventorytot`)
//     .then((res)=>{
//       setinventoristok(res.data)
//     }).catch((err)=>{
//       console.log(err)
//     })
//   }
//   fetch()
// },[])

const OnAdddataClick=()=>{

  var kimia_id = addform.kimia_id.current.value
  var stok = addform.stok.current.value
  var satuan=addform.satuan.current.value
  var tgl=addform.tgl.current.value  
  var data={
    kimia_id,
    stok,
    satuan,
    tgl:new Date(tgl).getTime()
  }
  console.log(data);
  if(data.tgl<new Date().getTime()){
    console.log('Salah input tgl Min')
  }else{
    axios.post(`${API_URLbe}/auth/inventory`,data)
    .then((res)=>{
      alert('berhasil')
    }).catch((err)=>{
      console.log(err)
    })
  }
}

const renderTable=()=>{
  return inventori.map((val,index)=>{
    return(
      <TableRow key={val.id}>
          <TableCell>{index+1}</TableCell>
          <TableCell>{val.kimia_id}</TableCell>
          <TableCell>{val.stok}</TableCell>
          <TableCell>{dateformat(val.tgl)}</TableCell>
          <TableCell>{val.satuan}</TableCell>
      </TableRow>
    )
  })
}

const renderTableS=()=>{
  return inventoristok.map((val,index)=>{
    return(
      <TableRow key={val.id}>
          <TableCell>{val.kimia_id}</TableCell>
          <TableCell>{val.komponen}</TableCell>
          <TableCell>{val.totalstok}</TableCell>
          <TableCell>{dateformat(val.tgl)}</TableCell>
      </TableRow>
    )
  })
}

  const classes = useStyles();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="row">
      <div className="col-md-6">
        <Header/>
        <Modal style={{marginTop:80}} isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Tambah Data Inventory</ModalHeader>
            <ModalBody>
                <input type='number' ref={addform.kimia_id} placeholder='Masukkan Id' className='form-control mb-2'/>
                <input type='number' ref={addform.stok} placeholder='Masukan Stok' className='form-control mb-2'/>
                <input type='date' ref={addform.tgl} placeholder='Masukkan tanggal' className='form-control mb-2'/>
                <input type='text' ref={addform.satuan} placeholder='Masukkan Satuan Obat' className='form-control mb-2'/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={OnAdddataClick}>Add Inventory</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>

        <div className='px-5' style={{paddingTop:"90px"}}>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id.</TableCell>
                      <TableCell>Kimia_id</TableCell>
                      <TableCell>Stok</TableCell>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Satuan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderTable()}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div className="btn btn-outline-primary mt-3" onClick={toggle}>
              Input Inventori
            </div>         
        </div>
      </div>

      <div className="col-md-6">
        <div className='px-5' style={{paddingTop:"90px"}}>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Kimia_id</TableCell>
                      <TableCell>Komponen</TableCell>
                      <TableCell>Total Stok</TableCell>
                      <TableCell>Tanggal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderTableS()}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>       
        </div>
      </div>

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
export default connect(MapstatetoProps)(Inventori);