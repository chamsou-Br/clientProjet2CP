import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Navbar from '../Components/Navbar'
import ScrollTopButton from '../Components/ScollTopButton'
import Sidebar from '../Components/Sidebar'
import { AddUser } from '../Redux/FunctionRedux/User'
import profileImage  from '../images/undraw_profile.svg'
import { useGoogleLogin } from 'react-google-login'
const clientId = "953077210388-hrrqunh00aerbng60d4firkbdh2954q3.apps.googleusercontent.com";

function Profile() {

   const history = useHistory()
   const user = useSelector(state => state.user);
   const dispatch = useDispatch();
   const [existe , setexiste] = useState(false);
   const [nom, setnom] = useState(user.existe ? user.user.username.split(' ')[0]   : "");
   const [prenom, setprenom] = useState(user.existe ? user.user.username.split(' ')[1] : "");
   const [email, setemail] = useState(user.existe ? user.user.email : "");
   const [service, setservice] = useState(user.existe ? user.user.service : "");
   const [ancpassword, setancpassword] = useState("");
   const [newpassword, setnewpassword] = useState("");
   const [misAjour, setmisAjour] = useState(user.existe ? user.user.compte.includes('miseAjour') ? true :false : false);
   const [consultation, setconsultation] = useState(user.existe ? user.user.compte.includes('consultation') ? true : false : false);
   const [consulter, setConsulter] = useState(0);
   const [errpassword , seterrpassword]  = useState('');

   // edit info profile 
   const EdditProfile = (e) => {
      e.preventDefault();
      console.log(nom + ' ' + prenom)
      axios.post('http://localhost:4000/profile',{
         username : nom + ' ' + prenom,
         email,
         ancpassword,
         newpassword : (newpassword && ancpassword) ? newpassword  : false ,
         id : user.user._id
      }).then(res => {
         if (res.data.err) {
            seterrpassword('this.password is incorrect')
         }
         dispatch(AddUser(res.data.user));
      })
   }

   // changeProfile

      const {signIn , loaded} = useGoogleLogin({
         clientId : clientId ,
         onSuccess : async (res)=> {
             axios.post('http://localhost:4000/image',{
                 email : res.profileObj.email , 
                 imageSocial : res.profileObj.imageUrl
             }).then((res) => {
                 if (!res.data.err) {
                     dispatch(AddUser(res.data.user))
                 }else alert('this email n\'est pas regestred ');
             })
         } ,
         onFailure : (res)=> {alert('vous ve vouler pas changer l\'image');} ,
     })
     const ChangePhoto = async (e) => {
        e.preventDefault();
        console.log('photo')
        await signIn();
     }

   useEffect(()=> {
        // check if user EXiste
         if (!user.existe) {
            axios.get("http://localhost:4000/checkUser",{withCredentials : true}).then(res => {
            if (res.data.existe) {
               dispatch(AddUser(res.data.user));
               console.log('dfsgbhn');
               setemail(res.data.user.email);
               setnom(res.data.user.username.split(' ')[0])
               setprenom(res.data.user.username.split(' ')[1]);
               setservice(res.data.user.service);
               if (res.data.user.compte.includes('miseAjour'))setmisAjour(true)
               if (res.data.user.compte.includes('consultation')) setconsultation(true);
            
            }else {
               history.push('/login');
            }
         })
        }else setexiste(true);
   },[user])

   

    return (
        <div className='profile'>
             <div id="wrapper">
                <ScrollTopButton  />
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar />
            <main className="mainclass">
                  <div className="div1">
                
                     <label className="write" > Gestionnaire des comptes </label>
                  </div>
                  
                  <div className="div2">
                  <div className='servicesName'>
                            {consulter === 0 ? (
                                <div className='serviceName active'  >
                                    <h3 className='serviceTitle'>Profile</h3>
                                </div>
                            ) : (
                                <div className='serviceName' onClick={()=>{
                                       setConsulter(0);
                                       const passAll  = document.querySelectorAll('.password');
                                       passAll.forEach(pass => {
                                           if (!pass.classList.contains('none')) pass.classList.add('none')
                                       })
                                       }}>
                                    <h3 className='serviceTitle'>Profile</h3>
                                </div>
                            )}


                            {consulter === 1 ? (
                                <div className='serviceName active' >
                                    <h3 className='serviceTitle'>Gérer</h3>
                                </div>
                            ) : (
                                <div className='serviceName' onClick={()=>{
                                   setConsulter(1);
                                   const passAll  = document.querySelectorAll('.password');
                                   passAll.forEach(pass =>{
                                     if (pass.classList.contains('none')) pass.classList.remove('none')
                                   })
                                   }}>
                                    <h3 className='serviceTitle'>Gérer</h3>
                                </div>
                            )}
                    </div>
                    
                    <div className="ligne">
                    </div>
                  </div>
                  <div className="div3">
                      <div className="div31">
                          <div className="div311">
                               {user.user.isImageSocial && (
                                            <img className="imgprofile" src={user.user.imageSocial} />
                                        )}
                                 {!user.user.isImageSocial && (
                                            <img className="imgprofile" src={profileImage} />
                                        )}
                              <center><button disabled={consulter === 0} onClick={(e) => ChangePhoto(e)} className="change"> Changer</button></center>
                          </div>

                      </div>
                      <div className="div32">
                          <form onSubmit={(e)=> EdditProfile(e)} >
                          <table style={{marginTop : "3%" ,width : '100%'}}>
                              <tr className="trt">
                                 <th className="th1">
                                    <label > NOM </label>
                                 </th>
                                 <th className="th2">
                                    <input disabled={consulter === 0} type="text" name="n1"
                                            value={nom} onChange={(e) => setnom(e.target.value)} />
                                 </th>
                              </tr>
                              <tr className="trt">
                                <th className="th1">
                                   <label > PRENOM </label>
                                </th>
                                <th className="th2">
                                   <input disabled={consulter === 0} type="text" name="n2" 
                                      value={prenom} onChange={(e)=> setprenom(e.target.value)}
                                   />
                                </th>
                             </tr>
                             <tr className="trt">
                                <th className="th1">
                                   <label > EMAIL </label>
                                </th>
                                <th className="th2">
                                   <input disabled={consulter === 0} type="text" name="n3" 
                                          value={email} onChange={(e)=> setemail(e.target.value)}
                                   />
                                </th>
                             </tr>
                             <tr className="trt">
                                <th className="th1">
                                   <label > SERVICE </label>
                                </th>
                                <th className="th2">
                                   <input disabled type="text" name="n4"
                                          value={service}  />
                                </th>
                             </tr>
                             <tr className="trt">
                                <th className="th1">
                                   <label > Compte </label>
                                </th>
                                <th className="th2">
                                <div className='compte' style={{display : 'flex'}}>
                                   <input checked={misAjour} disabled value='Consultation'  type="checkbox" name="n5" />
                                   <label> mise a jour</label>  
                                   <input checked={consultation} disabled type="checkbox" name="n5" />
                                   <label> Consultation</label>  
                                   </div>
                                </th>
                             </tr>
                             <tr className="trt">
                                <th className="th1">   
                                 <hr />  
                                </th>
                                <th className="th2">
                                   <hr className='hr'  />
                                </th>
                             </tr>
                             <tr className="trt password none">
                                <th className="th1">
                                   <label >Anciene MOT DE PASSE </label>
                                </th>
                                <th className="th2">
                                   <input disabled={consulter === 0}  type='password' name="n6"
                                          value={ancpassword} onChange={(e)=> {
                                             setancpassword(e.target.value);seterrpassword('')}}
                                   />
                                   <p style={{color  : 'red'}} >{errpassword}</p>
                                </th>
                             </tr>  
                            
                             <tr className="trt password none">
                                <th className="th1">
                                   <label >nouveau MOT DE PASSE </label>
                                </th>
                                <th className="th2">
                                   <input disabled={consulter === 0}  type='password' name="n6"
                                          value={newpassword} onChange={(e)=> setnewpassword(e.target.value)}
                                   />
                                </th>
                             </tr>
                          </table><br/><br/>
                          <button disabled={consulter === 0} className="enr change none password" > Enregistrer</button>
                        </form>

                      </div>
                  </div>
                 <br/><br/>
                 <br />
                </main>
                <br/><br/>
                 <br />
                </div>
                </div>
                </div>
        </div>
    )
}

export default Profile
