import axios from 'axios';
import React, { useState } from 'react'
import '../Bootstrab/login/sb-admin-2.css'

const RegistreScreen = () => {

    const [firstname , setFirstName] = useState('');
    const [lastname , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState(""); 
    const [service , setService] = useState('');
    const [compte , setCompte] = useState([]);
    const [usernameError , setUsernameError] = useState('');
    const [emailError , setEmailError] = useState('');
    const [passwordError , setPasswordError] = useState('');
    const [consfirmPasswordError , setConfirmPasswordError] = useState('');
    const [serviceError , setServiceError] = useState('');
    const [CompteError , setCompteError] = useState('') 

    const handlerConnection = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/registre',{
            email : email , 
            password : password ,
            service : service,
            compte : compte.length > 0 ? compte : null ,
            withGoogle : false,
            username :(lastname || firstname) ? (lastname + ' ' + firstname) : null 
        }).then(res => {
            console.log(res.data)
            if (res.data.err) {
                setEmailError(res.data.err.email);
                setPasswordError(res.data.err.password);
                setUsernameError(res.data.err.username);
                setServiceError(res.data.err.service)
                setCompteError(res.data.err.compte)
            }
        } )
    }
    const handlerConnectionGoogle = (e) => {
        e.preventDefault();
    }

    return (
        <div className='registreScreen'>
          <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block "><img alt='esi' src="/images/esi.jpg" height='100%' width="468"/></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                                placeholder="First Name" value={firstname}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            <p className='errLogin' style={{color : 'red'}}>{usernameError}</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                placeholder="Last Name" value={lastname}
                                                onChange={(e) => setLastName(e.target.value)}
                                                />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                            placeholder="Email Address" value={email}
                                            onChange={e => setEmail(e.target.value) }
                                             />
                                        <p className='errLogin'>{emailError}</p>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" value={password} 
                                                onChange={e => setPassword(e.target.value)}
                                                />
                                            <p className='errLogin'>{passwordError}</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                id="exampleRepeatPassword" placeholder="Repeat Password" value={confirmPassword}
                                                onChange={e => {
                                                    setConfirmPassword(e.target.value);
                                                    if (password != e.target.value) setConfirmPasswordError('la confirmation de mot de passe est icorrecte')
                                                    else{ setConfirmPasswordError('');console.log('yes')}
                                                    }}/>
                                            <p className='errLogin'>{consfirmPasswordError}</p>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0" onChange={e => setService(e.target.value)} >
                                            <details style={{marginTop : "0.2rem",marginBottom : "1rem",marginLeft : "0.4rem"}} className='fonctionRadio' >
                                                <summary > Choisis le Service</summary>
                                                
                                                <div className='seriveRadio'>
                                                    <input type="radio"  name="choix" value="service1" 
                                                    />
                                                    <label> Service 01</label> 
                                                </div>
                                                <div className='seriveRadio'>
                                                    <input type="radio"  name="choix" value="service2" 
                                                    />
                                                    <label> Service 02 </label> 
                                                </div>
                                                <div className='seriveRadio'>
                                                    <input type="radio"  name="choix" value="service3" 
                                                    />  
                                                    <label> Service 03</label>   
                                                </div>  
                                                <div className='seriveRadio'>
                                                    <input type="radio"  name="choix" value="service4" 
                                                    />  
                                                    <label> Service 04</label>   
                                                </div>  
                                            </details>
                                            <p className='errLogin'>{serviceError}</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <details style={{marginTop : "0.2rem",marginBottom : "1rem",marginLeft : "0.4rem"}} className='fonctionRadio' >
                                                <summary > Choisis le compte</summary>
                                                <div className='seriveRadio'>
                                                    <input type='checkbox'   id='consultation' value="consultation" 
                                                    onClick={async (e) => {
                                                        if (document.querySelector('#consultation').checked){
                                                           await setCompte([...compte ,'consultation' ])
                                                        }  
                                                        else setCompte(compte => compte.filter(x=> x != 'consultation') )
                                                    }}    
                                                    />  
                                                    <label> consultation</label>   
                                                </div>  
                                                <div className='seriveRadio'>
                                                     <input type='checkbox'   id='miseAjour' value="miseAjour" 
                                                        onClick={async (e) => {
                                                        if (document.querySelector('#miseAjour').checked){
                                                           await setCompte([...compte ,'miseAjour' ])
                                                        }  
                                                        else setCompte(compte => compte.filter(x=> x != 'miseAjour') )
                                                        }}    
                                                     />  
                                                    <label> mise a jour</label>   
                                                </div>  
                                            </details>
                                            <p className='errLogin'>{CompteError}</p>
                                        </div>
                                    </div>

                                    <a href="login.html" onClick={(e) => handlerConnection(e)}   className="btn btn-primary btn-user btn-block">
                                        Register Account
                                    </a>
                                    <hr/>
                                </form>
                                <div className="text-center">
                                    <a className="small" href="login.html">Already have an account? Login!</a>
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
export default RegistreScreen ;
