/**
 * Created by tonch on 04-Dec-16.
 */
class UserController{
    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    registerUser(){
        let userObjects = this.view.getDataFromLogin();
        this.model.registerUser(userObject);
    }

    loginUser(){
        let userObjects = this.view.getDataFromRegister();
        this.model.loginUser(userObject);
    }
}
