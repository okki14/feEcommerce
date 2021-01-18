import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import querystring from 'query-string'
import {verifiedaction} from '../../redux/Actions'
import {API_URLbe} from '../../helpers/idrformat'

class Verified extends Component {
    state = {
        success:0
    }

    componentDidMount(){
      let obj=querystring.parse(this.props.location.search)//outputnya berupa id
      console.log(obj)
      console.log('sdadwadsda');
      Axios.get(`${API_URLbe}/auth/verified`,{
            headers:{
                'Authorization':`Bearer ${obj.token}`
            }
        })
        .then((res)=>{
            console.log(res.data);        
            localStorage.setItem('id',res.data.id)
            // localStorage.setItem('datauser',JSON.stringify(res.data) )
            this.props.verifiedaction(res.data)
            this.setState({success:1})
        }).catch((err)=>{
            console.log(err);
            this.setState({success:2})

        })
        
    }

    render() {
        console.log(this.props.Auth)
        if(this.state.success===1){
            return(
            <div>
                <center>
                    <h1>
                       Berhasil verified
                    </h1>
                </center>
            </div>
            )
        }else if(this.state.success===2){
            return(
            <div>
                <center>
                    <h1>
                       gagal verified
                    </h1>
                </center>
            </div>
            )
        }
        return (
            <div>
                <center>
                    <h1>
                        sedang menunggu verified
                    </h1>
                </center>
            </div>
          );
    }
}


const MapStatetoProps=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default connect(MapStatetoProps,{verifiedaction}) (Verified);