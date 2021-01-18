import React, { Component,createRef } from 'react';
import './register.css'
import Foto from './../../asset/opung.webp'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {Redirect,Link} from 'react-router-dom'
import {LoginFunc,LoginThunk,Clearfunc} from './../../redux/Actions/AuthAction'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { API_URLbe } from '../../helpers/idrformat';
import Rotate from 'react-reveal/Rotate';
const Styles={
    root:{
        'input': {
            '&::placeholder': {
           
              color: 'black'
            },
        },

        '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
          },
          '& .MuiOutlinedInput-root': {
    
            '& fieldset': {
              borderColor: '#9e354e',
              border:'2px solid ',
              color:'#9e354e'
            },
            '&:hover fieldset': {
              borderColor: '#9e354e',
              color:'#9e354e'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e354e',
              border:'3px solid ',
              color:'#9e354e'
            },
          },
    }
}
toast.configure()


class Register extends Component {
    
    state = {
        username:createRef(),
        password:createRef(),
        confirmpass:createRef(),
        email:createRef(),
        alert:''
    }

    OnRegisterClick=()=>{
        const {username,password,confirmpass,email}=this.state
        var username1=username.current.value
        var password1=password.current.value
        var conpass=confirmpass.current.value
        var email1=email.current.value
        if(this.chechpass(password1).status){
            if(password1 === conpass){
                Axios.post(`${API_URLbe}/auth/register`,{
                    username:username1,
                    password:password1,
                    email:email1
                })
                .then((res)=>{
                    console.log(res.data);
                    localStorage.setItem('id',res.data.id)
                    // localStorage.setItem('datauser',JSON.stringify(res.data) )
                    this.props.LoginFunc(res.data,[])
                }).catch((err)=>{
                    toast.error(err.response.data.message, {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }else{
                toast.success("Password Harus Sama", {
                    position:toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }else{
            toast.warning(this.chechpass(password1).message, {
                position:toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    chechpass=(pass='')=>{
        var pssw=pass.replace(' ','')
        if(pssw.length>=6){
            var angka=false
            var huruf=false
            for(let i=0;i<pssw.length;i++){
                if(isNaN(pssw[i])){
                    huruf=true
                }else{
                    angka=true
                }
            }
            if(huruf && angka){
                return {
                    status:true
                }
            }else{
                if(huruf){
                    return {
                        status:false,
                        message:'password harus ada angkanya'
                    }

                }else{
                    return {
                        status:false,
                        message:'password harus ada hurufnya'
                    }
                }
            }
        }else{
            return {
                status:false,
                message:'password harus 6 karakter atau lebih'
            }
        }
    }
    render() { 
        const { classes } = this.props;
        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        }
        return (
            <div className="d-flex justify-content-center align-items-center" style={{paddingTop:"13%"}}>            
                <Rotate >
                    <div className='register-kotak  px-4'>
                            <h1 className='d-flex justify-content-center align-self-center'>Register</h1>
                            <div className='mt-3'>
                                <TextField 
                                    inputProps={{ 
                                        className:'text-black login-placeholder'
                                    }} 
                                    InputLabelProps={{
                                        className:'text-black'
                                    }} 
                                    className={classes.root} 
                                    inputRef={this.state.username} 
                                    label="Username" 
                                    fullWidth='true' 
                                    variant="outlined" 
                                    size='small' 
                                />
                            </div>
                            <div className='mt-3'>
                                <TextField 
                                    inputProps={{ className:'text-black'}} 
                                    className={classes.root} 
                                    inputRef={this.state.password} 
                                    InputLabelProps={{
                                        className:'text-black'
                                    }}
                                    type="password"  
                                    label="Password" 
                                    fullWidth='true' 
                                    variant="outlined" 
                                    size='small' 
                                />
                            </div>
                            <div className='mt-3'>
                                <TextField 
                                    inputProps={{ className:'text-black'}} 
                                    className={classes.root} 
                                    inputRef={this.state.email} 
                                    InputLabelProps={{
                                        className:'text-black'
                                    }}
                                    type="email"  
                                    label="Email" 
                                    fullWidth='true' 
                                    variant="outlined" 
                                    size='small' 
                                />
                            </div>
                            <div className='mt-3'>
                                <TextField 
                                    inputProps={{ className:'text-black'}} 
                                    className={classes.root} 
                                    inputRef={this.state.confirmpass} 
                                    InputLabelProps={{
                                        className:'text-black'
                                    }}
                                    type="password"  
                                    label="Confrim Password" 
                                    fullWidth='true' 
                                    variant="outlined" 
                                    size='small' 
                                />
                            </div>
                            <div className=' align-self-end mt-3 '>
                                <button disabled={this.props.Auth.isLoading} onClick={this.OnRegisterClick} className='px-3 py-2 rounded text-black' style={{border:'black 1px solid',backgroundColor:"#9e354e ", color:"white"}}>
                                    Register
                                </button>
                            </div>
                            <div className=' mt-2 '>
                                have account ? 
                                <Link to='/login'>
                                    click here
                                </Link> 
                            </div>

                        
                    </div>
                </Rotate>
            </div>
        
            
        );
    }
}
const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default withStyles(Styles) (connect(Mapstatetoprops,{LoginFunc,LoginThunk,Clearfunc})(Register));






























// import React, { Component,createRef } from 'react';
// import './register.css'
// import Foto from './../../asset/opung.webp'
// import { withStyles } from '@material-ui/core/styles';

// import TextField from '@material-ui/core/TextField';

// import {connect} from 'react-redux';
// import {Redirect,Link} from 'react-router-dom'
// import {LoginFunc,LoginThunk,Clearfunc} from './../../redux/Actions/AuthAction'
// import {toast} from 'react-toastify'
// import Axios from 'axios';
// import { API_URLbe } from '../../helpers/idrformat';
// const Styles={
//     root:{
//         'input': {
//             '&::placeholder': {
           
//               color: 'blue'
//             },
//         },

//         '& label.Mui-focused': {
//             color: 'white',
//           },
//           '& .MuiInput-underline:after': {
//             borderBottomColor: 'yellow',
//           },
//           '& .MuiOutlinedInput-root': {
    
//             '& fieldset': {
//               borderColor: 'white',
//               color:'white'
//             },
//             '&:hover fieldset': {
//               borderColor: 'white',
//               color:'white'
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: 'white',
//               border:'3px solid ',
//               color:'white'
//             },
//           },
//     }
// }
// toast.configure()


// class Register extends Component {
    
//     state = {
//         username:createRef(),
//         password:createRef(),
//         confirmpass:createRef(),
//         email:createRef(),
//         alert:''
//     }

//     OnRegisterClick=()=>{
//         const {username,password,confirmpass,email}=this.state
//         var username1=username.current.value
//         var password1=password.current.value
//         var conpass=confirmpass.current.value
//         var email1=email.current.value
//         if(this.chechpass(password1).status){
//             if(password1 === conpass){
//                 Axios.post(`${API_URLbe}/auth/register`,{
//                     username:username1,
//                     password:password1,
//                     email:email1
//                 })
//                 .then((res)=>{
//                     localStorage.setItem('id',res.data.id)
//                     this.props.LoginFunc(res.data,[])
//                 }).catch((err)=>{
//                     toast.error(err.response.data.message, {
//                         position: "top-left",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         draggable: true,
//                         progress: undefined,
//                     });
//                 })
//             }else{
//                 alert("Password harus sama")
//             }
//         }else{
//             toast.error(this.chechpass(password1).message, {
//                 position:"bottom-left",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         }
//     }
//     chechpass=(pass='')=>{
//         var pssw=pass.replace(' ','')
//         if(pssw.length>=6){
//             var angka=false
//             var huruf=false
//             for(let i=0;i<pssw.length;i++){
//                 if(isNaN(pssw[i])){
//                     huruf=true
//                 }else{
//                     angka=true
//                 }
//             }
//             if(huruf && angka){
//                 return {
//                     status:true
//                 }
//             }else{
//                 if(huruf){
//                     return {
//                         status:false,
//                         message:'password harus ada angkanya'
//                     }

//                 }else{
//                     return {
//                         status:false,
//                         message:'password harus ada hurufnya'
//                     }
//                 }
//             }
//         }else{
//             return {
//                 status:false,
//                 message:'password harus 6 karakter atau lebih'
//             }
//         }
//     }
//     render() { 
//         const { classes } = this.props;
//         if(this.props.Auth.isLogin){
//             return <Redirect to='/'/>
//         }
//         return (
//             <div className='row m-0 p-0'>
            
//                 <div className='col-md-6 m-0 p-0 d-flex justify-content-center align-items-center' style={{background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
//                     <div className='register-kotak d-flex px-4'>
//                         <h1 className='align-self-center'>Register</h1>
//                         <div className='mt-3'>
//                             <TextField 
//                                 inputProps={{ 
//                                     className:'text-white login-placeholder'
//                                 }} 
//                                 InputLabelProps={{
//                                     className:'text-white'
//                                 }} 
//                                 className={classes.root} 
//                                 inputRef={this.state.username} 
//                                 label="Username" 
//                                 fullWidth='true' 
//                                 variant="outlined" 
//                                 size='small' 
//                             />
//                         </div>
//                         <div className='mt-3'>
//                             <TextField 
//                                 inputProps={{ className:'text-white'}} 
//                                 className={classes.root} 
//                                 inputRef={this.state.password} 
//                                 InputLabelProps={{
//                                     className:'text-white'
//                                 }}
//                                 type="password"  
//                                 label="Password" 
//                                 fullWidth='true' 
//                                 variant="outlined" 
//                                 size='small' 
//                             />
//                         </div>
//                         <div className='mt-3'>
//                             <TextField 
//                                 inputProps={{ className:'text-white'}} 
//                                 className={classes.root} 
//                                 inputRef={this.state.email} 
//                                 InputLabelProps={{
//                                     className:'text-white'
//                                 }}
//                                 type="email"  
//                                 label="Email" 
//                                 fullWidth='true' 
//                                 variant="outlined" 
//                                 size='small' 
//                             />
//                         </div>
//                         <div className='mt-3'>
//                             <TextField 
//                                 inputProps={{ className:'text-white'}} 
//                                 className={classes.root} 
//                                 inputRef={this.state.confirmpass} 
//                                 InputLabelProps={{
//                                     className:'text-white'
//                                 }}
//                                 type="password"  
//                                 label="Confrim Password" 
//                                 fullWidth='true' 
//                                 variant="outlined" 
//                                 size='small' 
//                             />
//                         </div>
//                         <div className=' align-self-end mt-3 '>
//                             <button disabled={this.props.Auth.isLoading} onClick={this.OnRegisterClick} className='px-3 py-2 rounded text-white' style={{border:'white 1px solid',backgroundColor:'transparent'}}>
//                                 Register
//                             </button>
//                         </div>
//                         <div>
//                             have account ? 
//                             <Link to='/login'>
//                                 click here
//                             </Link> 
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col-md-6 m-0 p-0' style={{height:'100vh'}} >
//                     <img width='100%' height='100%' style={{objectFit:'cover'}} src={Foto} alt={'foto'}/>
//                 </div>
//             </div>
//         );
//     }
// }
// const Mapstatetoprops=(state)=>{
//     return{
//         Auth:state.Auth
//     }
// }

// export default withStyles(Styles) (connect(Mapstatetoprops,{LoginFunc,LoginThunk,Clearfunc})(Register));