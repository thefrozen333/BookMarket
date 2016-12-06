/* - Knows about model and view.Passes data between them(both ways)
 - performs the then/catch functionality and binds events to buttons
 */
class BookController{
    constructor(model,view){
        this.model = model;
        this.view = view;

        this.getBook = this.getBook.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.createBook = this.createBook.bind(this);
        this.searchGenre = this.searchGenre.bind(this); 
        this.searchName = this.searchName.bind(this);
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

    createBook(event){
        event.preventDefault();
        let _self = this;
        let pdfAndMetadata = this.view.getPDF();
        let imageAndMetadata = this.view.getImg();
        this.view.validatePageCount();
        this.model.uploadFile(pdfAndMetadata[0],pdfAndMetadata[1])
            .then((file) => {
               _self.model.streamFile(file._id)
                    .then((file) => {
                        let bookFile = file._downloadURL;
                        _self.model.uploadFile(imageAndMetadata[0], imageAndMetadata[1])
                            .then((file) => {
                                _self.model.streamFile(file._id)
                                    .then((file) => {
                                    let imageFile = file._downloadURL;

                                    let bookData = {
                                        bookFile: bookFile,
                                        image: imageFile,
                                        name: $('#formCreateBook input[name=name]').val(),
                                        genre: $('#genre option:selected').val(),
                                        pageCount: $('#formCreateBook input[name=pageCount]').val()
                                    };
                                    _self.model.postBook(bookData)
                                        .then(_self.getBooks())
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

    searchGenre(event) {
        event.preventDefault();
        let _self = this;
        let genreFilter = this.view.getSearchGenre();
        this.model.searchGenre(genreFilter)
            .then((data) => {
                $('#formSearchGenre').trigger('reset');
                showView("viewSearchedByGenre");
                _self.view.renderSearchedBooksByGenre(data)
            })
            .catch((error) => {
                handleAjaxError(error)
            });
    }


    searchName(event) {
        event.preventDefault();
        let _self = this;
        let nameFilter = this.view.getSearchName();
        this.model.searchName(nameFilter)
            .then((data) => {
            $('#formSearchName').trigger('reset');
            showView("viewSearchedByNameBooks");
            _self.view.renderSearchedBooksByName(data)
        })
            .catch((error) => {
                handleAjaxError(error)
            });
    }

}
