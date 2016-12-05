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

        }).catch((error) => {
            handleAjaxError(error)
        })
    }

    getBooks(){

        let _self = this;
        this.model.getBooks().then((successData) => {
            showBooksView();
            _self.view.drawBooks(successData);
        }).catch((error) => {
            handleAjaxError(error)
        })
    }

    createBook(data){
        data.preventDefault();
        let pdfAndMetadata = this.view.getPDF();
        let imageAndMetadata = this.view.getImg();
        this.view.validatePageCount();
        this.model.uploadFile(pdfAndMetadata[0],pdfAndMetadata[1])
            .then((file) => {
                this.model.streamFile(file._id)
                    .then((file) => {
                        let bookFile = file._downloadURL;

                        this.model.uploadFile(imageAndMetadata[0], imageAndMetadata[1])
                            .then((file) => {
                                this.model.streamFile(file._id)
                                    .then((file) => {
                                    let imageFile = file._downloadURL;

                                    let bookData = {
                                        bookFile: bookFile,
                                        image: imageFile,
                                        name: $('#formCreateBook input[name=name]').val(),
                                        genre: $('#genre option:selected').val(),
                                        pageCount: $('#formCreateBook input[name=pageCount]').val()
                                    };
                                    this.model.postBook(bookData)
                                        .then(this.getBooks())
                                        .catch((error) => {
                                            handleAjaxError(error)
                                        });
                                }).catch((error) => {
                                    handleAjaxError(error)
                                });

                            }).catch((error) => {
                                handleAjaxError(error)
                            });
                    }).catch((error) => {
                        handleAjaxError(error)
                    });
            }).catch((error) => {
                handleAjaxError(error)
            });
    }

    searchGenre() {
        let genreFilter = this.view.searchGenre();
        this.model.searchGenre(genreFilter)
            .then(this.view.renderSearchedBooks(data))
            .catch((error) => {
                handleAjaxError(error)
            });
    }

    searchPageCount() {
        let pageCountFilter = this.view.searchPageCount();
        this.model.searchPageCount(pageCountFilter)
            .then(this.view.renderSearchedBooks(data))
            .catch((error) => {
                handleAjaxError(error)
            });
    }

    searchName() {
        let nameFilter = this.view.searchName();
        this.model.searchName(nameFilter)
            .then(this.view.renderSearchedBooks(data))
            .catch((error) => {
                handleAjaxError(error)
            });
    }

}
