import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import '../Bootstrab/Acceil/sb-admin-2.css'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import esiImage from '../images/esi_white.png'
import profileImage  from '../images/undraw_profile.svg'

export default function Commande(props) {

    const [date_reception, setdate_reception] = useState('');
    const [respo_dossier, setrespo_dossier] = useState('');
    const [decision, setdecision] = useState('');
    const [observation, setobservation] = useState('');
    const [num_fact_proforma, setnum_fact_proforma] = useState('');
    const [date_fact_proforma, setdate_fact_proforma] = useState('');
    const [montant, setmontant] = useState('');
    const [num_bon_commande, setnum_bon_commande] = useState('');
    const [date_bon_commande, setdate_bon_commande] = useState("");
    const [date_reception_prest, setdate_reception_prest] = useState('');
    const [num_fact_definitive, setnum_fact_definitive] = useState('');
    const [num_bon_reception, setnum_bon_reception] = useState('');
    const [date_envoi, setdate_envoi] = useState('');
    const [duree_trait, setduree_trait] = useState("");
    //const id = "609a3694bcbe4715504c7fb2"
    const id  = props.match.params.id ;
    const history = useHistory();

    const handlerClick = (e,type) => {
        e.preventDefault();
        console.log({
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
            num_bon_reception
        })
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
            type
        }).then(res => console.log(res.data));
        axios.get('http://localhost:4000/indexe').then(res => {
            console.log(res.data);
        });
        history.push('/');
    }

    return (
        <div className='commande'>
            <div id="wrapper">
           <Sidebar />
               <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                  <Navbar />
                    <div class="container-fluid" style={{textAlign : 'center'}}>
                <h3 style={{margin : '1rem'}}>
                    SERVICE COMMANDES
                </h3>
                 <div id='main'>
                    <form id='form'>
                     <div class='div'>
                     <div><label htmlFor="numdoss">N° de dossier</label></div>
                     <div><input type="text" id="numdoss" name="numdoss" disabled/></div>
                      </div>
                     <div class='div'>
                        <div><label htmlFor="daterec">date de réception</label></div> 
                        <div><input
                             value={date_reception} onChange={(e) => setdate_reception(e.target.value)}
                             type="date" id="daterec" name="daterec" /></div></div>
                     <div class='div'>
                       <div> <label htmlFor="dec">décision</label></div>
                       <div> <input
                                value={decision} onChange={e=> setdecision(e.target.value)} 
                                type="text" id="dec" name="dec"/></div></div>
                     <div class='div'>
                       <div> <label htmlFor="numfact">N° facture proforma</label></div>
                        <div> <input 
                                value={num_fact_proforma} onChange={e=> setnum_fact_proforma(e.target.value)}
                                type="text" id="numfact" name="numfact"  /></div></div>
                     <div class='div'>
                        <div> <label htmlFor="montant">montant</label></div>
                        <div> <input 
                                value={montant} onChange={e=>setmontant(e.target.value)}
                                type="text" id="montant" name="montant" /></div></div>
                     <div class='div'>
                         <div><label htmlFor="datepro">date facture proforma</label></div>
                        <div><input 
                                value={date_fact_proforma} onChange={e=> setdate_fact_proforma(e.target.value)}
                                type="date" id="datepro" name="datepro" /></div></div>
                     <div class='div'>
                       <div> <label htmlFor="datebon">date du bon commande</label></div>
                       <div> <input 
                                value={date_bon_commande} onChange={e=>setdate_bon_commande(e.target.value)}
                                type="date" id="datebon" name="datebon" /></div></div>
                     <div class='div'>
                      <div>  <label htmlFor="datepre">date de réception de prestation</label></div>
                       <div> <input
                                value={date_reception_prest} onChange={(e)=> setdate_reception_prest(e.target.value)}
                                 type="date" id="datepre" name="datepre" /></div></div>
                         <div  class='div'>                
                       <div> <label htmlFor="numfactd">N° facture définitive</label></div>
                        <div> <input
                                    value={num_fact_definitive} onChange={e=>setnum_fact_definitive(e.target.value)} 
                                    type="text" id="numfactd" name="numfactd"  /></div></div>
                          <div class='div'>
                         <div> <label htmlFor="numbonr">N° du bon de réception</label></div>
                        <div> <input
                                    value={num_bon_reception} onChange={e=> setnum_bon_reception(e.target.value)} 
                                    type="text" id="numbonr" name="numbonr" /></div></div>
                       <div class='div'>   
                      <div> <label htmlFor="respodos">responsable du dossier</label></div>
                      <div>  <input 
                                    value={respo_dossier} onChange={(e) => setrespo_dossier(e.target.value)}
                                    type="text" id="respodos" name="respodos" /></div></div>
                       <div class='div'>
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
                 <input onClick={(e) => handlerClick(e ,0)} type="submit" value="Enregistrer" style={{backgroundColor : 'green'}}/>
                  <input type="submit" onClick={(e) => handlerClick(e ,2)} value="Clôturer" style={{backgroundColor : 'red'}} />
                  <input type="submit" onClick={(e) => handlerClick(e ,1)} value="Transmettre"/>
                  </div>
                </div>
                    </div>
                    </div>
                    </div>
        </div>
    )
}
