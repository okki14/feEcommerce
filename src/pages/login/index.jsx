import React, { Component, createRef } from 'react';
import Pulse from 'react-reveal/Pulse';
import './login.css'
import {Typography, Box, Container, TextField,withStyles, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import { LoginThunk,Clearfunc} from './../../redux/Actions/AuthAction'
import {Redirect,Link} from 'react-router-dom'

const Styles={
  root:{
      'input': {
          '&::placeholder': {
         
            color: '#f50057'
          },
      },

      '& label.Mui-focused': {
          color: '#f50057',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#f50057',
        },
        '& .MuiOutlinedInput-root': {
  
          '& fieldset': {
            borderColor: '#f50057',
            color:'#f50057'
          },
          '&:hover fieldset': {
            borderColor: '#f50057',
            color:'#f50057'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#f50057',
            border:'3px solid ',
            color:'#f50057'
          },
        },
  }
}

class Login extends Component {
  state = { 
    username:createRef(),
    password:createRef()
   }


  OnLoginClick=()=>{
    const {username,password}=this.state
    var username1=username.current.value
    var password1=password.current.value
    this.props.LoginThunk(username1,password1)
}

  render() { 
    const { classes } = this.props;
    if(this.props.Auth.isLogin){
      return <Redirect to='/'/>
  }
    return (

      <Pulse>
        <Container maxWidth="sm"  >
          <Box bgcolor="whitesmoke"
              boxShadow="5"
              borderRadius="12px"
              textAlign="center"
              p="24px"
              mt="50px"
          >     
              <Link to='/'>
                <button className="backhome">
                    X
                </button>
              </Link>
            <br/>
           
            <Typography variant="h2" color="secondary">Login</Typography>
            <div  className='mt-5'>
              <TextField
                  inputProps={{ 
                      className:'text-#f50057 login-placeholder'
                  }} 
                  InputLabelProps={{
                      className:'text-#f50057'
                  }}
                  className={classes.root}  
                  inputRef={this.state.username} 
                  type="Username"  
                  label="Username" 
                  fullWidth='true' 
                  variant="outlined" 
                  size='small' 
              />
            </div>
            <div  className='mt-3'>
              <TextField 
                  inputProps={{ className:'text-#f50057'}} 
                  className={classes.root} 
                  inputRef={this.state.password} 
                  InputLabelProps={{
                      className:'text-#f50057'
                  }}
                  type="password"  
                  label="Password" 
                  fullWidth='true' 
                  variant="outlined" 
                  size='small' 
              />
            </div>
            <div className='mt-3 mb-2'>
            {
                this.props.Auth.error?
                <div className='alert alert-danger'>{this.props.Auth.error} <span onClick={this.props.Clearfunc} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>
                :
                null
            }
            </div>
            <div className='mt-3 align-self-end '>
                <Button disabled={this.props.Auth.isLoading} onClick={this.OnLoginClick} variant="contained" color="secondary" fullWidth>
                    Login
                </Button>
            </div>
            <div className='mt-3 align-self-end '>
                No Account ? 
                <Link  to='/register'>
                    Sign Up
                </Link> 
            </div>
          </Box>        
        </Container>
      </Pulse>
 
     );
  }
}
const Mapstatetoprops=(state)=>{
  return{
      Auth:state.Auth
  }
}

export default withStyles(Styles) (connect(Mapstatetoprops,{LoginThunk, Clearfunc})(Login));




























// import React, { Component, createRef } from 'react';
// import Foto from './../../asset/opung.webp'
// import './login.css'
// import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import {connect} from 'react-redux';
// import { LoginThunk,Clearfunc} from './../../redux/Actions/AuthAction'
// import {Redirect,Link} from 'react-router-dom'

// const Styles={
//   root:{
//       'input': {
//           '&::placeholder': {
         
//             color: 'blue'
//           },
//       },

//       '& label.Mui-focused': {
//           color: 'white',
//         },
//         '& .MuiInput-underline:after': {
//           borderBottomColor: 'yellow',
//         },
//         '& .MuiOutlinedInput-root': {
  
//           '& fieldset': {
//             borderColor: 'white',
//             color:'white'
//           },
//           '&:hover fieldset': {
//             borderColor: 'white',
//             color:'white'
//           },
//           '&.Mui-focused fieldset': {
//             borderColor: 'white',
//             border:'3px solid ',
//             color:'white'
//           },
//         },
//   }
// }

// class Login extends Component {
//   state = { 
//     username:createRef(),
//     password:createRef()
//    }


//   OnLoginClick=()=>{
//     const {username,password}=this.state
//     var username1=username.current.value
//     var password1=password.current.value
//     this.props.LoginThunk(username1,password1)
// }

//   render() { 
//     const { classes } = this.props;
//     if(this.props.Auth.isLogin){
//       return <Redirect to='/'/>
//   }
//     return ( 
//       <div className='row m-0 p-0 '>
//            <div className='col-md-6 m-0 p-0' style={{height:'100vh'}} >
//                 <img width='100%' height='100%' style={{objectFit:'cover'}} src={Foto} alt={'foto'}/>
//             </div>
//            <div className='col-md-6 m-0 p-0 d-flex justify-content-center align-items-center' style={{background:'linear-gradient(45deg, #2a88cc 20%, #abc4e2 100%)'}}>
//                 <div className='login-kotak d-flex px-4'>
//                   <h1 className='align-self-center'>Login</h1>
//                   <div className='mt-5'>
//                       <TextField 
//                           inputProps={{ 
//                               className:'text-white login-placeholder'
//                           }} 
//                           InputLabelProps={{
//                               className:'text-white'
//                           }} 
//                           className={classes.root} 
//                           inputRef={this.state.username} 
//                           label="Username" 
//                           fullWidth='true' 
//                           variant="outlined" 
//                           size='small' 
//                       />
//                   </div>
//                   <div className='mt-3'>
//                       <TextField 
//                           inputProps={{ className:'text-white'}} 
//                           className={classes.root} 
//                           inputRef={this.state.password} 
//                           InputLabelProps={{
//                               className:'text-white'
//                           }}
//                           type="password"  
//                           label="Password" 
//                           fullWidth='true' 
//                           variant="outlined" 
//                           size='small' 
//                       />
//                   </div>
//                   <div className='mt-3 mb-2'>
//                       {
//                           this.props.Auth.error?
//                           <div className='alert alert-danger'>{this.props.Auth.error} <span onClick={this.props.Clearfunc} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>
//                           :
//                           null
//                       }
//                   </div>
//                   <div className='mt-3 align-self-end '>
//                       <button disabled={this.props.Auth.isLoading} onClick={this.OnLoginClick} className='px-3 py-2 rounded text-white' style={{border:'white 1px solid',backgroundColor:'transparent'}}>
//                           Login
//                       </button>
//                   </div>
//                   <div >
//                       No Account ? 
//                       <Link  to='/register'>
//                           Sign Up
//                       </Link> 
//                   </div>
//                 </div>
//            </div>
        
//       </div>
//      );
//   }
// }
// const Mapstatetoprops=(state)=>{
//   return{
//       Auth:state.Auth
//   }
// }

// export default withStyles(Styles) (connect(Mapstatetoprops,{LoginThunk, Clearfunc})(Login));