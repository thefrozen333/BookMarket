//sessionStorage.setItem('authToken', btoa('test1:test1'));
(function () {
    const kinveyAppKey = "kid_BkyF2NyXg";
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppSecret = "9aaf3e7a620c4606874886e97c1795a6";

    sessionStorage.clear();
    showHideMenuLinks();

    let requester = new Requester();
    let authenticationService = new AuthenticationService(kinveyAppKey,kinveyAppSecret);

    let bookViews = new BookViews();
    let bookModel = new BookModel(kinveyBaseUrl,kinveyAppKey,requester,authenticationService);
    let userViews = new UserViews();
    let userModel = new UserModel(kinveyBaseUrl,kinveyAppKey,requester,authenticationService);
    let bookController = new BookController(bookModel,bookViews);
    let userController = new UserController(userModel,userViews);

    sessionStorage.clear();
    showHideMenuLinks();
    showView('linkHome');
})();