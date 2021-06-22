import { LOG_IN, LOG_OUT } from "../ActionsName/User"

export const UserReduce = (state = {err : false,existe : false , user : {}},action) => {

    switch (action.type)  {
        case LOG_IN : 
            return {...state , existe : true , user : action.payload}
        case LOG_OUT : 
            return {...state , existe : false , user : {} }
        default : 
            return state
    }
}