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
        this.searchPageCount = this.searchPageCount.bind(this);
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
        let _self = this;
        let genreFilter = this.view.searchGenre();
        this.model.searchGenre(genreFilter)
            .then(_self.view.renderSearchedBooks(data))
            .catch((error) => {
                handleAjaxError(error)
            });
    }

    searchPageCount() {
        let _self = this;
        let pageCountFilter = this.view.searchPageCount();
        this.model.searchPageCount(pageCountFilter)
            .then(_self.view.renderSearchedBooks(data))
            .catch((error) => {
                handleAjaxError(error)
            });
    }

    searchName() {
        let _self = this;
        let nameFilter = this.view.searchName();
        this.model.searchName(nameFilter)
            .then(_self.view.renderSearchedBooks(data))
            .catch((error) => {
                handleAjaxError(error)
            });
    }

}
