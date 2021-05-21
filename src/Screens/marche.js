import axios from 'axios'
import React, { useState  } from 'react'
import { useHistory } from 'react-router'
import '../Bootstrab/Acceil/sb-admin-2.css'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import esiImage from '../images/esi_white.png'
import profileImage  from '../images/undraw_profile.svg'

//const id = "609a3694bcbe4715504c7fb2";

const Marche = (props) => {

    const [type_prestation, settype_prestation] = useState('Marchés');
    const [objet, setobjet] = useState('');
    const [date_lancement, setdate_lancement] = useState("");
    const [data_ouverture, setdata_ouverture] = useState("");
    const [observation, setobservation] = useState("");
    const [fournisseur, setfournisseur] = useState('');
    const [data_transm, setdata_transm] = useState('');
    const [decision, setdecision] = useState('');
    const [num_convention, setnum_convention] = useState('');
    const [respo_dossier, setrespo_dossier] = useState('');
    const [duree_trait, setduree_trait] = useState('');
    const id  = props.match.params.id ;
    const history = useHistory()


    const handlerClick = (e,type) => {
        e.preventDefault();
        console.log({
            type_prestation ,
            objet,
            date_lancement,
            data_ouverture,
            observation,
            fournisseur,
            data_transm,
            decision,
            num_convention,
            respo_dossier,
            type
        })
        axios.post(`http://localhost:4000/dossiers/marche/${id}`,{
            type_prestation ,
            objet,
            date_lancement,
            data_ouverture,
            observation,
            fournisseur,
            data_transm,
            decision,
            num_convention,
            respo_dossier,
            type
        }).then(res => console.log(res.data));
        axios.get('http://localhost:4000/indexe').then(res => {
            console.log(res.data);
        })
        history.push('/');
    }

    return(
        <div className='marche'>
        <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
            <Navbar />
                <div className="container-fluid" style={{textAlign : 'center'}}>
                <h3 style={{margin : '1rem'}}>
                    Service Marchés
                </h3>
                 <div id='main'>
                    <form >
                    <div id='form'>
                     <div className='div'>
                     <div><label htmlFor="numdoss">N° de dossier</label></div>
                     <div><input type="text" id="numdoss" name="numdoss" disabled/></div>
                      </div>
                     <div className='div'>
                     <div><label htmlFor="type">Type de prestation</label></div>
                     <div>
                      <select name="type" id="type"  onChange={(e) => settype_prestation(e.target.value)}>
                        <option value="volvo">Marchés</option>
                        <option value="saab">Consultation</option>
                        <option value="opel">Gré-à-Gré</option>
                     </select>
                     </div>
                      </div>
                     <div className='div'>
                     <div><label htmlFor="objet">Objet</label></div>
                     <div><input type="text" id="objet" name="objet" 
                                 value={objet} onChange={(e) => setobjet(e.target.value)}
                     /></div>
                      </div>
                     <div className='div'>
                        <div><label htmlFor="datelanc">date de Lancement</label></div> 
                        <div><input type="date" id="datelanc" name="datelanc" 
                                    value={date_lancement} onChange={(e) => setdate_lancement(e.target.value)}
                        /></div></div>
                     <div className='div'>
                        <div><label htmlFor="dateover">date de D'ouverture</label></div> 
                        <div><input type="date" id="dateover" name="dateover" 
                                    value={data_ouverture} onChange={(e) => setdata_ouverture(e.target.value)}
                        /></div></div>
                      <div className='div'>
                       <div> <label htmlFor="fourn">Fournisseur</label></div>
                       <div> <input type="text" id="fourn" name="fourn" 
                                    value={fournisseur} onChange={(e) => setfournisseur(e.target.value)}
                       /></div></div>
                     <div className='div'>
                     
                       <div> <label htmlFor="dec">décision</label></div>
                       <div> <input type="text" id="dec" name="dec"
                                    value={decision} onChange={(e) => setdecision(e.target.value)}
                       /></div></div>
                     <div className='div'>
                        
                        <div><label htmlFor="datetrans">date de Transmission au service commande</label></div> 
                        <div><input type="date" id="datetrans" name="datetrans"
                                    value={data_transm} onChange={e => setdata_transm(e.target.value)}
                        /></div></div>
                     <div className='div'>
                       <div> <label htmlFor="numcon">N° Convention</label></div>
                        <div> <input type="text" id="numcon" name="numcon"  
                                        value={num_convention} onChange={(e) => setnum_convention(e.target.value)}
                        /></div></div>
                     
                         <div className='div'> 
                      <div> <label htmlFor="respodos">responsable du dossier</label></div>
                      <div>  <input type="text" id="respodos" name="respodos" 
                                    value={respo_dossier} onChange={(e) => setrespo_dossier(e.target.value)}
                       /></div></div>
                      
                       <div id='tear'>
                        <div> <label htmlFor="obs">observations</label></div>
                      <div> <textarea id="obs" name="obs" rows='3'
                                value={observation} onChange={(e) => setobservation(e.target.value)}
                      > </textarea></div></div>
                    </div>  
                    <div id='bottuns'>
                 <input onClick={(e) => {handlerClick(e,0)}} type="submit" value="Enregistrer" style={{backgroundColor : 'green'}}/>
                  <input type="submit" onClick={(e) => {handlerClick(e,2)}} value="Clôturer" style={{backgroundColor : 'red'}} />
                  <input type="submit" onClick={(e) => {handlerClick(e,1)}} value="Transmettre"/>
                  </div>
                    </form>
               
                 </div>
                 
                </div>
        </div>      
        </div>
        </div>
        </div>
    )
}
export default Marche