import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import esiImage from '../images/esi_white.png'
import profileImage  from '../images/undraw_profile.svg'
import {Link, useHistory} from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { AddDossier, initDossier } from '../Redux/FunctionRedux/Dossies'
import ScrollTopButton from '../Components/ScollTopButton'
import { AddUser } from '../Redux/FunctionRedux/User'


export default function Nouveau(props) {

    const history = useHistory();
    // check user
    const user = useSelector(state => state.user);
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
    })
    }
    

        //redux 
        const Dossiers = useSelector(state => state.dossiers.Dossiers);
        const year = new Date().getFullYear().toString()
        const num = Dossiers.length > 0 ? parseInt(Dossiers[Dossiers.length - 1].num_dossier.split('/')[1]) + 1 : 1 ;

    const [num_dossier, setnum_dossier] = useState(`${year}/${num}`);
    const [type_prestation, settype_prestation] = useState('Marchés');
    const [fournisseur, setfournisseur] = useState("")




    const handlerClick = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:4000/dossiers/newDossiers`,{
            num_dossier,
            type_prestation,
            fournisseur,
            id : user.user._id,
            date_lancement : new Date().getDate().toString() + '/' +   ( new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString()
        }).then(res =>{ dispatch(AddDossier(res.data)); history.push(`/marche/edit/${res.data._id}`)});
       
    }

    useEffect(()=> {
        if (user.existe) {
            if (user.user.service != 'marche' && user.user.service != 'ordonnateur' && user.user.service != 'commande')  {
                history.push('/')
            }
        }
    },[user])

    return (
        <div className='nouveau'>
        <div id="wrapper">
        <ScrollTopButton />
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
                                  disabled  value={num_dossier} onChange={(e) => setnum_dossier(e.target.value)}
                     /></div>
                      </div>
                     <div className='div'>
                     <div><label htmlFor="type">Type de presntation</label></div>
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
                           <input  type="submit" value="Créer" style={{backgroundColor : '#1a1a2e'}}/>
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
