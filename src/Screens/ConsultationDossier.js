import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Navbar from '../Components/Navbar'
import ScrollTopButton from '../Components/ScollTopButton'
import Sidebar from '../Components/Sidebar'
import { AddUser } from '../Redux/FunctionRedux/User';

export default function ConsultationDossier(props) {

    // get dossier to consulter
    const history = useHistory() ;
    const id  = props.match.params.id ;
    // redux
    const Docs = useSelector(state => state.dossiers.Dossiers);
    const Dossier = Docs.filter(doc =>{ return doc._id === id})[0];
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const Avancement = () => {
        var AVANC = 0;
        console.log(Dossier,"AVNC");
        if (Dossier.finish) return 100
        else {
            console.log(Dossier.marche.finish,'avnc true');
            if (Dossier.marche.finish) AVANC += 25 ;
            if (Dossier.commande.finish) AVANC += 25;
            if (Dossier.budget.finish) AVANC += 25 ;
            if (Dossier.comptable.finish) AVANC += 25 ;
            return AVANC
        }
    }

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

    return (
        <div className='consultation'>
        <ScrollTopButton/>
                <div id="wrapper">
            
            <Sidebar />
           <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
            <Navbar />
            <div className='titleDiv'>
                <h3 style={{margin : '1rem',textAlign : 'center',marginBottom : '2rem',fontWeight : 'bold',color: "#1c294e"}}>
                            Consultation
                </h3>
            </div>
                <main className="mainclass"  >

                  <div className="avencement">
                      <div className="divt">
                        <h1 className="lbc"> Numéro de dossier : <span>{Dossier.num_dossier} </span></h1>
                        <h1 className="lbc"> Type de prestation : <span>{Dossier.marche.type_prestation} </span> </h1>
                        <h1 className="lbc"> Fournaisseur : <span>{Dossier.marche.fournisseur}</span></h1>          
                      </div>
                      <div className="divt">
                        <h1 className="lbc"> Décision : {Dossier.marche.decision ? (<span>{Dossier.marche.decision}</span>) : (<span>Pas Encore</span>) } </h1>
                        <h1 className="lbc"> Résponsable du dossier : {Dossier.marche.respo_dossier ? (<span>{Dossier.marche.respo_dossier}</span>) : (<span>Pas Encore</span>) }</h1>
                        <div style={{width : '100%' , display : 'flex'}} >
                            <div style={{width : '8%' , height : '24px'}} >
                            </div>
                            <div style={{width : '47%' , height : '24px'}} > 
                                <h1 className="lbc" style={{margin : '0px'}}> Avencement : </h1>
                            </div>
                            <div style={{width : '45%' , height : '24px'}}> 
                                <meter style={{marginLeft : '10%' , width : '55%' ,height : '30px'}}  min="0" max="100" value={Avancement()} ></meter>
                            </div>
                        </div>
                        <br />
                      </div>
                  </div>
                  <div className="service">
                    <div style={{width : "100%"}}>
                       <h1 className="title"> Service Marché </h1>
                    </div>
                    <hr className="ligne" />
                    <div style={{width : '100%'}}>
                        <h1 className="lbc"> Objet : {Dossier.marche.objet ? (<span>{Dossier.marche.objet}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de lanecement : {Dossier.marche.date_lancement ? (<span>{Dossier.marche.date_lancement}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date d'ouverture : {Dossier.marche.data_ouverture ? (<span>{Dossier.marche.data_ouverture}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de transmission au service commande : {Dossier.marche.data_transm ? (<span>{Dossier.marche.data_transm}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> N° Convention : {Dossier.marche.num_convention ? (<span>{Dossier.marche.num_convention}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Duré de traitement du dossie : {Dossier.marche.duree_trait ? (<span>{Dossier.marche.duree_trait}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date d'envoi au service commande : {Dossier.marche.data_transm ? (<span>{Dossier.marche.data_transm}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Observation : {Dossier.marche.observation ? (<span>{Dossier.marche.observation}</span>) : (<span>Pas Encore</span>) }</h1>
                        
                    </div>

                  </div>
                  <div className="service">
                    <div style={{width : '100%'}}>
                        <h1 className="title"> Service Commande </h1>
                     </div>
                     <hr className="ligne"/>
                      <div style={{width : '100%'}}>
                        <h1 className="lbc"> Date de réception : {Dossier.commande.date_reception ? (<span>{Dossier.commande.date_reception}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> N° du Facture proforma : {Dossier.commande.num_fact_proforma ? (<span>{Dossier.commande.num_fact_proforma}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date facture proforma : {Dossier.commande.date_fact_proforma ? (<span>{Dossier.commande.date_fact_proforma}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Montant : {Dossier.commande.montant ? (<span>{Dossier.commande.montant}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> N° Bon du commande : {Dossier.commande.num_bon_commande ? (<span>{Dossier.commande.num_bon_commande}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de bon du commande : {Dossier.commande.date_bon_commande ? (<span>{Dossier.commande.date_bon_commande}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de réception de la prestation : {Dossier.commande.date_reception_prest ? (<span>{Dossier.commande.date_reception_prest}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> N° Facture définitive : {Dossier.commande.num_fact_proforma ? (<span>{Dossier.commande.num_fact_proforma}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> N° Bon de réseption : {Dossier.commande.num_bon_reception ? (<span>{Dossier.commande.num_bon_reception}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date d'envoi au service budjet : {Dossier.commande.date_envoi ? (<span>{Dossier.commande.date_envoi}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Duré de traitement du dossie : {Dossier.commande.duree_trait ? (<span>{Dossier.commande.duree_trait}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Observation : {Dossier.commande.observation ? (<span>{Dossier.commande.observation}</span>) : (<span>Pas Encore</span>) }</h1>
                      </div>

                  </div>
                  <div className="service">
                    <div style={{widows : '100%'}}>
                        <h1 className="title"> Service Budjet </h1>
                     </div>
                     <hr className="ligne"/>
                      <div style={{widows : '100%'}}>
                        <h1 className="lbc"> Date de réception  : {Dossier.budget.date_reception ? (<span>{Dossier.budget.date_reception}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date d'engagement au CF : {Dossier.budget.date_engag_cf ? (<span>{Dossier.budget.date_engag_cf}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Motifs de rejet éventuel : {Dossier.budget.motifs_rejet ? (<span>{Dossier.budget.motifs_rejet}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de Visa/rejet définitif du contrôleur financier : {Dossier.budget.date_visa_rejet ? (<span>{Dossier.budget.date_visa_rejet}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de mandatement : {Dossier.budget.date_mandatement ? (<span>{Dossier.budget.date_mandatement}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date d'envoi au service Comptable : {Dossier.budget.date_transm ? (<span>{Dossier.budget.date_transm}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Duré de traitement du dossie : {Dossier.budget.duree_trait ? (<span>{Dossier.budget.duree_trait}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Observation : {Dossier.budget.observation ? (<span>{Dossier.budget.observation}</span>) : (<span>Pas Encore</span>) }</h1>
                      </div>

                  </div>
                  <div className="service">
                    <div style={{width : '100%'}}>
                        <h1 className="title"> Agence Comptable </h1>
                     </div>
                     <hr className="ligne" />
                      <div style={{width : '100%'}}>
                        <h1 className="lbc"> Date de réception  : {Dossier.comptable.date_reception ? (<span>{Dossier.comptable.date_reception}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Pieces a completer : {Dossier.comptable.piece_cmpleter ? (<span>{Dossier.comptable.piece_cmpleter}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de complément du dossier : {Dossier.comptable.date_cmplement ? (<span>{Dossier.comptable.date_cmplement}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Date de peiment  : {Dossier.comptable.date_paiement ? (<span>{Dossier.comptable.date_paiement}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Duré de traitement du dossie : {Dossier.comptable.duree_trait ? (<span>{Dossier.comptable.duree_trait}</span>) : (<span>Pas Encore</span>) }</h1>
                        <h1 className="lbc"> Observation : {Dossier.comptable.observation ? (<span>{Dossier.comptable.observation}</span>) : (<span>Pas Encore</span>) }</h1>
                      </div>

                  </div>
                  <div className="service" style={{height : '400px'}}>
                    <div style={{width : '100%'}}>
                        <h1 className="title"> OBSERVATIONS GÉNÉRALES
                        </h1>
                     </div>
                     <hr className="ligne"/>
                     <div style={{width : '100%',padding : '1rem',fontSize : '1.2rem',fontWeight : 500}}>
                     {Dossier.observations_gnrl? (<span>{Dossier.observations_gnrl}</span>) : (<span>Pas Encore</span>) }
                     </div>

                  </div>
                  <br/><br/><br/>
                </main>
        </div>
        </div>
        </div>
        </div>
    )
}
