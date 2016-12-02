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
    }

    else {
        //No logged in user
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListBooks').hide();
        $('#linkLogout').hide();
    }
}

function showLoginView() {
    showView('viewLogin');
    $('#formLogin').trigger('reset');
}

function showRegisterView() {
    $('#formRegister').trigger('reset');
    showView('viewRegister');
}

function createBookView() {
    if(sessionStorage.getItem('authToken')) {
        $('#formCreateBook').trigger('reset');
        showView('viewCreateBook');
    }
    else{
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }
}