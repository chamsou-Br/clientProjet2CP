import React, { useEffect, useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import esiImage from '../images/esi_white.png'
import $ from 'jquery';
import { Link, useHistory } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'


export default function Sidebar(props) {
   
    const userstate =  useSelector(state => state.user);
    const user = userstate.user;
 
   
    return (
        <ul className="navbar-nav bg-gradient sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon ">
                        <img src={esiImage} width="50" height="40" />
                    </div>
                    <div className="sidebar-brand-text mx-3">Suivi des marchés</div>
                </a>

                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-home"></i>
                        <span>Accueil</span></Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading" onClick={()=>console.log(user , 'side')}>
                    Interface
                </div>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-building"></i>
                        <span>Structure</span>
                        
                    </Link>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                           {userstate.existe && (
                                <Link className="collapse-item" to="">{user.service}</Link>
                            )}
                            
                            {userstate.existe && user.compte.length  > 0 ? user.compte.map(cmpt =>{ return (
                                <Link className="collapse-item" key={cmpt} to="">{cmpt}</Link>
                            )}) : null}

                        </div>
                    </div>
                </li>
                <div className="sidebar-heading">
                    Fonctionalités
                </div>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-clipboard-check"></i>
                        <span>Mise à jour</span>
                    </Link>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">mise à jour disponible:</h6>
                            {userstate.existe ?
                            user.service === 'ordonnateur'  ? (
                                <>
                                <Link className="collapse-item" to={`/marche/edit`} >marche</Link>
                                <Link className="collapse-item" to={`/commande/edit`} >commande</Link>
                                <Link className="collapse-item" to={`/budget/edit`} >budget</Link>
                                <Link className="collapse-item" to={`/compatable/edit`} >compatable</Link>
                                </>
                                ) :

                             user.service != 'adminstration' && user.compte.includes('miseAjour') && (
                                <Link className="collapse-item" to={`/${user.service}/edit`} >{user.service}</Link>
                            ) : null }
                            
                            
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="charts.html">
                        <i className="fas fa-fw fa-clipboard"></i>
                        <span>Statistiques</span></Link>
                </li>

                <li className="nav-item">
                    {userstate.existe ? user.service === 'adminstration'   ? (
                        <Link className="nav-link" to="/users">
                        <i className="fas fa-fw fa-user"></i>
                        <span>Comptes</span></Link>
                    ) : null : null}
  
                </li>

                <li className="nav-item">
                    {userstate.existe ? user.service === 'marche' || user.service === 'ordonnateur'  ? (
                        <Link className="nav-link" to="/nouveauDossier">
                        <i className="fas fa-fw fa-plus"></i>
                        <span>Ajouter un Dossier</span></Link>
                    ) : null : null}
  
                </li>

                <li className="nav-item">
                {userstate.existe ? user.service === 'adminstration' ? (
                       <Link className="nav-link" to="/registre">
                        <i className="fas fa-fw fa-plus"></i>
                        <span>Ajouter un compte</span></Link>
                    ) : null : null}

                </li>

                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline" onClick={()=> {
                        $("body").toggleClass("sidebar-toggled");
                        $(".sidebar").toggleClass("toggled")
                }}>
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
                </ul>
    )
}
