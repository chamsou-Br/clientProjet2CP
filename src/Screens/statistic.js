import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
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

const year = new Date().getUTCFullYear().toString();

export default function Static() {


    // redux 
    const Dossiers = useSelector(state => state.dossiers.Dossiers)
    const existDossier = useSelector(state => state.dossiers.existe)
    const [Doc , setDocs] = useState( Dossiers  );
    let newdocs = Dossiers
    const user =  useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    // state
    const [yearDoc , setYearDoc] = useState("")
    const [monthDoc , setMonthDoc] = useState("")
    const [fournisseurDoc , setFournisseurDoc] = useState("")
    const [typeDoc , setTypeDoc] = useState("")

    //searh function 
    const searchFunc = async (e) => {
            newdocs =  yearDoc ?
                Dossiers.filter(item=> item.num_dossier.split("/")[0].toString() === yearDoc.toString())
                : Dossiers
            newdocs = monthDoc ? 
                newdocs.filter(item => parseInt(item.marche.date_lancement.split('/')[1]) === parseInt(monthDoc.toString()))
                : newdocs
            newdocs = fournisseurDoc ?
                newdocs.filter(item=> item.marche.fournisseur.toString() === fournisseurDoc.toString() )
                : newdocs
            newdocs = typeDoc ?
                newdocs.filter(item=> item.marche.type_prestation.toString() === typeDoc.toString() )
                : newdocs
            setDocs(newdocs)
            
            
        }
    
    


    // check if user EXiste
    if (!user.existe) {
        axios.get("http://localhost:4000/checkUser",{withCredentials : true}).then(res => {
            console.log(res.data,'server');
        if (res.data.existe) {
            dispatch(AddUser(res.data.user));
        }else {
            history.push('/login');
        }
    }).catch(err => {
        history.push('/login');
    })
    }

    // counteDidMount
    useEffect(()=> {
        axios.get('http://localhost:4000/dossiers/getdossier').then(res => {
            dispatch(initDossier(res.data));
        })
    },[]);
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

                        <div className="static recherche">
                            <div className="itemRecherche">
                                <div><label htmlFor="type">année de docs</label></div>
                                <div>
                                <select name="type" id="type" required
                                    value={yearDoc} onChange={(e) => setYearDoc(e.target.value)}
                                >
                                        <option value="" defaultChecked>All</option>
                                        <option value={year} >{year}</option>
                                        <option value={(parseInt(year) - 1).toString()}>{(parseInt(year) - 1).toString()}</option>
                                        <option value={(parseInt(year) - 2).toString()}>{(parseInt(year) - 2).toString()}</option>
                                        <option value={(parseInt(year) - 3).toString()}>{(parseInt(year) - 3).toString()}</option>
                                        <option value={(parseInt(year) - 4).toString()}>{(parseInt(year) - 4).toString()}</option>
                                        <option value={(parseInt(year) - 5).toString()}>{(parseInt(year) - 5).toString()}</option>
                                        <option value={(parseInt(year) - 6).toString()}>{(parseInt(year) - 6).toString()}</option>
                                        <option value={(parseInt(year) - 7).toString()}>{(parseInt(year) - 7).toString()}</option>
                                        <option value={(parseInt(year) - 8).toString()}>{(parseInt(year) - 8).toString()}</option>
                                        <option value={(parseInt(year) - 9).toString()}>{(parseInt(year) - 9).toString()}</option>
                                        <option value={(parseInt(year) - 10).toString()}>{(parseInt(year) - 10).toString()}</option>
                                </select>
                                </div>
                            </div>

                            <div className="itemRecherche">
                                <div><label htmlFor="type">mois de docs</label></div>
                                <div>
                                <select name="type" id="type" required
                                        value={monthDoc} onChange={e=> setMonthDoc(e.target.value)} >
                                        <option value="" defaultChecked>All</option>
                                        <option value="01" >janvier</option>
                                        <option value="02">février</option>
                                        <option value="03">Mars</option>
                                        <option value="04">Avril</option>
                                        <option value="05">Mai</option>
                                        <option value="06">juin</option>
                                        <option value="07">juillet</option>
                                        <option value="08">Aout</option>
                                        <option value="09">Septembre</option>
                                        <option value="10">Octobre</option>
                                        <option value="11">Novembre</option>
                                        <option value="12">Decembre</option>
                                </select>
                                </div>
                            </div>

                            <div className="itemRecherche">
                                <div><label htmlFor="type">Type de presntation</label></div>
                                <div><select name="type" id="type" required
                                             value={typeDoc} onChange={e=>setTypeDoc(e.target.value)} >
                                     <option value="" defaultChecked>All</option>
                                    <option value="Marchés" defaultChecked>Marchés</option>
                                    <option value="Consultation">Consultation</option>
                                    <option value="Gré-à-Gré">Gré-à-Gré</option>
                                </select></div>
                            </div>

                            
                            <div className="itemRecherche">
                                <div><label htmlFor="type">Fournisseurs</label></div>
                                <div>
                                <select name="type" id="type" required
                                        value={fournisseurDoc} onChange={(e) => setFournisseurDoc(e.target.value)}>
                                    <option value="">All</option>
                                {existDossier ? Dossiers.length > 0 && Dossiers.map(doc => {
                                        return(
                                            <option key={doc._id} value={doc.marche.fournisseur} >{doc.marche.fournisseur}</option> 
                                        )
                                }) :  null}
                        
                                </select>
                                </div>
                            </div>

                            <div className="itemRecherche" onClick={(e)=>searchFunc(e)} >
                                <div style={{opacity : 0}} ><label htmlFor="type">Fournisseurs</label></div>
                                <div className="search">
                                   <i className="fas fa-fw fa-search"></i> <span>recherche</span> 
                                </div> 
                            </div>
                        </div>
                        
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary" onClick={()=>console.log(Doc)}>Tout les dossiers</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead >
                                        <tr style={{color  :"#1a1a2e"}} >
                                            <th>N° de dossier</th>
                                            <th>Type de marché</th>
                                            <th>Fournisseur</th>
                                            <th>Etat d'avancement</th>
                                            <th>date de debut</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr style={{color  :"#1a1a2e"}}>
                                            <th>N° de dossier</th>
                                            <th>Type de marché</th>
                                            <th>Fournisseur</th>
                                            <th>Etat d'avancement</th>
                                            <th>date de debut</th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                    
                                    <tbody>
                                    {existDossier ? Doc.length > 0 && Doc.map(doc => {
                                        return(
                                        <tr style={{color  :"#1a1a2e",fontSize : '0.8rem'}} key={doc._id}>
                                            <td>{doc.num_dossier}</td>
                                            <td>{doc.marche.type_prestation}</td>
                                            <td>{doc.marche.fournisseur}</td>
                                            <td>Pas Encore</td>
                                            <td>{doc.marche.date_lancement}</td>
                                            
                                                <td>
                                               
                                                    <div style={{display : 'flex'}}>

                                                    {user.existe ? user.user.compte.includes('consultation') ? (

                                                        <Link className="consulter" style={{color  :"#1a1a2e"}} to={`/consultation/${doc._id}`} >consulter</Link>

                                                    ) : null : null }

                                                    <span style={{marginLeft : 2,marginRight : 1}}>/</span>

                                                  
                                                    {user.existe ? user.user.compte.includes('miseAjour') && user.user.service != 'adminstration' ? 
                                                
                                                        user.user.service === 'ordonnateur'  ? (
                                                            <p  onClick={(e) => {
                                                                doc.marche.encore && !doc.marche.finish ? history.push(`/marche/edit/${doc._id}`) : 
                                                                doc.commande.encore && !doc.commande.finish ? history.push(`/commande/edit/${doc._id}`)  :
                                                                doc.budget.encore && !doc.budget.finish ? history.push(`/budget/edit/${doc._id}`) : 
                                                                doc.comptable.encore && !doc.comptable.finish ? 
                                                                history.push(`/compatable/edit/${doc._id}`) : console.log('')
                                                            }} > 
                                                            editer</p>): doc[user.user.service].encore && !doc[user.user.service].finish ?
                                                            (<Link className="consulter" style={{pointer  : "cursor"}} to={`/${user.user.service}/edit/${doc._id}`} >editer</Link>) : null
                                                        : null : null  }
                                                    
                                                    </div>
                                                </td>
                                        </tr>
                                        )}) : null }
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
