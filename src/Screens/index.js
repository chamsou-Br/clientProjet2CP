import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import esiImage from '../images/esi_white.png'
import profileImage  from '../images/undraw_profile.svg';
import { Bell , ArrowUp} from "react-bootstrap-icons"
import $ from 'jquery'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import ModalDialog from '../Components/ModalDialog';

export default function Acceil() {

    const [Dossiers, setDossiers] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:4000/dossiers/getdossier').then(res => {
            setDossiers(res.data);
            console.log(res.data);
        })
    },[])
   
    // scroll Top button display
    window.onscroll = function(){ 
        if (window.scrollY >= 10) {
            if (!document.querySelector('.scrollTop').classList.contains('active')) {
                document.querySelector('.scrollTop').classList.add('active');
            }
        }else {
            if (document.querySelector('.scrollTop').classList.contains('active')) {
                document.querySelector('.scrollTop').classList.remove('active');
            }
        }
     }

     // scroll top function
    const NavAnimation = ( e) => {
        e.preventDefault()  
            $("html, body").animate({
        
                scrollTop: 0
    
            },1000);
      }

    
    return (
        <>
          <div id="wrapper">
            <div className='scrollTop ' onClick={(e) => NavAnimation(e)}>
                <ArrowUp  className='icon  ' color='white' size={20} />
            </div>
                <Sidebar />
               <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                  <Navbar />
                    <div className="container-fluid">
                        <div className="blog-card">
                            <div className="meta">
                            <div className="photo"  ></div>        
                            </div>
                            <div className="description">
                            <h1>La plateforme</h1>
                            <h2>COMMENT FONCTIONNE-T-ELLE ?</h2>
                            <p> votre assistant virtuel d’achat vous guide pas à pas tout au long des procédures des marchés publics
                                et assure un contrôle automatique de la conformité à la législation sur les marchés publics. Vous évitez ainsi les erreurs.</p>
                            <p className="read-more">
                                <a href="#">plus d'info</a>
                            </p>
                            </div>
                        </div>
                        
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Tout les dossiers</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>N° de dossier</th>
                                            <th>Type de marché</th>
                                            <th>Fournisseur</th>
                                            <th>Etat d'avancement</th>
                                            <th>date de debut</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>N° de dossier</th>
                                            <th>Type de marché</th>
                                            <th>Office</th>
                                            <th>Etat d'avancement</th>
                                            <th>date de debut</th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                    
                                    <tbody>
                                    {Dossiers.length > 1 && Dossiers.map(doc => {
                                        return(
                                        <tr key={doc._id}>
                                            <td>{doc.num_dossier}</td>
                                            <td>{doc.marche.type_prestation}</td>
                                            <td>{doc.marche.fournisseur}</td>
                                            <td>Pas Encore</td>
                                            <td>{doc.marche.date_lancement}</td>
                                            <td>
                                                    <a className="consulter" href=".html">consulter</a>
                                            </td>
                                        </tr>
                                        )
                                    })}
                                       
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
            </div>
               <ModalDialog />
                </>
      
       
    )
}
