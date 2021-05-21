import axios from 'axios'
import React, { useState } from 'react'
import { Bell } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'
import '../Bootstrab/Acceil/sb-admin-2.css'
import esiImage from '../images/esi_white.png'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar'

export default function Budget(props) {

        const [date_reception, setdate_reception] = useState('');
        const [respo_dossier, setrespo_dossier] = useState('');
        const [observations, setobservations] = useState("");
        const [date_engag_cf, setdate_engag_cf] = useState("");
        const [motifs_rejet, setmotifs_rejet] = useState('');
        const [date_visa_rejet, setdate_visa_rejet] = useState('');
        const [date_mandatement, setdate_mandatement] = useState('');
        const [date_transm, setdate_transm] = useState('');
        const [duree_trait, setduree_trait] = useState('');
        //const id = "609a3694bcbe4715504c7fb2";
        const id  = props.match.params.id ;
        const history = useHistory() ;

        const hanlerClick = (e,type) => {
            e.preventDefault();
            console.log(
                date_reception,
                respo_dossier,
                observations,
                date_engag_cf,
                motifs_rejet,
                date_visa_rejet,
                date_mandatement,
                date_transm
            )
            axios.post(`http://localhost:4000/dossiers/budget/${id}`,{
                date_reception,
                respo_dossier,
                observations,
                date_engag_cf,
                motifs_rejet,
                date_visa_rejet,
                date_mandatement,
                date_transm,
                type 
            }).then(res => console.log(res.data));
            history.push('/');
        }

    return (
        <div className='budget'>

        <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Navbar />
                        <div class="container-fluid" style={{textAlign : 'center'}}>
                        <h3 style={{margin : '1rem'}}>
                            SERVICE BUDGET
                        </h3>
                        <div id='main'>
                            <form id='form'>
                            <div class='div'>
                            <div><label for="numdoss">N° de dossier</label></div>
                            <div><input type="text" id="numdoss" name="numdoss" disabled /></div>
                            </div>
                            <div class='div'>
                                <div><label for="daterec">date de réception</label></div> 
                                <div><input type="date" id="daterec" name="daterec" 
                                            value={date_reception} onChange={(e) => setdate_reception(e.target.value)}
                                />
                                </div></div>
                            <div class='div'>
                                
                                <div><label for="dateengag">date d'engagement au CF</label></div> 
                                <div><input type="date" id="dateengag" name="dateengag" 
                                            value={date_engag_cf} onChange={(e)=> setdate_engag_cf(e.target.value)}
                                /></div></div>
                                
                                <div class='div'>
                                <div><label for="datevisa">date de Visa</label></div> 
                                <div><input type="date" id="datevisa" name="datevisa" 
                                            value={date_visa_rejet} onChange={(e) =>setdate_visa_rejet(e.target.value)}
                                /></div></div>
                                
                                <div class='div'>
                                <div><label for="datemand">date de Mandatement</label></div> 
                                <div><input type="date" id="datemand" name="datemand" 
                                            value={date_mandatement} onChange={(e) => setdate_mandatement(e.target.value)}
                                /></div></div>
                                
                                <div class='div'>
                                <div><label for="datetrans">date de Transmission à l'agence Comptable</label></div> 
                                <div><input type="date" id="datetrans" name="datetrans" 
                                            value={date_transm} onChange={e => setdate_transm(e.target.value)}
                                /></div></div>
                            <div class='div'>
                            <div> <label for="respodos">responsable du dossier</label></div>
                            <div>  <input type="text" id="respodos" name="respodos" 
                                          value={respo_dossier} onChange={(e) => setrespo_dossier(e.target.value)}
                            /></div></div>
                            <div id='motifs' >
                                <div> <label for="mot">Motifs de rejet éventuel</label></div>
                            <div> <input type="text" id="mot" name="mot" 
                                         value={motifs_rejet} onChange={(e) => setmotifs_rejet(e.target.value)}
                            /></div></div>
                            
                            <div id='tear'>
                                <div> <label for="obs">observations</label></div>
                            <div> <textarea id="obs" name="obs" rows='3'
                                            value={observations} onChange={e => setobservations(e.target.value)}
                                > </textarea></div></div>
                                    
                            </form>
                            
                        </div>
                        <div id='bottuns'>
                            <input onClick={(e)=> {hanlerClick(e,0)}} type="submit"  value="Enregistrer" style={{backgroundColor : 'green'}}/>
                            <input type="submit" onClick={(e) => hanlerClick(e,2)}  value="Clôturer" style={{backgroundColor : 'red'}} />
                            <input type="submit" onClick={e => hanlerClick(e,1)} value="Transmettre"/>
                        </div>
                        </div>
                </div>
                
        </div>
        </div>
        </div>
    )
}
