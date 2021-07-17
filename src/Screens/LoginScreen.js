import React, { useState } from 'react'
import axios from 'axios'
import '../Bootstrab/login/sb-admin-2.css'
import {useGoogleLogin} from 'react-google-login' 
import ScrollTopButton from '../Components/ScollTopButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { AddUser } from '../Redux/FunctionRedux/User';
const clientId = "953077210388-hrrqunh00aerbng60d4firkbdh2954q3.apps.googleusercontent.com";

 const  LoginScreen = (props) => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [role , setRole] = useState([]);
    const [remember, setRemembre] = useState(false);
    const [withGoogle , setWithGoogle ] = useState(false)

    const [emailError , setEmailError] = useState('');
    const [passwordError , setPasswordError] = useState('');
    const [roleError , setRoleError] = useState('');
    const [withGoogleError , setwithGoogleError] = useState('');


    // redux 
    const user = useSelector(state => state.user)
    console.log(JSON.parse( localStorage.getItem('user_projet_2cp')))
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // check user
    if (!location.state) {
        axios.get("http://localhost:4000/checkUser",{withCredentials : true}).then(res => {
            if (res.data.existe) {
                console.log('login false')
                dispatch(AddUser(res.data.user));
                history.push('/');
            }
            })
    }
        if (user.existe) {
            console.log('login false2')
            history.push('/');
        }
    
    // login function
    const handlerConnection = (e) => {
        e.preventDefault();
        setWithGoogle(false);
        axios.post('http://localhost:4000/login',{
            email : email , 
            password : password ,
            compte : role,
            remember : remember,
            withGoogle
        },{withCredentials : true}).then(res => {
            console.log(res.data);
            if (res.data.err) {
                setEmailError(res.data.err.email);
                setPasswordError(res.data.err.password);
                setRoleError(res.data.err.compte);
            }else {
                dispatch((AddUser(res.data.user)));
            }
        } )
    }

    // connetion with google
    const {signIn , loaded} = useGoogleLogin({
        clientId : clientId ,
        onSuccess : async (res)=> {
            console.log(res.profileObj)
            await setEmail(await res.profileObj.email);
            setWithGoogle(true);
            console.log(role)
            axios.post('http://localhost:4000/login',{
                email : res.profileObj.email , 
                compte : role,
                remember : remember,
                withGoogle : true,
                imageSocial : res.profileObj.imageUrl
            }).then((res) => {
                if (res.data.err) {
                    setwithGoogleError(res.data.err.email);
                }else {
                    dispatch((AddUser(res.data.user)));
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
      <ScrollTopButton />
  
        <div className="container  ">
          <div className="row  justify-content-center">
            <div className="col-xl-10  col-lg-12 col-md-9">
                <div className="card o-hidden  border-0 shadow-lg my-5">
                    <div className="card-body  p-0">   
                        <div className="row"> 
                            <div className="col-lg-6 d-none d-lg-block"><img alt='esi' height="100%" src="/images/esi.jpg" width="468"/></div>
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
                                                onChange={(e) =>{
                                                    setEmail(e.target.value)
                                                    setEmailError('');
                                                    }}
                                                />
                                            <p className='errLogin'>{emailError}</p>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Mot de passe"
                                                value={password} onChange={(e) =>{
                                                    setPassword(e.target.value);
                                                    setPasswordError('');
                                                    
                                                    }} 
                                                />
                                            <p className='errLogin'>{passwordError}</p>
                                        </div>
                                       
                                        
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
                                        <a className="small" href="/forgetPassword">Mot de passe oublié?</a>
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