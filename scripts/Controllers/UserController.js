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

        if (userObject.username.length < 5) {
            showError("Username must consist of at least 5 characters.");
            return;
        }

        if (userObject.password.length < 5) {
            showError("Password must consist of at least 5 characters.");
            return;
        }
        
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
           
        sessionStorage.clear();
        Kinvey.User.logout();
        
        let userObject = this.view.getDataFromLogin();

        if (userObject.username.length < 5) {
            showError("Username must consist of at least 5 characters.");
            return;
        }

        if (userObject.password.length < 5) {
            showError("Password must consist of at least 5 characters.");
            return;
        }
        
        let promise = Kinvey.User.login(userObject.username, userObject.password)
            .then(function(data){
                saveAuthInSession(data);
                showHideMenuLinks();
                showHomeView();
            })
            .catch(handleAjaxError);
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
