/**
 * Created by Soldier on 11/29/2016.
 */
function startApp(){
    sessionStorage.clear();
    showHideMenuLinks();


    if(sessionStorage.getItem('authToken')) {
        showView('viewBooks');
    }
    //No logged in user
    else{
        showView('viewHome');
    }

    //Bind the navigation menu links
    $('#linkHome').click(showHomeView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkCreateBook').click(createBookView);
    $('#linkListBooks').click(listBooks);
    $('#linkLogout').click(logout);

    //Bind the form submit buttons
    $('#formLogin').submit(loginUser);
    $('#formRegister').submit(registerUser);
    $('#formCreateBook').submit(createBook);
    $('#formSearchName').submit(searchName);
    $('#formSearchPageCount').submit(searchPageCount);
    $('#formSearchGenre').submit(searchGenre);
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

}
