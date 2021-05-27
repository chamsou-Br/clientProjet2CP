import { ADD_DOSSIER, INIT_DOSSIERS, MODIFY_DOSSIER } from "../ActionsName/Dossier"

export const initDossier = (dossiers) => (dispatch , getState) => {
    dispatch({
        type : INIT_DOSSIERS ,
        payload : dossiers
    })
    localStorage.setItem('dossiers_projet_2cp',JSON.stringify(getState().dossiers.Dossiers));
} 

export const AddDossier = (doc) => (dispatch , getState) => {
    dispatch({
        type :  ADD_DOSSIER ,
        payload : doc
    })
    localStorage.setItem('dossiers_projet_2cp',JSON.stringify(getState().dossiers.Dossiers));
}

export const ModifyDossier = (doc) => (dispatch , getState) => {
    dispatch({
        type : MODIFY_DOSSIER , 
        payload : doc
    })
    localStorage.setItem('dossiers_projet_2cp',JSON.stringify(getState().dossiers.Dossiers));
}