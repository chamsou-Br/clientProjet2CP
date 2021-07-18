import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import $ from 'jquery'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import ScrollTopButton from '../Components/ScollTopButton';
import ModalDialog from '../Components/ModalDialog';
import { useDispatch, useSelector } from 'react-redux'
import { initDossier } from '../Redux/FunctionRedux/Dossies'
import { useHistory, withRouter } from 'react-router';
import { AddUser } from '../Redux/FunctionRedux/User';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function Acceil() {


    // redux 
    const Dossiers = useSelector(state => state.dossiers.Dossiers)
    const existDossier = useSelector(state => state.dossiers.existe)
    const user =  useSelector(state => state.user);
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
    }).catch(err =>{
        history.push('/login');
    })
    }

    // counteDidMount
    useEffect(()=> {
        axios.get('http://localhost:4000/dossiers/getdossier').then(res => {
            dispatch(initDossier(res.data));
        })
    },[]);
    const cond = true
    if (cond) {
    return (
        <>
          <div id="wrapper">
            <ScrollTopButton />
                <Sidebar user={user} />
               <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">

                  <Navbar />
                    <div className="container-fluid">
                        <div className="blog-card">
                            <div className="meta">
                            <div className="photo"  ></div>        
                            </div>
                        </div>
                        
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary" style={{color : '#0f3460'}}>Tout les dossiers</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr style={{color : '#0f3460'}} >
                                            <th>N° de dossier</th>
                                            <th>Type de marché</th>
                                            <th>Fournisseur</th>
                                            <th>Etat d'avancement</th>
                                            <th>date de début</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr style={{color : '#0f3460'}}>
                                            <th>N° de dossier</th>
                                            <th>Type de marché</th>
                                            <th>Fournisseur</th>
                                            <th>Etat d'avancement</th>
                                            <th>date de début</th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                    
                                    <tbody>
                                    {existDossier ? Dossiers.length > 0 && Dossiers.map(doc => {
                                        return(
                                        <tr key={doc._id} style={{fontSize : "0.8rem",color : "#0f3460"}} >
                                            <td>{doc.num_dossier}</td>
                                            <td>{doc.marche.type_prestation}</td>
                                            <td>{doc.marche.fournisseur}</td>
                                            <td>Pas Encore</td>
                                            <td  >{doc.marche.date_lancement}</td>
                                            {user.existe ? user.user.compte.includes('miseAjour') ? (
                                            <td style={{background : '#16213e',textAlign : 'center',borderRadius : '0.6rem'}} >
                                                    <div style={{textAlign : 'center'}}>
                                                    <Link style={{color : '#FFF' , fontWeight : 'bold' , textAlign : 'center'}} className="consulter" to={`/consultation/${doc._id}`} >consulter</Link>
                                                    
                                                    </div>
                                            </td>
                                            
                                            ) : null : null }
                                            
                                            
                                            {user.existe ? user.user.compte.includes('miseAjour') && user.user.service != 'adminstration' ? 
                                                
                                                user.user.service === 'ordonnateur'  ? (
                                                    <td style={{background : '#16213e',textAlign : 'center',borderRadius : '0.6rem'}}>
                                                    <div style={{color : '#FFF'}}  onClick={(e) => {
                                                        doc.marche.encore && !doc.marche.finish ? history.push(`/marche/edit/${doc._id}`) : 
                                                        doc.commande.encore && !doc.commande.finish ? history.push(`/commande/edit/${doc._id}`)  :
                                                        doc.budget.encore && !doc.budget.finish ? history.push(`/budget/edit/${doc._id}`) : 
                                                        doc.comptable.encore && !doc.comptable.finish ? 
                                                        history.push(`/compatable/edit/${doc._id}`) : console.log('')
                                                    }} > 
                                                    editer</div>
                                                    </td>
                                                    ) : user.user.service != 'compatable' ?
                                                      doc[user.user.service].encore && !doc[user.user.service].finish ?
                                                    (  <td style={{background : '#16213e',textAlign : 'center',borderRadius : '0.6rem'}}>
                                                    <Link className="consulter" style={{pointer  : "cursor",color : '#FFF'}} to={`/${user.user.service}/edit/${doc._id}`} >editer</Link>
                                                    </td>) : null :  doc.comptable.encore && !doc.comptable.finish ? ((  <td style={{background : '#16213e',textAlign : 'center',borderRadius : '0.6rem'}}>
                                                    <Link className="consulter" style={{pointer  : "cursor",color : '#FFF'}} to={`/compatable/edit/${doc._id}`} >editer</Link>
                                                    </td>)) : null 
                                                : null : null  }
                                           
   
                                        </tr>
                                        )
                                    }) : null }
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
      
       
    )}
    else {return (
        <Loading/>
    )}
}
