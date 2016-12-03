/* - Knows about model and view.Passes data between them(both ways)
 - performs the then/catch functionality and binds events to buttons
 */
class BookController{
    constructor(model,view){
        this.model = model;
        this.view = view;
    }
    getBook(id){
        let _self = this;
        this.model.getBook(id).then((successData) => {

        }).catch((error) =>{
            console.log(error)
        })
    }

    getBooks(){
        let _self = this;
        this.model.getBooks().then((successData) => {
            _self.view.listBooks(successData);
        }).catch((error) =>{
            console.log(error)
        })
    }

    createBook(data){
        this.model.postBook(data).then((successData) => {
            console.log("Success");
        }).catch((error) =>{
            console.log(error)
        })
    }
}