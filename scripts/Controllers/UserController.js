class UserController{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.logout = this.logout.bind(this);
    }


    registerUser(event){
        event.preventDefault();

        let userObject = this.view.getDataFromRegister();
        this.model.registerUser(userObject).then((data) => {
            saveAuthInSession(data);
            showHideMenuLinks();
            showHomeView();
        }).catch((error) =>{
            handleAjaxError(error);
        });
    }

    loginUser(event){
        event.preventDefault();
        let userObject = this.view.getDataFromLogin();
        console.log(userObject);
        this.model.loginUser(userObject).then((data) => {
            saveAuthInSession(data);
            showHideMenuLinks();
            showHomeView();
        }).catch((error) =>{
            handleAjaxError(error);
        });
    }


    logout() {
        sessionStorage.clear();
        Kinvey.User.logout();
        showHideMenuLinks();
        showView('viewHome');
        $('#formLogin').trigger('reset');
        showInfo("Logout successful.");
   }
}
