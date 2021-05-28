import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Navbar from '../Components/Navbar'
import ScrollTopButton from '../Components/ScollTopButton'
import Sidebar from '../Components/Sidebar'
import { AddUser } from '../Redux/FunctionRedux/User';


function Notification() {

        // redux
        const user = useSelector(state => state.user);
        const history = useHistory();
        const dispatch = useDispatch();

        // check if user EXiste
        if (!user.existe) {
            axios.get("http://localhost:4000/checkUser",{withCredentials : true}).then(res => {
                console.log(res.data,'server');
               if (res.data.existe) {
                    dispatch(AddUser(res.data.user));
                }else {
                    history.push('/login');
                }
            })
        }

        // state notiication
        const [notification, setnotification] = useState([]);
        useEffect(()=> {
            if (user.existe) {
                if (user.user.notification) {
                    setnotification(user.user.notification);
                }
            }
        },[user])
    return (
        <div className='notification'>
            <ScrollTopButton/>
            <div id="wrapper">     
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar />  
                        <div className="container-fluid" style={{textAlign : 'center'}}>
                              <h3 style={{margin : '1rem'}}>
                                 Centre d'alertes
                             </h3>
                            <div id='main'>

                            {notification.length > 0 && notification.map(notif => {
                                if (notif.typeof === 'cancel') {
                                    return (
                                    <div className='notif'>
                                        <div className='circle icon-circle bg-danger'>
                                           <i style={{fontSize : '1.4rem'}} className="fas fa-file-alt text-white"></i>
                                        </div>
                                        <div className='text'>
                                            <p className='date'>{notif.date}</p><br/>
                                            <p className='remarque'>{notif.notif}</p>
                                        </div>
                                        <div className='cancel'>
                                            <button type="button" className='delete'>
                                                <img src="images\cancel.svg" alt="cancel" />
                                            </button>
                                        </div>
                                    </div>
                                )
                                }else {
                                    if (notif.typeof === 'complete') {
                                        return(
                                            <div className='notif'>
                                                <div className='circle icon-circle bg-success'  >
                                                     <i  style={{fontSize : '1.4rem'}} className="fas fa-file-alt text-white"></i>
                                                </div>
                                                <div className='text'>
                                                    <p className='date'>{notif.date}</p><br/>
                                                    <p className='remarque'>{notif.notif} </p>
                                                </div>
                                                <div className='cancel'>
                                                    <button type="button" className='delete'>
                                                        <img src="images\cancel.svg" alt="cancel" />
                                                    </button>
                                                </div>
                                            </div>

                                        )
                                    }
                                }
                               
                            })  }
                                

                        </div>
                     </div>
                </div>
           </div>
        </div>
    </div>
    )
}

export default Notification
