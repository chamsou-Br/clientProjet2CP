import axios from 'axios'
import React, { useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import esiImage from '../images/esi_white.png'
import profileImage  from '../images/undraw_profile.svg'
import {Link, useHistory} from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'


export default function Nouveau(props) {

    const [num_dossier, setnum_dossier] = useState('');
    const [type_prestation, settype_prestation] = useState('Marchés');
    const [fournisseur, setfournisseur] = useState("")
    const history = useHistory();

    const handlerClick = (e) => {
        e.preventDefault();
        console.log({
            num_dossier,
            type_prestation,
            fournisseur,
        })
        axios.post(`http://localhost:4000/dossiers/newDossiers`,{
            num_dossier,
            type_prestation,
            fournisseur,
        }).then(res => console.log(res.data));
        axios.get('http://localhost:4000/indexe').then(res => {
            console.log(res.data);
        })
        history.push('/');
    }

    return (
        <div className='nouveau'>
        <div id="wrapper">
         <Sidebar />
           <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

               <Navbar />
                <div className="container-fluid nouveauContainer" style={{textAlign : 'center'}}>
            <h3 style={{margin : '1rem'}}>
                Création d'un nouveau dossier
            </h3>
            <div id='main'>
                    <form  onSubmit={(e) => {handlerClick(e)}}>
                    <div id='form'>
                     <div className='div'>
                     <div><label htmlFor="numdoss">N° de dossier</label></div>
                     <div><input type="text" id="numdoss" name="numdoss"  required
                                    value={num_dossier} onChange={(e) => setnum_dossier(e.target.value)}
                     /></div>
                      </div>
                     <div className='div'>
                     <div><label htmlFor="type">Type de prestation</label></div>
                     <div>
                      <select name="type" id="type" required
                              value={type_prestation} onChange={(e) => settype_prestation(e.target.value)} >
                        <option value="Marchés" defaultChecked>Marchés</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Gré-à-Gré">Gré-à-Gré</option>
                     </select>
                     </div>
                      </div>
                      <div className='div'>
                       <div> <label htmlFor="fourn">Fournisseur</label></div>
                       <div> <input type="text" id="fourn" name="fourn"  required
                                    value={fournisseur} onChange={(e) => setfournisseur(e.target.value)}
                       /></div></div>  
                    </div> 
                       <div id='bottuns'>
                           <input  type="submit" value="Créer" style={{backgroundColor : 'bleu'}}/>
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
