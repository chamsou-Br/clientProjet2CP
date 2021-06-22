import { ADD_DOSSIER, INIT_DOSSIERS, MODIFY_DOSSIER } from "../ActionsName/Dossier";

 export const DossierReduce = (state = {existe : false , Dossiers : []},action) => {
    switch(action.type) {
        case INIT_DOSSIERS : 
            return {...state ,existe : true, Dossiers : action.payload}
        case ADD_DOSSIER : 
            return {...state , existe : true , Dossiers : [...state.Dossiers , action.payload]}      
        case MODIFY_DOSSIER : 
            return {...state , Dossiers : [...state.Dossiers.filter(doc => doc._id.toString() !== action.payload._id.toString()),action.payload]}
        default : 
            return state 
    }
}