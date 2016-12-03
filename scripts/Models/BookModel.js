/* - Different types of requests to the DB
  - Uses utility class requester and authorizationService
   - Doesn't know about controller just passes the data it gets to the controller
 */
class BookModel{
    constructor(baseUrl,appKey,requester, authorizationService){
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._authorizationService = authorizationService;
        this._requester = requester;
    }
    getBook(id){
        let requestUrl = this._baseUrl + 'appdata/' + this._appKey + '/books' + id;
        let requestHeaders = this._authorizationService.getHeaders();

        return this._requester.get(requestUrl, requestHeaders)
    }

    getBooks(){
        let requestUrl = this._baseUrl + 'appdata/' + this._appKey + '/books';
        let requestHeaders = this._authorizationService.getHeaders();

        return this._requester.get(requestUrl, requestHeaders)
    }

    postBook(data){
        let requestUrl = this._baseUrl + 'appdata/' + this._appKey + '/books';
        let requestHeaders = this._authorizationService.getHeaders();

        return this._requester.post(requestUrl, requestHeaders, data)
    }
}