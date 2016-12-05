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

    getBooks(){
        let getUrl = this._baseUrl + "appdata/" + this._appKey + "/books";

        return this._requester.get(getUrl, this._authorizationService.getHeaders());
    }

    postBook(data){
        let postUrl = this._baseUrl + "appdata/" + this._appKey + "/books";

        return this._requester.post(postUrl, this._authorizationService.getHeaders(),data);
    }

    uploadImg(img,metadata){
       return Kinvey.Files.upload(img, metadata);
    }

    secondUploadImg(imgId){
       return Kinvey.Files.stream(file._id);
    }

    getBookById(id) {
        let requestUrl = this._baseUrl + 'appdata/' + this._appKey + '/books/' + id;

        return this._requester.get(requestUrl, this._authorizationService.getHeaders())
    }

    searchGenre(filter) {
        let filterQuery = `?query={"genre":${filter}}`;
        let searchGenreUrl = this._baseUrl + "appdata/" + this._appKey + "/books/" + filterQuery;
        return this._requester.get(searchGenreUrl, this._authorizationService.getHeaders());
    };

    searchPageCount(filter) {
        let filterQuery = `?query={"age":{"$lte":${filter}}}`;
        let searchPageCountUrl = `${this._baseUrl} + appdata/ + ${this._appKey} + /books/` + filterQuery;
        return this._requester.get(searchPageCountUrl,this._authorizationService.getHeaders());
    };


    searchName(filter) {
        let filterQuery = `?query={"name":${filter}}`;
        let searchNameUrl = this._baseUrl + "appdata/" + this._appKey + "/books/" + filterQuery;
        return this._requester.get(searchNameUrl, this._authorizationService.getHeaders());
    };

}
