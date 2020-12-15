import Axios from 'axios'
import { API_URLbe} from '../../helpers/idrformat'
import {ADDCART} from './../type'

export const LoginFunc=(user,cart)=>{
    return{
        type:'LOGIN',
        payload:user,
        cart:cart
    }
}


export const Clearfunc=()=>{
    return{
        type:'CLEAR'
    }
}

export const AddcartAction=(cart)=>{
    return{
        type:ADDCART,
        cart:cart
    }
}
export const LogOutfunc=()=>{
    return{
        type:'LOGOUT'
    }
}

// export const masukthunk=(username1,password1,passwordulang,email)=>{
//     return (dispatch)=>{
//         dispatch({type:'LOADING'})
//         if(password1===passwordulang){
//             Axios.post(`${API_URLbe}/auth/register`,{
//                 username:username1,
//                 password:password1,
//                 email
//             }).then((res)=>{
//                 localStorage.setItem('id',res.data.id)
//                 dispatch({type:'LOGIN',payload:res.data,cart:[]})
//             }).catch((err)=>{
//                 console.log(err);
//             })

//         }else{
//             dispatch({type:'Error',payload:'password tidak sama'})
//         }
        
//          }
// }
export const LoginThunk=(username,password)=>{
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.post(`${API_URLbe}/auth/login`,{
            username:username,
            password:password
        })
        .then((res)=>{
            console.log(res.data);
            localStorage.setItem('id',res.data.datauser.id)
            dispatch({type:'LOGIN',payload:res.data.datauser,cart:res.data.cart})//backend
        }).catch((err)=>{
            dispatch({type:'Error',payload:err.response.data.message})
        })
        
    }
}
