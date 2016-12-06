/**
 * Created by Soldier on 12/2/2016.
 */
function showView(viewName) {
    //Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();
}

function showHideMenuLinks() {
    $('#linkHome').show();
    if(sessionStorage.getItem('authToken')){
        //Logged in user
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkListBooks').show();
        $('#linkLogout').show();
        $('#linkCreateBook').show();
    }

    else {
        //No logged in user
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListBooks').hide();
        $('#linkLogout').hide();
        $('#linkCreateBook').hide();
    }
}

function showHomeView(){
    showView('viewHome');
}

function showBooksView(){
    $('#formSearchName').trigger('reset');
    $('#formSearchGenre').trigger('reset');
    showView('viewBooks');
}

function showLoginView(){
    $('#formLogin').trigger('reset');
    showView('viewLogin');
}
function showRegisterView(){
    $('#formRegister').trigger('reset');
    showView('viewRegister');
}

function showCreateBookView() {
    $('#formCreateBook').trigger('reset');
    showView('viewCreateBook');
}