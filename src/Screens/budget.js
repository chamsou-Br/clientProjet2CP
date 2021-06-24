import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bell } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'
import '../Bootstrab/Acceil/sb-admin-2.css'
import esiImage from '../images/esi_white.png'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { ModifyDossier } from '../Redux/FunctionRedux/Dossies'
import { AddUser } from '../Redux/FunctionRedux/User'
import ScrollTopButton from '../Components/ScollTopButton'

const dateCourant = new Date().getDate().toString() + '/' +   ( new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString();

export default function Budget(props) {

         const history = useHistory() ;
        const id  = props.match.params.id ;
        // redux
        const Docs = useSelector(state => state.dossiers.Dossiers);
        const Dossier = Docs.filter(doc =>{ return doc._id === id}).length > 0 ? Docs.filter(doc =>{ return doc._id === id})[0] : {budget : {}};
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

        const [date_reception, setdate_reception] = useState(Dossier.budget.date_reception ? Dossier.budget.date_reception : '');
        const [respo_dossier, setrespo_dossier] = useState(Dossier.budget.respo_dossier ? Dossier.budget.respo_dossier : '');
        const [observations, setobservations] = useState(Dossier.budget.observations ? Dossier.budget.observations : ' ');
        const [date_engag_cf, setdate_engag_cf] = useState(Dossier.budget.date_engag_cf ? Dossier.budget.date_engag_cf : '');
        const [motifs_rejet, setmotifs_rejet] = useState(Dossier.budget.motifs_rejet ? Dossier.budget.motifs_rejet : '');
        const [date_visa_rejet, setdate_visa_rejet] = useState(Dossier.budget.date_visa_rejet ? Dossier.budget.date_visa_rejet : '');
        const [date_mandatement, setdate_mandatement] = useState(Dossier.budget.date_mandatement ? Dossier.budget.date_mandatement : '');
        const [date_transm, setdate_transm] = useState(Dossier.budget.date_transm ? Dossier.budget.date_transm : '');
        const [duree_trait, setduree_trait] = useState(Dossier.budget.duree_trait);
        const [num_dossier , setnum_dossier] = useState(Dossier.num_dossier)


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
                date_transm : type === 1 ? dateCourant : '',
                type ,
                id : user.user._id,
                idDossier : id
            }).then(res => dispatch(ModifyDossier(res.data)));
            history.push('/');
        }

        useEffect(()=> {
            console.log(user.user.service , "qdfsghnj,");
            if (user.existe) {
                if (user.user.service != 'budget' && user.user.service != 'ordonnateur')  {
                    history.push('/')
                }
                if ((!user.user.compte.includes('miseAjour') && user.user.service != 'ordonnateur')) {
                    history.push('/')
                }
            }
        },[user])

    return (
        <div className='budget'>

        <div id="wrapper">
        <ScrollTopButton />
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
                            <div><input type="text" id="numdoss" name="numdoss" disabled value={num_dossier} /></div>
                            </div>
                            <div class='div'>
                                <div><label for="daterec">date de réception</label></div> 
                                <div><input type="text" id="daterec" name="daterec" 
                                            disabled value={date_reception} onChange={(e) => setdate_reception(e.target.value)}
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
