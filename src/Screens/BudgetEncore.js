import React, { useEffect } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import ScrollTopButton from '../Components/ScollTopButton';
import ModalDialog from '../Components/ModalDialog';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AddUser } from '../Redux/FunctionRedux/User';

function BudgetEncore() {

    // redux 
    const  Docs = useSelector(state => state.dossiers.Dossiers)
    const history = useHistory();
    const dispatch = useDispatch();
    const Dossiers = Docs.filter(doc => { 
        if (!doc.finish && !doc.block && doc.budget.encore && !doc.budget.finish) return doc
    });
    const user = useSelector(state => state.user)

   
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
    useEffect(()=> {
        if (user.existe) {
            if (user.user.service != 'budget' && user.user.service != 'ordonnateur')  {
                history.push('/')
            }
            if (!user.user.compte.includes('miseAjour') && user.user.service != 'ordonnateur') {
                history.push('/')
            }
        }
    },[user])


 return (
     <>
     <div id="wrapper">
       <ScrollTopButton />
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
                       <h1>Service marche</h1>
                       <p>Vous trouvez ici tous les Dossiers Encore modifié dans ce Service</p>
                       <p className="read-more">
                           <a href="#">plus d'info</a>
                       </p>
                       </div>
                   </div>
                   
                   <div className="card shadow mb-4">
                       <div className="card-header py-3">
                           <h6 className="m-0 font-weight-bold text-primary">Tout les dossiers Encore modifier</h6>
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
                               {Dossiers.length > 0 && Dossiers.map(doc => {
                                   return(
                                   <tr key={doc._id}>
                                       <td>{doc.num_dossier}</td>
                                       <td>{doc.marche.type_prestation}</td>
                                       <td>{doc.marche.fournisseur}</td>
                                       <td>Pas Encore</td>
                                       <td>{doc.marche.date_lancement}</td>
                                       <td>
                                               <Link className="consulter" to={`/budget/edit/${doc._id}`} >Editer</Link>
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

export default BudgetEncore
