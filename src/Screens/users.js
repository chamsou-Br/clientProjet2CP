import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Navbar from '../Components/Navbar'
import ScrollTopButton from '../Components/ScollTopButton'
import Sidebar from '../Components/Sidebar'
import { AddUser } from '../Redux/FunctionRedux/User';
import profileImage  from '../images/undraw_profile.svg';

function Users() {

    const history = useHistory()
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    // check if user EXiste
    if (!user.existe) {
        axios.get("http://localhost:4000/checkUser",{withCredentials : true}).then(res => {
        if (res.data.existe) {
            dispatch(AddUser(res.data.user));
        }else {
            history.push('/login');
        }
    })
    }
    const [users, setusers] = useState([]);
    useEffect(()=>{
                if (user.existe) {
            if (user.user.service != 'adminstration' )  {
                history.push('/')
            }
        }
        axios.get('http://localhost:4000/users').then(res=> {
            setusers(res.data);
        });

    },[user])
    
    return (
        <div className='users'>
        <div id="wrapper">
           <ScrollTopButton />
           <Sidebar />
           <div id="content-wrapper" className="d-flex flex-column">
               <div id="content">
                   <Navbar />
                    <main className="mainclass">
                    <div className="d1">
                        Centre de Profiles 
                    </div>
                    <div className="d2">
                        <br/><br/>
                        {users.length > 0 && users.map(use => {
                            return(
                                <div key={use._id}>
                                  <div className="prof">
                                    <div className="imagdiv">
                                        {use.isImageSocial && (
                                            <img src={use.imageSocial} />
                                        )}
                                        {!use.isImageSocial && (
                                            <img src={profileImage} />
                                        )}
                                        
                                    </div>                        
                                    <div className="d3" >
                                    <div className="dat"> Ajouté le {use.dayAjouter} </div>
                                    <div className="nom">{use.username}</div>
                                    </div>
                                    <label className="srv"> Service : {use.service}</label>
                                    <div className="disp">
                                        <div className="ph"> Ajouté le {use.dayAjouter} </div>
                                        <div className="ph">{use.username}</div>
                                        <div className="ph">  Service : {use.service} </div>
                                    </div>
                                  </div><br/>
                                </div>
                            )
                        })}
                      
                        <br/><br/>
                    </div>
           </main>
           </div>
           </div>
           </div>
   </div>
    )
}

export default Users
