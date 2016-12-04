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
            showBooksView();
            _self.view.drawBooks(successData);
        }).catch((error) =>{
            console.log(error)
        })
    }

    createBook(data){
        let imageAndMetadata = this.view.getImg();
        this.model.uploadImg(imageAndMetadata[0],imageAndMetadata[1])
            .then((file) => {
                this.model.secondUploadImg(file._id)
            }).then((file) => {
            let imageText = file._downloadURL;

            if ($('#formCreateBook input[name=pageCount]').val() <= 0) {
                showError('Page count must be greater than zero.');
                return;
            }

            let bookData = {
                image: imageText,
                name: $('#formCreateBook input[name=name]').val(),
                genre: $('#genre option:selected').val(),
                pageCount: $('#formCreateBook input[name=pageCount]').val()
            };

            this.model.postBook(bookData)
                .then(this.getBooks());
        })
    }

    searchGenre() {
        let genreFilter = this.view.searchGenre();
        this.model.searchGenre(genreFilter).then(this.view.renderSearchedBooks(data));
    }

    searchPageCount() {
        let pageCountFilter = this.view.searchPageCount();
        this.model.searchPageCount(pageCountFilter).then(this.view.renderSearchedBooks(data));
    }

    searchName() {
        let nameFilter = this.view.searchName();
        this.model.searchName(nameFilter).then(this.view.renderSearchedBooks(data));
    }

}
