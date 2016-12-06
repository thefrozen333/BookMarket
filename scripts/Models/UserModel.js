/**
 * Created by tonch on 04-Dec-16.
 */
class UserModel {
    constructor(baseUrl, appKey, requester, authorizationService) {
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this.authorizationService = authorizationService;
        this.requester = requester;
    }
    registerUser(data){
        let registerUrl = this.baseUrl + "user/" + this.appKey;
        return this.requester.post(registerUrl, this.authorizationService.getHeaders(), data);
    }

    loginUser(data){
        let loginUrl= this.baseUrl + "user/" + this.appKey + '/login';
        return this.requester.post(loginUrl, this.authorizationService.getHeaders(), data);
    }
}