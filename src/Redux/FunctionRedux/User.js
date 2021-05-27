import { LOG_IN, LOG_OUT } from "../ActionsName/User"

export const AddUser = (user) => (dispatch , getState) => {
    dispatch({
        type : LOG_IN ,
        payload : user
    })
};

export const RemoveUser = () => (dispatch , getState ) => {
    dispatch({
        type : LOG_OUT 
    })
    localStorage.removeItem('user_projet_2cp');
    localStorage.removeItem('dossiers_projet_2cp');
}