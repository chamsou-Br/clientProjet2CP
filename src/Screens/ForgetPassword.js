import React, { useState } from 'react'
import ScrollTopButton from '../Components/ScollTopButton';
import '../Bootstrab/login/sb-admin-2.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AddUser } from '../Redux/FunctionRedux/User';
import { useHistory } from 'react-router';

function ForgetPassword() {

    const [password , setPassword] = useState('');
    const [passwordError , setPasswordError] = useState('');
    const [code,setcode] = useState(null);
    const [codeErr , setCodeErr]  = useState('');
    const [email , setEmail]  = useState('');
    const [errEmail , setErrEmail]  = useState('');
    const [vraicode , setvraiCode] = useState(null);
    const [disabled , setdisabled]  =useState(true);
    const [disabledd , setdisabledd] = useState(true); 
    const [emailVrai , setEmailVrai] = useState(null);

    const receiveCode = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/forgetPassword' , {
            email : email,
            etape : 0
        }).then(res => {
            if (res.data.err ) {
                setErrEmail('this email isn\'t registred');
            }else {
                setEmailVrai(email);
                setvraiCode(res.data.code);
                setdisabled(false);
                setErrEmail('')
            }
        })
    }

    const SendCode = (e) => {
        e.preventDefault();
        if (code === vraicode.toString()) {
            setdisabledd(false)
            setCodeErr('');
        }else {
            setCodeErr('this code is incorrect')
        }
    }
    const dispatch = useDispatch();
    const history = useHistory();
    const ChangePassword = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/forgetPassword' , {
            email : emailVrai,
            password,
            etape : 1
        }).then(res => {
            if (res.data.err ) {
                setPasswordError('there is an Error')
            }else {
                dispatch(AddUser(res.data))
                history.push('/');
            }
        })
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
                              <div className="col-lg-6 d-none d-lg-block "><img alt='esi' height="100%" src="/images/esi.jpg" width="468"/></div>
                              <div className="col-lg-6">
                                  <div className="p-5">
                                      <div className="text-center">
                                          <h1 className="h4 text-gray-900 mb-4">Connectez-vous à votre compte</h1>
                                      </div>
                                      <form className="user">
                                      <div className="form-group">
                                              <input type="text" className="form-control form-control-user"
                                                  id="exampleInputPassword" placeholder="Email"
                                                  value={email} onChange={(e) =>{
                                                      setEmail(e.target.value);
                                                      setErrEmail('')
                                                      setdisabled(true)
                                                      setdisabledd(true)
                                                    }} 
                                                  />
                                          </div>
                                          <p className='errLogin'>{errEmail}</p>

                                          <a href="index.html" className="btn btn-primary btn-user btn-block" 
                                              onClick={(e)=>{receiveCode(e)}}
                                           >
                                              receiveCode
                                          </a>
                                          <hr/>
                                      <div className="password form-group">
                                              <input disabled={disabled} type="text" className="form-control form-control-user"
                                                  id="exampleInputPassword" placeholder="Code"
                                                  value={code} onChange={(e) =>{
                                                      setcode(e.target.value);
                                                      setCodeErr('')
                                                      setdisabledd(true)
                                                      }} 
                                                  />
                                          </div>
                                          <p className='errLogin'>{codeErr}</p>

                                          <a  href="index.html" className={`${disabled? "disabled" : ''} btn btn-primary btn-user btn-block`}
                                              onClick={(e)=>{SendCode(e)}}
                                           >
                                              SendCode
                                          </a>
                                          <hr/>
                                          <div className="password form-group">
                                              <input  disabled={disabledd} type="password" className="form-control form-control-user"
                                                  id="exampleInputPassword" placeholder="Mot de passe"
                                                  value={password} onChange={(e) =>{
                                                      setPassword(e.target.value);
                                                      setPasswordError('');
                                                      
                                                      }} 
                                                  />
                                          </div>   
                                          <p className='errLogin'>{passwordError}</p>
                                          <a   href="index.html" className={`${disabledd? "disabled" : ''} btn btn-primary btn-user btn-block`} 
                                              onClick={(e)=>{ChangePassword(e)}}
                                           >
                                              Connexion
                                          </a>                
                                      </form>
                                      
                                      
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

export default ForgetPassword
