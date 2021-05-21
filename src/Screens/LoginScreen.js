import React, { useState } from 'react'
import axios from 'axios'
import '../Bootstrab/login/sb-admin-2.css'
import {useGoogleLogin} from 'react-google-login' 
const clientId = "953077210388-hrrqunh00aerbng60d4firkbdh2954q3.apps.googleusercontent.com";

 const  LoginScreen = () => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [role , setRole] = useState([]);
    const [remember, setRemembre] = useState(false);
    const [withGoogle , setWithGoogle ] = useState(false)

    const [emailError , setEmailError] = useState('');
    const [passwordError , setPasswordError] = useState('');
    const [roleError , setRoleError] = useState('');
    const [withGoogleError , setwithGoogleError] = useState('');



    const handlerConnection = (e) => {
        console.log(role);
        e.preventDefault();
        setWithGoogle(false);
        axios.post('http://localhost:4000/login',{
            email : email , 
            password : password ,
            compte : role,
            remember : remember,
            withGoogle
        }).then(res => {
            console.log(res.data)
            if (res.data.err) {
                setEmailError(res.data.err.email);
                setPasswordError(res.data.err.password);
                setRoleError(res.data.err.compte);
            }
        } )
    }

    // connetion with google
    const {signIn , loaded} = useGoogleLogin({
        clientId : clientId ,
        onSuccess : async (res)=> {
            console.log(res.profileObj.email)
            await setEmail(await res.profileObj.email);
            setWithGoogle(true);
            console.log(role)
            axios.post('http://localhost:4000/login',{
                email : res.profileObj.email , 
                compte : role,
                remember : remember,
                withGoogle : true
            }).then((res) => {
                console.log(res.data);
                if (res.data.err) {
                    setwithGoogleError(res.data.err.email);
                }
            })
        } ,
        onFailure : (res)=> {console.log('failed')} ,
    })
    const HandlerConnectionGoogle = async (e) => {
        e.preventDefault();
        await signIn();   
        
    }


    return (
      <div className='loginScreen'>
  
        <div className="container  ">
          <div className="row  justify-content-center">
            <div className="col-xl-10  col-lg-12 col-md-9">
                <div className="card o-hidden  border-0 shadow-lg my-5">
                    <div className="card-body  p-0">   
                        <div className="row"> 
                            <div className="col-lg-6 d-none d-lg-block "><img alt='esi' height="100%" src="/images/esi.jpg" width="468"/></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Connectez-vous à votre compte</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Addresse e-mail..." value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                />
                                            <p className='errLogin'>{emailError}</p>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Mot de passe"
                                                value={password} onChange={(e) => setPassword(e.target.value)} 
                                                />
                                            <p className='errLogin'>{passwordError}</p>
                                        </div>
                                        <details className='fonctionRadio'  >
                                            <summary > Choisis le compte</summary>
                                            
                                            <div className='misajourFonction'>
                                                <input type='checkbox'  name="choix" value="misaAjour"  id='misaAjour2'
                                                  onClick={async (e) => {
                                                        if (document.querySelector('#misaAjour2').checked){
                                                           await setRole([...role ,"misaAjour" ])
                                                        }  
                                                        else setRole(role => role.filter(x=> x != "misaAjour") )
                                                        }}   
                                                />
                                                <label> miss a jour </label> 
                                            </div>
                                            <div className='consultationFonction'>
                                                <input type="checkbox"  name="choix" id='consultation2' value="consultation" 
                                                  onClick={async (e) => {
                                                        if (document.querySelector('#consultation2').checked){
                                                           await setRole([...role ,"consultation"])
                                                        }  
                                                        else setRole(role => role.filter(x=> x != "consultation") )
                                                        }}   
                                                />  
                                                <label> consultation</label>   
                                            </div>  
                                        </details>
                                        <p className='errLogin'>{roleError}</p>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck"
                                                    value={remember} onChange={(e) =>{ setRemembre(!remember)}}
                                                />
                                                <label className="custom-control-label" htmlFor="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <a href="index.html" className="btn btn-primary btn-user btn-block" 
                                            onClick={(e)=>handlerConnection(e)}
                                         >
                                            Connexion
                                        </a>
                                        <hr/>
                                        <a href="index.html" onClick={(e)=> {
                                              HandlerConnectionGoogle(e)
                                        }} className="btn btn-google btn-user btn-block">
                             
                                            <i className="fab fa-google fa-fw"></i> Connectez-vous avec google
                                        </a>    
                                        <p className='errLogin'>{withGoogleError}</p>                            
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Mot de passe oublié?</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    </div>

    )
}

export default LoginScreen