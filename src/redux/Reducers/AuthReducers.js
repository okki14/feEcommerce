import {ADDCART} from '../type'
const INITIAL_STATE={
    username:'',
    password:'',
    id:0,
    isLogin:false,
    error:'',
    isLoading:false,
    cart:[]
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':        
            return {...state,...action.payload,isLogin:true,isLoading:false,cart:action.cart}
        case 'Error':
            return{ ...state,error:action.payload,isLoading:false} 
        case 'LOADING':
            return{...state,isLoading:true} 
        case 'CLEAR':
            return{...state,error:''} 
        case ADDCART:
            return{...state,cart:action.cart}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}