import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import { DossierReduce } from "./Redux/Reducers/DossiersReduce";
import thunk from 'redux-thunk'
import { UserReduce } from "./Redux/Reducers/UserReduce";
import axios from "axios";

async function axiosTest() {

    return await axios.get("http://localhost:4000/checkUser",{withCredentials : true});

    

}


const initState = {
    dossiers : {
        existe : JSON.parse(localStorage.getItem('dossiers_projet_2cp')) ? true : false ,
        Dossiers : JSON.parse(localStorage.getItem('dossiers_projet_2cp'))  ? JSON.parse(localStorage.getItem('dossiers'))  : []
    } ,
    user : {
        existe :   false ,
        user :  {}
    }
}

const rerducers = combineReducers({
    dossiers : DossierReduce ,
    user : UserReduce,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rerducers , 
    initState ,
    composeEnhancer(applyMiddleware(logger , thunk))
)

export default store ;