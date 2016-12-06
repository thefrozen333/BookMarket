//sessionStorage.setItem('authToken', btoa('test1:test1'));
function startApp () {
    const kinveyAppKey = "kid_BkyF2NyXg";
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppSecret = "9aaf3e7a620c4606874886e97c1795a6";

    Kinvey.init({
        appKey: kinveyAppKey,
        appSecret: kinveyAppSecret
    });
//Vodi do zaguba na sesssiona sled redirektvane prez View books
/*    sessionStorage.clear();*/
    let requester = new Requester();
    let authenticationService = new AuthenticationService(kinveyAppKey,kinveyAppSecret);

    let bookViews = new BookViews();
    let bookModel = new BookModel(kinveyBaseUrl,kinveyAppKey,requester,authenticationService);
    let userViews = new UserView();
    let userModel = new UserModel(kinveyBaseUrl,kinveyAppKey,requester,authenticationService);

    let bookController = new BookController(bookModel,bookViews);
    let userController = new UserController(userModel,userViews);

    //Bind the navigation menu links
    $('#linkHome').click(showHomeView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click( () => {showView("viewRegister")});
    $('#linkCreateBook').click( () => {showView("viewCreateBook")});
    $('#linkListBooks').click(bookController.getBooks);
    $('#linkLogout').click(userController.logout);

    //Bind the form submit buttons
    $('#formLogin').submit(userController.loginUser);
    $('#formRegister').submit(userController.registerUser);
    $('#formCreateBook').submit(bookController.createBook);
    $('#formSearchName').submit(bookController.searchName);
    $('#formSearchPageCount').submit(bookController.searchPageCount);
    $('#formSearchGenre').submit(bookController.searchGenre);
    $("#homeJumbotronButton").click(function(){
        if(sessionStorage.getItem('authToken')) {
            showView('viewBooks');
        }
        //No logged in user
        else{
            showView('viewLogin');
        }
    })

    //Bind the info error boxes
    $('#infoBox, #errorBox').click(function () {
        $(this).fadeOut();
    });

    //Attach AJAX "loading" listener
    $(document).on({
        ajaxStart: function () { $('#loadingBox').show()},
        ajaxStop: function () { $('#loadingBox').hide()}
    });

    showHideMenuLinks();
    showView('viewHome');
}