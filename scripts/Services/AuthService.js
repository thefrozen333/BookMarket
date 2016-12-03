class AuthenticationService{
    constructor(appKey,appSecret){
        this._appKey = appKey;
        this._appSecret = appSecret;
    }
    isLoggedIn(){
        return sessionStorage.getItem('authToken');
    }

    getHeaders(){
        let headers = {
            'Content-Type': 'Application/json'
        };
        if(this.isLoggedIn()){
            headers['Authorization'] =  'Kinvey ' + this.isLoggedIn();
        }else{
            headers['Authorization'] = 'Basic ' + btoa(this._appKey + ':' + this._appSecret)
        }
    }
}