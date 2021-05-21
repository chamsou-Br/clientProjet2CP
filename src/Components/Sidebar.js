import React from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import esiImage from '../images/esi_white.png'
import $ from 'jquery';

export default function Sidebar() {
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
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-home"></i>
                        <span>Accueil</span></a>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Interface
                </div>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-building"></i>
                        <span>Structure</span>
                        
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <a className="collapse-item" href="">Administrateur</a>
                            <a className="collapse-item" href="">employés</a>
                        </div>
                    </div>
                </li>
                <div className="sidebar-heading">
                    Fonctionalités
                </div>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-clipboard-check"></i>
                        <span>Mise à jour</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">mise à jour disponible:</h6>
                            <a className="collapse-item" href="budget.html">Budjet</a>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-clipboard"></i>
                        <span>Statistiques</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-plus"></i>
                        <span>Ajouter un compte</span></a>
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
