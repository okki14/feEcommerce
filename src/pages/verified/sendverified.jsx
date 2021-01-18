// import React, { Component } from 'react';
// import {connect} from 'react-redux'
// import Axios from 'axios';
// import {API_URLbe} from './../../helpers/idrformat'



// class SendVerified extends Component {
//     state = { 
//         loading:false
//       }
    
//     onsendklik=()=>{
//         this.setState({loading:true})
//         console.log(this.props.Auth)
//         var obj={
//             username:this.props.Auth.username,
//             email:this.props.Auth.email,
//             userid:this.props.Auth.id
//         }
//         Axios.post(`${API_URLbe}/auth/sendverified`,obj)
//         .then((res)=>{
//             if(res.data){
//                 alert('berhasil kirim email ulang')
//                 this.setState({loading:false})
//             }
//         }).catch((err)=>{

//         })
        
//     }

//     render() { 
//         return (
//             <div className='paddingatas'>
//                 <center>
//                     <h1>
//                         apakah anda telah mendapatkan surat verified dari Judi Bola,
//                         kalau belum silahkan klik tombol dibawah ini
//                     </h1>
//                     {
//                         this.state.loading?
//                         <div>
//                             loading......
//                         </div>:
//                         <button onClick={this.onsendklik}>Klik ini</button>

//                     }
//                 </center>
//             </div>
//           );
//     }
// }

// const MapStatetoProps=(state)=>{
//     return{
//         Auth:state.Auth
//     }
// }


// export default connect(MapStatetoProps) (SendVerified);