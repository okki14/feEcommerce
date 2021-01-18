import React,{useState} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {Link,NavLink} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {FaUserAstronaut,FaCartArrowDown} from 'react-icons/fa'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux'
import {LogOutfunc} from './../redux/Actions/AuthAction'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(-1),
  },
  title: {
    flexGrow: 1,
  },
  warna:{
    background: 'linear-gradient(45deg,#9e354e 30%,#421517 90%)'
  }
}));
const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 5,
    color:'white',
    fontSize:11,
    background: 'linear-gradient(45deg, #b5b7ab 30%, #606b78 90%)',
    
    padding: '0 0px',
  },
}))(Badge);

// function HideOnScroll(props) {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({ target: window ? window() : undefined });
//   console.log(trigger)
//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

function ButtonAppBar({username,isLogin,role,cart,LogOutfunc}) {
  const classes = useStyles();
  const [anchorEl,setopen]=useState(null)
  const [anchorElcart,setopencart]=useState(null)

  const Logoutclik=()=>{
    localStorage.removeItem('id')
    LogOutfunc()
  }
  
  return (
    <div className={classes.root}>

          <AppBar className={classes.warna}>
            <Toolbar>
                <NavLink to='/'  style={{textDecoration:'none',color:'white'}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <LocalHospitalIcon  />
                    </IconButton>
                </NavLink> 
              <Typography variant="h6" className={classes.title}>
                Toko Obat CARHO
              </Typography>
                {
                  role=='admin'?
                  <Link to='/admin' style={{textDecoration:'none',color:'white'}}>
                      <Button color="inherit">Admin</Button>
                  </Link>
                  :
                  role=='user'?
                  <Link to='/keranjang' style={{textDecoration:'none',color:'white'}}>
                    <Button  color="inherit">
                      <StyledBadge  color='secondary' >
                        <span style={{fontSize:20}}>
                          <FaCartArrowDown />
                        </span>
                      </StyledBadge>
                    </Button>            
                    
                  </Link>
                  :
                  null

                }
                {
                  isLogin?
                  <>
                      <Button color="inherit" onClick={(e)=>setopen(e.currentTarget)}><FaUserAstronaut/>&nbsp;{username}</Button>
                        <Menu
                        
                          anchorEl={anchorEl}               
                          open={Boolean(anchorEl)}
                          onClose={()=>setopen(null)}                
                        >
                          <MenuItem >Profile</MenuItem>
                            <MenuItem >My account</MenuItem>
                            <Link to='/' style={{textDecoration:'none',color:'red'}}>
                              <MenuItem onClick={Logoutclik} >Logout</MenuItem>  
                            </Link>
                        </Menu>
                  </>
                  :
                  <Link to='/login' style={{textDecoration:'none',color:'white'}}>
                    <Button color="inherit">Login</Button>
                  </Link>
                }
                {
                  isLogin?
                    null
                  :              
                  <Link to='/register' style={{textDecoration:'none',color:'white'}}>
                    <Button color="inherit">Register</Button>
                  </Link>
                
                }
                {/* <Link to='/login' style={{textDecoration:'none',color:'white'}}>
                  <Button color="inherit">Login</Button>
                </Link><Link to='/register' style={{textDecoration:'none',color:'white'}}>
                  <Button color="inherit">Register</Button>
                </Link> */}
            
        
            </Toolbar>
          </AppBar>
    </div>
  );
}

const MapstatetoProps=({Auth})=>{
  return {
    ...Auth
  }
}
export default connect(MapstatetoProps,{LogOutfunc})(ButtonAppBar);




















// import React from 'react'
// import { Nav, Navbar} from 'react-bootstrap'
// import {Link, NavLink} from 'react-router-dom'
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';


// const Header = (props) => {
//   return(
//     <div>
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//             <Link to="/" className='navbar-brand '>
//                 <LocalHospitalIcon  />
//                 Toko Engkong
//             </Link>
//             <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="mr-auto">
//                 </Nav>
//                 <Nav>
//                     <li className='nav-item'>
//                         <NavLink to='/admin' className= 'nav-link'>Admin</NavLink>
//                     </li>
//                     <li className='nav-item'>
//                         <NavLink to='/login' className= 'nav-link'>Login</NavLink>
//                     </li>          
//                 </Nav>
//             </Navbar.Collapse>
//     </Navbar>
//     </div>
//    )
//   }


// export default Header