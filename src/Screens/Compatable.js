import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import '../Bootstrab/Acceil/sb-admin-2.css'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
// "609a3694bcbe4715504c7fb2"
export default function Compatable(props) {

            const [date_reception, setdate_reception] = useState("");
            const [respo_dossier, setrespo_dossier] = useState("");
            const [decision, setdecision] = useState('');
            const [piece_cmpleter, setpiece_cmpleter] = useState("");
            const [date_cmplement, setdate_cmplement] = useState("");
            const [date_paiement, setdate_paiement] = useState("");
            const [observations, setobservations] = useState("");
            const [duree_trait, setduree_trait] = useState("");
            const id  = props.match.params.id ;
            const history= useHistory();

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
                }).then(res => console.log(res.data));
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
                    <div><input type="text" id="numdoss" name="numdoss" disabled /></div>
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
