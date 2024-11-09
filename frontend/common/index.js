
const backendDomain = `http://localhost:8888`

const ResumenApi = {
    singUP : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    }
}


export default ResumenApi