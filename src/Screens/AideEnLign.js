import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import '../Bootstrab/Acceil/sb-admin-2.css'
import $ from 'jquery'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import ScrollTopButton from '../Components/ScollTopButton';

export default function AideEnLign() {
    const [i,seti] = useState(true);
    const [i1,seti1] = useState(true);
    const [i2,seti2] = useState(true)
    const [i3,seti3] = useState(true)

    return (
        <div className='aide'>

        <div id="wrapper">
        <ScrollTopButton />
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content"> 
                <Navbar />
                        <div class="container-fluid" style={{textAlign : 'center'}}>
                        <main class="mainclass">
                    <div class="titre"> Centre d'aide </div>
                    <br />
                    <h1 class="faqs">FAQS</h1>
                    <div class="bar">
                        <div onClick={()=> {
                                var k1=document.querySelector(".sp0");
                                var k2=document.querySelector(".sp1");
                                var k3=document.querySelector(".p2");
                                if (i==true)
                                {
                                    k2.style.display="contents";
                                    k3.style.display="contents";
                                    
                                    k1.style.display="none";
                            
                                    document.querySelector(".icon1").style.transform="rotate(180deg)";
                                    seti(false)
                                }
                                else
                                {
                                     k2.style.display="none";
                                     k3.style.display="none";
                                    
                                     k1.style.display="contents";
                                   
                            
                                    document.querySelector(".icon1").style.transform="rotate(0deg)";
                                    seti(true)
                                }
                        }} class="q1">
                            
                           
                            <div class="divp">
                                   <p class="para">  comment faire dans le cas de perte du mot de passe ?</p>
                                   <p class="para1"> 
                                     un champs "mot de passe oublié" s'affichera dand la page d'authetification qui vous transmettra à une page où
                                     vous pouvez l'initialiser en entrant d'abord votre adresse email puis <span class="sp0"> . . . Afficher plus </span>     
                                     <span class="p2">en saisiant le code reçue dans la boite email puis la réinitialisation.</span> <span class="sp1">. . . Afficher moins </span> 
                                   </p>
                                   
                            </div>
                            <div class="divicon">
                                <svg class="w-6 h-6 icon1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <div class="q11" onClick={()=> {
                             var k31=document.querySelector(".sp01");
                             var k21=document.querySelector(".sp11");
                             var k51=document.querySelector(".p21");
                             if (i1==true)
                             {
                                 k21.style.display="contents";
                                 k51.style.display="contents";
                                 
                                 k31.style.display="none";
                         
                                 document.querySelector(".icon11").style.transform="rotate(180deg)";
                                 seti1(false)
                             }
                             else
                             {
                                  k21.style.display="none";
                                  k51.style.display="none";
                                 
                                  k31.style.display="contents";
                                
                         
                                 document.querySelector(".icon11").style.transform="rotate(0deg)";
                                seti1(true)
                             }
                        }}>
                            <div class="divp">
                                   <p class="para">  comment faire pour consulter un dossier ?</p>
                                   <p class="para1"> 
                                     comme tout les utilisateurs peuvent consulter n'importe quel dossier, un bouton "consulter" figure dans la
                                     table des dossiers dans la page d'accueil et pour tout les dossiers, <span class="sp01"> . . . Afficher plus </span>     
                                     <span class="p21"> en cliquant on se dirige vers une page où 
                                        on visualise les services par choix..</span> <span class="sp11">. . . Afficher moins </span> 
                                   </p>
                            </div>
                            <div class="divicon">
                                <svg class="w-6 h-6 icon11" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <div class="q12" onClick={()=> {
                             var k32=document.querySelector(".sp02");
                             var k22=document.querySelector(".sp12");
                             var k52=document.querySelector(".p22");
                             if (i2==true)
                             {
                                 k22.style.display="contents";
                                 k52.style.display="contents";
                                 
                                 k32.style.display="none";
                         
                                 document.querySelector(".icon12").style.transform="rotate(180deg)";
                                 seti2(false)
                             }
                             else
                             {
                                  k22.style.display="none";
                                  k52.style.display="none";
                                 
                                  k32.style.display="contents";
                                
                         
                                 document.querySelector(".icon12").style.transform="rotate(0deg)";
                                 seti2(true)
                             }
                        }} >
                            
                            <div class="divp">
                                
                                   <p class="para">  comment ajouter un nouveau dossier ?</p>
                                   <p class="para1"> 
                                     un bouton "ajouter un dossier" s'affichera dans la 'sidebar' qui vous transmettra à une page exclusive aux utilisiteurs
                                     des service marchés et service commandes où vous devez remplir les champs nécessaire puis cliquez sur "créer".  <span class="sp02"> . . . Afficher plus </span>     
                                     <span class="p22"></span> <span class="sp12">. . . Afficher moins </span> 
                                   </p>
                                   
                            </div>
                            <div class="divicon">
                                <svg class="w-6 h-6 icon12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <div class="q13"  onClick={()=> {
                             var k33=document.querySelector(".sp03");
                             var k23=document.querySelector(".sp13");
                             var k53=document.querySelector(".p23");
                             if (i3==true)
                             {
                                 k23.style.display="contents";
                                 k53.style.display="contents";
                                 
                                 k33.style.display="none";
                         
                                 document.querySelector(".icon13").style.transform="rotate(180deg)";
                                 seti3(false);
                             }
                             else
                             {
                                  k23.style.display="none";
                                  k53.style.display="none";
                                 
                                  k33.style.display="contents";
                                
                         
                                 document.querySelector(".icon13").style.transform="rotate(0deg)";
                                 seti3(true);
                             }
                        }} >
                            
                            <div class="divp">
                                
                                   <p class="para">  comment effectuer des mises à jour pour un dossier ?</p>
                                   <p class="para1"> 
                                     un bouton "mise à jour" s'affichera dans la 'sidebar' qui vous affichera les services que vous pouver
                                     modifier puis vous transmettra à une page contenant un tableau des dossiers comme celui du page d'accueil avec un bouton
                                       <span class="sp03"> . . . Afficher plus </span>     
                                     <span class="p23">"mise à jour" en cliquant sur lui les différents champs du service s'afficheront avec le droit de modifier.</span> <span class="sp13">. . . Afficher moins </span> 
                                   </p>
                                   
                            </div>
                            <div class="divicon">
                                <svg class="w-6 h-6 icon13" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div><br/><br/>     
                </main>
                        </div>
                </div>
                
        </div>
        </div>
        </div>
    )
        
 
}
