/**
 * Created by Soldier on 12/2/2016.
 */
function showInfo(message){
    $('#infoBox').text(message);
    $('#infoBox').show();
    setTimeout(function () {
        $('#infoBox').fadeOut();
    }, 3000)
}

function showError(errorMsg) {
    $('#errorBox').text("Error: " + errorMsg);
    $('#errorBox').show();
    setTimeout(function () {
        $('#errorBox').fadeOut();
    }, 3000)
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if(response.readyState === 0){
        errorMsg = "Cannot connect due to network error."
    }

    if(response.responseJSON && response.responseJSON.description){
        errorMsg = response.responseJSON.description;
    }
    showError(errorMsg)
}

function saveAuthInSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    $("#loggedUser").text(username);
}