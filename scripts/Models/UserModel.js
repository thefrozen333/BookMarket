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
        let registerUrl = kinveyBaseUrl + "user/" + kinveyAppKey;
        return this._requester.post(registerUrl, this.authorizationService.getHeaders(), data);
    }

    loginUser(data){
        let loginUrl= kinveyBaseUrl + "user/" + kinveyAppKey + '/login';
        return this._requester.post(loginUrl, this.authorizationService.getHeaders(), data);
    }
}