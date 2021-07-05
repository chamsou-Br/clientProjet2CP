import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import '../Bootstrab/Acceil/sb-admin-2.css'
import Navbar from '../Components/Navbar'
import ScrollTopButton from '../Components/ScollTopButton';
import Sidebar from '../Components/Sidebar'
import esiImage from '../images/esi_white.png'
import profileImage  from '../images/undraw_profile.svg'
import { ModifyDossier } from '../Redux/FunctionRedux/Dossies'
import { AddUser } from '../Redux/FunctionRedux/User'

const dateCourant = new Date().getDate().toString() + '/' +   ( new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString();

export default function Commande(props) {

    const id  = props.match.params.id ;
    const history = useHistory();
    // redux
    const Docs = useSelector(state => state.dossiers.Dossiers);
    const Dossier = Docs.filter(doc =>{ return doc._id === id}).length > 0 ? Docs.filter(doc =>{ return doc._id === id})[0] : {commande : {}};
    if (Docs.filter(doc =>{ return doc._id === id}).length === 0) history.push('/')
    const dispatch = useDispatch();
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
            if (user.user.service != 'commande' && user.user.service != 'ordonnateur')  {
                history.push('/')
            }
            if (!user.user.compte.includes('miseAjour') && user.user.service != 'ordonnateur') {
                history.push('/')
            }
        }
    },[user])

    const [date_reception, setdate_reception] = useState(Dossier.commande.date_reception ? Dossier.commande.date_reception : '');
    const [respo_dossier, setrespo_dossier] = useState(Dossier.commande.respo_dossier ? Dossier.commande.respo_dossier : '');
    const [decision, setdecision] = useState(Dossier.commande.decision ? Dossier.commande.decision : '');
    const [observation, setobservation] = useState(Dossier.commande.observation  ? Dossier.commande.observation : '');
    const [num_fact_proforma, setnum_fact_proforma] = useState(Dossier.commande.num_fact_proforma ? Dossier.commande.num_fact_proforma : '');
    const [date_fact_proforma, setdate_fact_proforma] = useState(Dossier.commande.date_fact_proforma ? Dossier.commande.date_fact_proforma : '');
    const [montant, setmontant] = useState(Dossier.commande.montant ? Dossier.commande.montant : '');
    const [num_bon_commande, setnum_bon_commande] = useState(Dossier.commande.num_bon_commande ? Dossier.commande.num_bon_commande : '');
    const [date_bon_commande, setdate_bon_commande] = useState(Dossier.commande.date_bon_commande ? Dossier.commande.date_bon_commande : '');
    const [date_reception_prest, setdate_reception_prest] = useState(Dossier.commande.date_reception_prest ? Dossier.commande.date_reception_prest : '');
    const [num_fact_definitive, setnum_fact_definitive] = useState(Dossier.commande.num_fact_definitive ? Dossier.commande.num_fact_definitive : '');
    const [num_bon_reception, setnum_bon_reception] = useState(Dossier.commande.num_bon_reception ? Dossier.commande.num_bon_reception : '');
    const [num_dossier , setnum_dossier] = useState(Dossier.num_dossier)

    //const id = "609a3694bcbe4715504c7fb2"

    const handlerClick = (e,type) => {
        e.preventDefault();
        axios.post(`http://localhost:4000/dossiers/commande/${id}`,{
            date_reception,
            respo_dossier,
            decision,
            observation,
            num_fact_proforma,
            date_fact_proforma,
            montant,
            num_bon_commande,
            date_bon_commande,
            date_reception_prest,
            num_fact_definitive,
            num_bon_reception,
            date_envoi : type === 1 ? dateCourant  : "",
            type,
            id : user.user._id,
            idDossier : id
        }).then(res => dispatch(ModifyDossier(res.data)));
        axios.get('http://localhost:4000/indexe').then(res => {
            console.log(res.data);
        });
        history.push('/');
    }
    const [color , setcolor ] = useState('#1a1a2e');
    const [color1 , setcolor1 ] = useState('#1a1a2e');
    const [color2 , setcolor2 ] = useState('#1a1a2e');

    return (
        <div className='commande'>
        <ScrollTopButton />
            <div id="wrapper">
           <Sidebar />
               <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                  <Navbar />
                    <div className="container-fluid" style={{textAlign : 'center'}}>
                <h3 style={{margin : '1rem'}}>
                    SERVICE COMMANDES
                </h3>
                 <div id='main'>
                    <form id='form'>
                     <div className='div'>
                     <div><label htmlFor="numdoss">N° de dossier</label></div>
                     <div><input type="text" id="numdoss" name="numdoss" disabled value={num_dossier}/></div>
                      </div>
                     <div className='div'>
                        <div><label htmlFor="daterec">date de réception</label></div> 
                        <div><input
                            disabled
                             value={date_reception} onChange={(e) => setdate_reception(e.target.value)}
                             type="text" id="daterec" name="daterec" /></div></div>
                     <div className='div'>
                       <div> <label htmlFor="dec">décision</label></div>
                       <div> <input
                                value={decision} onChange={e=> setdecision(e.target.value)} 
                                type="text" id="dec" name="dec"/></div></div>
                     <div className='div'>
                       <div> <label htmlFor="numfact">N° facture proforma</label></div>
                        <div> <input 
                                value={num_fact_proforma} onChange={e=> setnum_fact_proforma(e.target.value)}
                                type="text" id="numfact" name="numfact"  /></div></div>
                     <div className='div'>
                        <div> <label htmlFor="montant">montant</label></div>
                        <div> <input 
                                value={montant} onChange={e=>setmontant(e.target.value)}
                                type="text" id="montant" name="montant" /></div></div>
                     <div className='div'>
                         <div><label htmlFor="datepro">date facture proforma</label></div>
                        <div><input 
                                value={date_fact_proforma} onChange={e=> setdate_fact_proforma(e.target.value)}
                                type="date" id="datepro" name="datepro" /></div></div>
                     <div className='div'>
                       <div> <label htmlFor="datebon">date du bon commande</label></div>
                       <div> <input 
                                value={date_bon_commande} onChange={e=>setdate_bon_commande(e.target.value)}
                                type="date" id="datebon" name="datebon" /></div></div>
                     <div className='div'>
                      <div>  <label htmlFor="datepre">date de réception de prestation</label></div>
                       <div> <input
                                value={date_reception_prest} onChange={(e)=> setdate_reception_prest(e.target.value)}
                                 type="date" id="datepre" name="datepre" /></div></div>
                         <div  className='div'>                
                       <div> <label htmlFor="numfactd">N° facture définitive</label></div>
                        <div> <input
                                    value={num_fact_definitive} onChange={e=>setnum_fact_definitive(e.target.value)} 
                                    type="text" id="numfactd" name="numfactd"  /></div></div>
                          <div className='div'>
                         <div> <label htmlFor="numbonr">N° du bon de réception</label></div>
                        <div> <input
                                    value={num_bon_reception} onChange={e=> setnum_bon_reception(e.target.value)} 
                                    type="text" id="numbonr" name="numbonr" /></div></div>
                       <div className='div'>   
                      <div> <label htmlFor="respodos">responsable du dossier</label></div>
                      <div>  <input 
                                    value={respo_dossier} onChange={(e) => setrespo_dossier(e.target.value)}
                                    type="text" id="respodos" name="respodos" /></div></div>
                       <div className='div'>
                        <div><label htmlFor="numbon">N° bon du commande</label></div>
                        <div> <input 
                                    value={num_bon_commande} onChange={e=> setnum_bon_commande(e.target.value)}
                                    type="text" id="numbon" name="numbon" /></div></div>
                       <div id='tear'>
                        <div> <label htmlFor="obs">observations</label></div>
                      <div> <textarea 
                                    value={observation} onChange={e=>setobservation(e.target.value)}
                                    id="obs" name="obs" rows='3'> </textarea></div></div>
                              
                    </form>
               
                 </div>
                 <div id='bottuns'>
                 <input onClick={(e) => handlerClick(e ,0)} type="submit" value="Enregistrer" onMouseEnter={()=>setcolor('#16213e')} onMouseLeave={()=>setcolor("#1a1a2e")}  style={{backgroundColor : `${color}` }}/>
                  <input type="submit" onClick={(e) => handlerClick(e ,2)} value="Annuler Le Dossier" onMouseEnter={()=>setcolor1('#16213e')} onMouseLeave={()=>setcolor1("#1a1a2e")}  style={{backgroundColor : `${color1}` }} />
                  <input type="submit" onClick={(e) => handlerClick(e ,1)} value="Transmettre" onMouseEnter={()=>setcolor2('#16213e')} onMouseLeave={()=>setcolor2("#1a1a2e")}  style={{backgroundColor : `${color2}` }}/>
                  </div>
                </div>
                    </div>
                    </div>
                    </div>
        </div>
    )
}
