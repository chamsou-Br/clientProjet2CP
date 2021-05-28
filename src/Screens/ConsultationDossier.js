import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ConsultationCommande from '../Components/ConsultationCommande';
import ConsultationMarche from '../Components/ConsultationMarche';
import ConsultationBudget from '../Components/ConsultationBudget'
import ConsultationCompatibilite from '../Components/ConsultationCompatibilite'
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

        const [consulter , setConsulter] = useState(0);

    return (
        <div className='consultation'>
        <ScrollTopButton/>
                <div id="wrapper">
            
            <Sidebar />
           <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
            <Navbar />


                <div className='servicesName'>

                    {consulter === 0 ? (
                        <div className='serviceName active'  >
                            <h3 className='serviceTitle'>marché</h3>
                        </div>
                    ) : (
                        <div className='serviceName' onClick={()=>setConsulter(0)}>
                            <h3 className='serviceTitle'>marché</h3>
                        </div>
                    )}
                    

                    {consulter === 1 ? (
                        <div className='serviceName active' >
                            <h3 className='serviceTitle'>commande</h3>
                        </div>
                    ) : (
                        <div className='serviceName' onClick={()=>setConsulter(1)}>
                            <h3 className='serviceTitle'>commande</h3>
                        </div>
                    )}

                    {consulter === 2 ? (
                        <div className='serviceName active'>
                            <h3 className='serviceTitle'>budget</h3>
                        </div>
                    ) : (
                        <div className='serviceName' onClick={()=>setConsulter(2)}>
                            <h3 className='serviceTitle'>budget</h3>
                        </div>
                    )}

                    {consulter === 3 ? (
                        <div className='serviceName active'>
                            <h3 className='serviceTitle'>compatibilité</h3>
                        </div>
                    ) : (
                        <div className='serviceName' onClick={()=>setConsulter(3)}>
                            <h3 className='serviceTitle'>compatibilité</h3>
                        </div>
                    )}

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
                  </main>
                  

                  {/* Choose a service to consulter */ }
                  {consulter === 0 ? (<ConsultationMarche Dossier={Dossier} />) : 
                  consulter === 1 ?  (<ConsultationCommande Dossier={Dossier} />) : 
                  consulter === 2 ? (<ConsultationBudget Dossier={Dossier} />) : 
                  (<ConsultationCompatibilite Dossier={Dossier} />) }


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
                
        </div>
        </div>
        </div>
        </div>
    )
}
