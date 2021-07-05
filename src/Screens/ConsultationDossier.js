import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
import ReactToPdf from 'react-to-pdf' ;

export default function ConsultationDossier(props) {

    // get dossier to consulter
    const history = useHistory() ;
    const id  = props.match.params.id ;
    // redux
    const Docs = useSelector(state => state.dossiers.Dossiers)
    const Dossier = Docs.filter(doc =>{console.log(doc._id,id) ;return doc._id === id})[0];
    const dispatch = useDispatch();
    const [pdf , setpdf]  = useState(false);
    const user = useSelector(state => state.user)

    const Avancement = () => {
        var AVANC = 0;
        if (Dossier.finish) return 100
        else {
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
        })        }
   const [consulter , setConsulter] = useState(0);

   useEffect(()=> {
       if (user.existe) {
        if (!user.user.compte.includes('consultation') && user.user.service != 'ordonnateur' && user.user.service != 'adminstration' ) {
            history.push('/')
        }
       }
   },[])

   const ref = React.createRef();
   const options = {
    unit: 'in',
    format: [25,11.1]
};

    return (
        <div className='consultation' >
        <ScrollTopButton/>
                <div id="wrapper">
            
            <Sidebar />
           <div id="content-wrapper" className="d-flex flex-column">
            <div id="content"   >
            <Navbar />
            <ReactToPdf targetRef={ref} onComplete={()=> setpdf(false)}  filename="dossier.pdf" options={options} x={.1} y={.1} scale={0.8}>
                {({toPdf}) => (
                          <button 
                          className='pdf'
                          onClick={()=>{setpdf(true);toPdf()}}>telécharger PDF</button>
                )}
                
            </ReactToPdf>
                <div className='servicesName'  >

                {consulter === -1 ? (
                        <div className='serviceName active'>
                            <h3 className='serviceTitle'>Générale</h3>
                        </div>
                    ) : (
                        <div className='serviceName' onClick={()=>setConsulter(-1)}>
                            <h3 className='serviceTitle'>Générale</h3>
                        </div>
                    )}

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
                            <h3 className='serviceTitle'>comptabilité</h3>
                        </div>
                    ) : (
                        <div className='serviceName' onClick={()=>setConsulter(3)}>
                            <h3 className='serviceTitle'>comptabilité</h3>
                        </div>
                    )}

                </div>
                <div ref={ref} >


                  {/* Choose a service to consulter */ }
                  { consulter === -1 ? (
                      <>
                                            <main className="mainclass"  >

<div className="avencement"  >
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
              <meter style={{marginLeft : '-40%' , width : '55%' ,height : '30px'}}  min="0" max="100" value={Avancement()} ></meter>
          </div>
      </div>
      <br />
    </div>
</div>
</main>
                      </>
                  ) :  consulter === 0 ? (<ConsultationMarche  ref={ref} Dossier={Dossier} />) : 
                  consulter === 1 ?  (<ConsultationCommande  ref={ref} Dossier={Dossier} />) : 
                  consulter === 2 ? (<div ref={ref}><ConsultationBudget  ref={ref} Dossier={Dossier} /></div>) : 
                  (<ConsultationCompatibilite  ref={ref} Dossier={Dossier} />) }
                  
                  {consulter != 0 && pdf && (<ConsultationMarche  ref={ref} Dossier={Dossier} />) }
                  {consulter != 1 && pdf  &&  (<ConsultationCommande  ref={ref} Dossier={Dossier} />)} 
                  {consulter != 2 && pdf  && (<ConsultationBudget  ref={ref} Dossier={Dossier} />)} 
                  {consulter != 3 && pdf && (<ConsultationCompatibilite  ref={ref} Dossier={Dossier} />) }

                  <br/><br/><br/>
                  </div>
                
        </div>
        </div>
        </div>
        </div>
    )
}
