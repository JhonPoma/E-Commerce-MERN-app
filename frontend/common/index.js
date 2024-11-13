
const backendDomain = `http://localhost:8888`

const ResumenApi = {
    singUP : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    usuarioActual : {
        url : `${backendDomain}/api/user-detalles`,
        method : 'get'

    }
}


export default ResumenApi