import axios from "axios";

export  const getProject = () => {
    return (dispatch) => {
         axios('https://613f1faee9d92a0017e17474.mockapi.io/gallery')
            .then(({data}) =>dispatch({type:'GET_PROJECT', payload:data}) )
    }
}