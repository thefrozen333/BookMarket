/**
 * Created by tonch on 04-Dec-16.
 */
class UserModel {
    constructor(baseUrl, appKey, requester, authorizationService) {
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._authorizationService = authorizationService;
        this._requester = requester;
    }
    registerUser(data){
        let registerUrl = this._baseUrl + "user/" + this._appKey;
        return this._requester.post(registerUrl, this._authorizationService.getHeaders(), data);
    }

    loginUser(data){
        let loginUrl= this._baseUrl + "user/" + this._appKey + '/login';
        return this._requester.post(loginUrl, this._authorizationService.getHeaders(), data);
    }
}