/**
 * Created by Soldier on 11/29/2016.
 */
function startApp(){
    sessionStorage.clear();
    showHideMenuLinks();

    //Logged in user
    if(sessionStorage.getItem('authToken')) {
       showView('viewCreateBook');
   }
    //No logged in user
    else{
       showView('viewLogin');
   }

    //Bind the navigation menu links
    $('#linkHome').click(createBookView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkListBooks').click(bookRequester.listBooks);
    $('#linkLogout').click(logout);

    //Bind the form submit buttons
    $('#formLogin').submit(loginUser);
    $('#formRegister').submit(registerUser);
    $('#formCreateBook').submit(bookRequester.createBook);
    $('#formSearchName').submit(bookRequester.searchName);
    $('#formSearchPageCount').submit(bookRequester.searchPageCount);
    $('#formSearchGenre').submit(bookRequester.searchGenre);

    //Bind the info error boxes
    $('#infoBox, #errorBox').click(function () {
        $(this).fadeOut();
    });

    //Attach AJAX "loading" listener
    $(document).on({
       ajaxStart: function () { $('#loadingBox').show()},
       ajaxStop: function () { $('#loadingBox').hide()}
    });

}
