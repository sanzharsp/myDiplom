/*хранилище url Django backend */
const url={
    BaseUrl:"https://quantumbackend.pythonanywhere.com",
    Auth:{
        login:'/api/v1/login',
        register:'/api/v1/register',
        refresh:'/api/v1/login/refresh/'
    },
    get_residental:'/api/v1/nameResidentialComplex/get',
    profile:'/api/v1/profile/get',
    QrAdd:'/api/v1/qr/user/add',
    isAuth:'/api/v1/token/verify/',
    getNews:'/api/v1/news/all',
    likeAdd:'/api/v1/news/like',
    meterGet:'/api/v1/meter/user/get'
    
    
    }
    

export default url ;