import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import '../Bootstrab/Acceil/sb-admin-2.css'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { ModifyDossier } from '../Redux/FunctionRedux/Dossies'
import { AddUser } from '../Redux/FunctionRedux/User'
// "609a3694bcbe4715504c7fb2"
export default function Compatable(props) {

       const id  = props.match.params.id ;
       const history= useHistory();
       const dispatch = useDispatch();
        // redux
        const Docs = useSelector(state => state.dossiers.Dossiers)
        const Dossier = Docs.filter(doc =>{ return doc._id === id}).length > 0 ? Dossier = Docs.filter(doc =>{ return doc._id === id})[0] : {comptable : {}};
        if (Dossier = Docs.filter(doc =>{ return doc._id === id}).length === 0) history.push('/')
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
            if (user.user.service != 'compatable' && user.user.service != 'ordonnateur')  {
                history.push('/')
            }
        }
    },[user])


            const [date_reception, setdate_reception] = useState(Dossier.comptable.date_reception ? Dossier.comptable.date_reception : '' );
            const [respo_dossier, setrespo_dossier] = useState(Dossier.comptable.respo_dossier ? Dossier.comptable.respo_dossier : '');
            const [decision, setdecision] = useState(Dossier.comptable.decision ? Dossier.comptable.decision :'');
            const [piece_cmpleter, setpiece_cmpleter] = useState(Dossier.comptable.piece_cmpleter ? Dossier.comptable.piece_cmpleter : '');
            const [date_cmplement, setdate_cmplement] = useState(Dossier.comptable.date_cmplement ? Dossier.comptable.date_cmplement : '');
            const [date_paiement, setdate_paiement] = useState(Dossier.comptable.date_paiement ? Dossier.comptable.date_paiement : '');
            const [observations, setobservations] = useState(Dossier.comptable.observations ? Dossier.comptable.observations : '');
            const [duree_trait, setduree_trait] = useState(Dossier.comptable.duree_trait ? Dossier.comptable.duree_trait : '');
            const [num_dossier , setnum_dossier] = useState(Dossier.num_dossier)
            

            const hanlerClick = (e,type) => {
                e.preventDefault();
                console.log(
                    date_reception,
                    respo_dossier,
                    observations,
                    decision ,
                    piece_cmpleter,
                    date_cmplement,
                    date_paiement
                )
                axios.post(`http://localhost:4000/dossiers/comptable/${id}`,{
                    date_reception,
                    respo_dossier,
                    observations,
                    decision ,
                    piece_cmpleter,
                    date_cmplement,
                    date_paiement,
                    type 
                }).then(res => dispatch(ModifyDossier(res.data)));
                history.push('/');
            }

    return (
        <div className='compatable'>
        <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Navbar />
                <div className="container-fluid" style={{textAlign : 'center'}}>
                <h3 style={{margin : '1rem'}}>
                AGENCE COMPTABLE
                </h3>
                <div id='main'>
                    <form id='form'>
                    <div className='div'>
                    <div><label htmlFor="numdoss">N° de dossier</label></div>
                    <div><input type="text" id="numdoss" name="numdoss" disabled value={num_dossier} /></div>
                    </div>
                    <div className='div'>
                        <div><label htmlFor="daterec">date de réception</label></div> 
                        <div><input type="date" id="daterec" name="daterec" 
                                    value={date_reception} onChange={(e) => setdate_reception(e.target.value)}
                         /></div></div>
                    <div className='div'>
                    <div> <label htmlFor="dec">décision</label></div>
                    <div> <input type="text" id="dec" name="dec" 
                                 value={decision} onChange={(e) => setdecision(e.target.value)}
                    /></div></div>
                    <div className='div'>
                        
                        <div><label htmlFor="datecomp">date de complément du dossier</label></div> 
                        <div><input type="date" id="datecomp" name="datecomp" 
                                    value={date_cmplement} onChange={(e) => setdate_cmplement(e.target.value)}
                        /></div></div>
                        
                        <div className='div'>
                        <div><label htmlFor="datepai">date de Paiement</label></div> 
                        <div><input type="date" id="datepai" name="datepai" 
                                    value={date_paiement} onChange={(e) => setdate_paiement(e.target.value)}
                        /></div></div>
                        
                        
                        
                        <div className='div'>
                    <div> <label htmlFor="respodos">responsable du dossier</label></div>
                    <div>  <input type="text" id="respodos" name="respodos" 
                                  value={respo_dossier} onChange={(e)=> setrespo_dossier(e.target.value)}
                    /></div></div>
                    <div id='motifs' >
                        <div> <label htmlFor="pieces">Pieces à Completer</label></div>
                    <div> <input type="text" id="pieces" name="pieces" 
                                 value={piece_cmpleter} onChange={(e) => setpiece_cmpleter(e.target.value)}
                    /></div></div>
                    
                    <div id='tear'>
                        <div> <label htmlFor="obs">observations</label></div>
                    <div> <textarea id="obs" name="obs" rows='3'
                                    value={observations} onChange={(e) => setobservations(e.target.value)}
                                        > </textarea></div></div>
                            
                    </form>
                    
                </div>
                <div id='bottuns'>
                            <input onClick={(e)=> {hanlerClick(e,0)}} type="submit" value="Enregistrer" style={{backgroundColor : 'green'}}/>
                            <input type="submit" onClick={(e)=> {hanlerClick(e,2)}} value="Clôturer" style={{backgroundColor : 'red'}} />
                            <input type="submit" onClick={(e)=> {hanlerClick(e,1)}} value="Transmettre"/>
                </div>
                </div>
        </div>      
        </div>
        </div>
        </div>
    )
}
