/**
 * Created by tonch on 04-Dec-16.
 */
class UserView{
    constructor(){

    }

   getDataFromLogin(){

        let username = $('#formLogin input[name=username]').val();
        let password = $('#formLogin input[name=passwd]').val();

        if (username.length < 5) {
            showError("Username must consist of at least 5 characters.");
            return;
        }

        if (password.length < 5) {
            showError("Password must consist of at least 5 characters.");
            return;
        }
        return  {
            username: username,
            password: password
        };
    }


   getDataFromRegister(){

        let username = $('#formRegister input[name=username]').val();
        let password = $('#formRegister input[name=passwd]').val();

        if (username.length < 5) {
            showError("Username must consist of at least 5 characters.");
            return;
        }

        if (password.length < 5) {
            showError("Password must consist of at least 5 characters.");
            return;
        }
            return  {
                username: username,
                password: password
            };
    }
}