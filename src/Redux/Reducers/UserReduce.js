import { LOG_IN, LOG_OUT, Notif } from "../ActionsName/User"

export const UserReduce = (state = {err : false,existe : false , user : {}},action) => {

    switch (action.type)  {
        case LOG_IN : 
            return {...state , existe : true , user : action.payload}
        case LOG_OUT : 
            return {...state , existe : false , user : {} }
        case Notif : 
            return {...state , existe : true , user : action.payload}
        default : 
            return state
    }
}