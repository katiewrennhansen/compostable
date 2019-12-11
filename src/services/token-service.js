
const TokenService = {
    saveToken(token){
        sessionStorage.setItem('token', token)
    },
    clearToken(){
        sessionStorage.removeItem('token')
    },
    getToken(){
        return sessionStorage.getItem('token')
    }
}


export default TokenService