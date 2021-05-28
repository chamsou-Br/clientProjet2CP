import axios from 'axios'
import React, { useEffect, useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import '../Bootstrab/Acceil/sb-admin-2.css'
import Navbar from '../Components/Navbar'
import ScrollTopButton from '../Components/ScollTopButton'
import Sidebar from '../Components/Sidebar'
import esiImage from '../images/esi_white.png'
import profileImage  from '../images/undraw_profile.svg'
import { ModifyDossier } from '../Redux/FunctionRedux/Dossies'
import { AddUser } from '../Redux/FunctionRedux/User'

//const id = "609a3694bcbe4715504c7fb2";

const Marche = (props) => {

    const id  = props.match.params.id ;
    const history = useHistory()
        
    // redux
        const Docs = useSelector(state => state.dossiers.Dossiers)
        const Dossier = Docs.filter(doc =>{ return doc._id === id}).length > 0 ? Docs.filter(doc =>{ return doc._id === id})[0] : {marche : {}};
        if (Docs.filter(doc =>{ return doc._id === id}).length === 0) history.push('/')
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
  useEffect(()=> {
    if (user.existe) {
        if (user.user.service != 'marche' && user.user.service != 'ordonnateur')  {
            history.push('/')
        }
    }
},[user])
        

    const [type_prestation, settype_prestation] = useState(Dossier.marche.type_prestation ? Dossier.marche.type_prestation : 'Marchés');
    const [objet, setobjet] = useState(Dossier.marche.objet ? Dossier.marche.objet : '');
    const [date_lancement, setdate_lancement] = useState(Dossier.marche.date_lancement ? Dossier.marche.date_lancement : '');
    const [data_ouverture, setdata_ouverture] = useState(Dossier.marche.data_ouverture ? Dossier.marche.data_ouverture : '');
    const [observation, setobservation] = useState(Dossier.marche.observation ? Dossier.marche.observation : '');
    const [fournisseur, setfournisseur] = useState(Dossier.marche.fournisseur ? Dossier.marche.fournisseur : '');
    const [data_transm, setdata_transm] = useState(Dossier.marche.data_transm ? Dossier.marche.data_transm : '');
    const [decision, setdecision] = useState(Dossier.marche.decision ? Dossier.marche.decision : '');
    const [num_convention, setnum_convention] = useState(Dossier.marche.num_convention ? Dossier.marche.num_convention : '');
    const [respo_dossier, setrespo_dossier] = useState(Dossier.marche.respo_dossier ? Dossier.marche.respo_dossier : '');
    const [duree_trait, setduree_trait] = useState(Dossier.marche.duree_trait ? Dossier.marche.duree_trait : '');
    const [num_dossier , setnum_dossier] = useState(Dossier.num_dossier)



  console.log(Dossier , Dossier.marche.decision)
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
            type,
            id : user.user._id
        }).then(res => dispatch(ModifyDossier(res.data)));
        history.push('/');
    }

    return(
        <div className='marche'>
        <div id="wrapper">
        <ScrollTopButton />
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
                     <div><input type="text" id="numdoss" disabled name="numdoss" value={num_dossier} /></div>
                      </div>
                     <div className='div'>
                     <div><label htmlFor="type">Type de prestation</label></div>
                     <div >
                      <select className='selectMarch' name="type" id="type"  onChange={(e) => settype_prestation(e.target.value)}>
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