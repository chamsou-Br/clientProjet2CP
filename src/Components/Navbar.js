import React, { useEffect, useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import profileImage  from '../images/undraw_profile.svg';
import { Bell , ArrowUp} from "react-bootstrap-icons"
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux';
import { RemoveUser } from '../Redux/FunctionRedux/User';
import axios from 'axios';

export default function Navbar() {

    const userstate =  useSelector(state => state.user);
    const user = userstate.user;

    const history = useHistory();
    const dispatch = useDispatch();
    const Logout_Handler = (e) => {
        e.preventDefault();
        dispatch(RemoveUser());
        axios.get('http://localhost:4000/logout',{withCredentials : true})
        history.push({pathname : '/login' , state : {logout : true}})
        
    }
     // state notiication
        const [notification, setnotification] = useState([]);
        useEffect(()=> {
            if (userstate.existe) {
                if (userstate.user.notification) {
                    setnotification([user.notification[0],user.notification[1]]);
                }
            }
        },[user])

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <button id="sidebarToggleTop" onClick={()=> {
                            $("body").toggleClass("sidebar-toggled");
                            $(".sidebar").toggleClass("toggled")
                        }} className="btn btn-link d-md-none rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                        </button>                    

                        <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown no-arrow">
                                <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <Bell color='black' size={30} />
                                </Link>
                                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    centre d'alertes
                                </h6>
                                {notification.length > 0 && notification.map(notif => {
                                if (notif.typeof === 'cancel') {
                                    return (
                                        <Link className="dropdown-item d-flex align-items-center" to="/notification">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-danger">
                                                    <i className="fas fa-file-alt text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">{notif.date}</div>
                                                {notif.notif}
                                            </div>
                                        </Link>
                                    )
                                }
                                if (notif.typeof === 'complete') {
                                    return (
                                        <Link className="dropdown-item d-flex align-items-center" to="/notification">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-success">
                                                    <i className="fas fa-file-alt text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">{notif.date}</div>
                                                {notif.notif}
                                            </div>
                                        </Link>
                                    )
                                }
                                })
                                }
                                
                                <Link className="dropdown-item text-center small text-gray-500" to="/notification">afficher tout les alertes</Link>
                            </div>
                            </li>

                            <li className="nav-item dropdown no-arrow d-sm-none">
                                <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-search fa-fw"></i>
                                </Link>
                            </li>
                           
    
                            <div className="topbar-divider d-none d-sm-block"></div>

                            <li className="nav-item dropdown no-arrow">
                                <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {
                                        userstate.existe && (
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.username}</span>
                                        )
                                    }
                                    
                                    <img className="img-profile rounded-circle"
                                        src={profileImage} />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" to="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        paramètres
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link onClick={(e) => Logout_Handler(e)} className="dropdown-item" to="/login"  data-target="#logoutModal">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Déconnexion
                                    </Link>
                                </div>
                            </li>

                        </ul>

                    </nav>
    )
}
