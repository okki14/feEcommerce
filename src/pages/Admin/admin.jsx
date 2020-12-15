import React, { Component } from 'react';
import ButtonUi from '../../componen/button'
import { Link } from "react-router-dom";
import './admin.css'

class Admin extends Component {
    state = {  }
    render() { 
        return (

            <div className='admin '>
                <div > 
                <Link to='/admininvetori'>
                    <ButtonUi className="inven">
                        Go to Inventori
                    </ButtonUi>
                </Link>
                </div>
               
                <div >
                <Link to='/adminprod'>
                    <ButtonUi>
                        Go to Product
                    </ButtonUi>
                </Link>
                </div>
            </div>
          );
    }
}
 
export default Admin;