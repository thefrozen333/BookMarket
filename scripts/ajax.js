/**
 * Created by Soldier on 12/2/2016.
 */
//books/all
function listBooks() {
    $('#formSearchName').trigger('reset');
    $('#formSearchPageCount').trigger('reset');
    $('#formSearchGenre').trigger('reset');
    $('#books').empty();
    showView('viewBooks');

    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
        headers: getKinveyUserAuthHeaders(),
        success: loadBooksSuccess,
        error: handleAjaxError
    });

    function loadBooksSuccess(books) {
        showInfo('Accessing the library!');
        if (books.length == 0){
            $('#books').text('No books in the library.');
        }
        else{
            let table = $('<table>').attr('id', 'myTable')
                .append(($("<tr>")
                    .append('<th>Cover</th><th>Title</th><th>Genre</th><th>Page count</th><th>Read book</th>')));
            books = books.reverse();
            for(let book of books){
                appendBookRow(book, table);
                $('#books').append(table);
            }
            $('#myTable').page(3)
        }
    }
}
//books/searched by name
function searchName(event) {
    event.preventDefault();
    $('#searchedByNameBooks').empty();

    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
        headers: getKinveyUserAuthHeaders(),
        success: loadBooksSuccess,
        error: handleAjaxError
    });

    function loadBooksSuccess(books) {
        let table = $('<table>').attr('id', 'mySearchNameTable')
            .append(($("<tr>")
                .append('<th>Cover</th><th>Title</th><th>Genre</th><th>Page count</th><th>Read book</th>')));
        books = books.reverse();
        for (let book of books) {
            let nameFromSearchForm = $('#formSearchName input[name=searchBox]').val().toLowerCase();
            if (book.name.toLowerCase() == nameFromSearchForm) {
                appendBookRow(book, table);
            }
            $('#searchedByNameBooks').append(table);
        }
        if ($('#searchedByNameBooks td').length == 0) {
            showError('No books with that name found, did you mean some of the following books');
            for (let book of books) {
                if (book.name[0].toLowerCase() == $('#formSearchName input[name=searchBox]').val()[0].toLowerCase()) {
                    appendBookRow(book, table);
                }
                $('#searchedByNameBooks').append(table);
            }
            $('#mySearchNameTable').page(3);
        }

        if ($('#searchedByNameBooks td').length == 0) {
            showError("No book by this name found and no similar books either");
            return;
        }
        showInfo('Search loaded');
        showView('viewSearchedByNameBooks');
    }
}
//books/searched by page count
function searchPageCount(event) {
    event.preventDefault();
    $('#searchedByPageCountBooks').empty();

    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
        headers: getKinveyUserAuthHeaders(),
        success: loadBooksSuccess,
        error: handleAjaxError
    });

    function loadBooksSuccess(books) {

        let table = $('<table>').attr('id', 'mySearchPageCountTable')
            .append(($("<tr>")
                .append('<th>Cover</th><th>Title</th><th>Genre</th><th>Page count</th><th>Read book</th>')));
        books = books.reverse();
        for (let book of books) {
            let fromNumber = $('#formSearchPageCount input[name=fromNumber]').val();
            let toNumber = $('#formSearchPageCount input[name=toNumber]').val();
            let bookNumber = Number(book.pageCount);

            if(bookNumber >= Number(fromNumber) && bookNumber <= Number(toNumber)) {
                appendBookRow(book, table);
            }
            $('#searchedByPageCountBooks').append(table);
        }

        if ($('#searchedByPageCountBooks td').length == 0) {
            showError('There are no books between this range.');
            return;
        }
        showInfo('Search loaded');
        showView('viewSearchedByPageCount');

        $('#mySearchPageCountTable').page(3)
    }
}
//books/searched by genre
function searchGenre(event) {
    event.preventDefault();
    $('#searchedByGenre').empty();

    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
        headers: getKinveyUserAuthHeaders(),
        success: loadBooksSuccess,
        error: handleAjaxError
    });

    function loadBooksSuccess(books) {
        let table = $('<table>').attr('id', 'mySearchGenreTable')
            .append(($("<tr>")
                .append('<th>Cover</th><th>Title</th><th>Genre</th><th>Page count</th><th>Read book</th>')));
        books = books.reverse();
        for (let book of books) {
            let genreFromForm = $('#formSearchGenre input[name=searchBox]').val().toLowerCase();
            if(book.genre.toLowerCase() == genreFromForm) {
                appendBookRow(book, table);
            }
            $('#searchedByGenre').append(table);
        }
        if ($('#searchedByGenre td').length == 0){
            showError('No books found with this genre.');
            return;
        }
        showInfo('Search loaded');
        showView('viewSearchedByGenre');
        $('#mySearchGenreTable').page(3);
    }
}
//appending desired book to table
function appendBookRow(book, table) {

    let pdfLink = $('<a>').attr("href", book.bookFile);
    pdfLink.text('[View Book]');
    let image = $('<img>').attr("src", book.image);

    table.append($('<tr>').append(
        $('<td>').append(image),
        $('<td>').text(book.name),
        $('<td>').text(book.genre),
        $('<td>').text(book.pageCount),
        $('<td>').append(pdfLink)
    ));
}
//creating book/uploading file to google storage then taking the download link
// and posting it in different collection with other properties
function createBook(event) {

    event.preventDefault();
    //Initialize variables
    let pdfFile = document.getElementById('pdfFile').files[0];
    let imageFile = document.getElementById('imageFile').files[0];

//Error handling
    if ($('#formCreateBook input[name=pageCount]').val() <= 0) {
        showError('Page count must be greater than zero.');
        return;
    }

    if (imageFile.size > 100000) {
        showError("File size is too big to be a cover of a book, must be less than 100kb.");
        return;
    }

    if (pdfFile.type !== "application/pdf") {
        showError("Book type is not PDF.");
        return;
    }

    if (imageFile.type !== "image/jpeg") {
        showError("Image type is not jpeg.");
        return;
    }


//Uploading pdf file and image file and getting downloadURLS + AJAX all in one :D
    if (pdfFile) {
        let metadata = {
            mimeType: pdfFile.type,
            size: pdfFile.size,
            public: true
        };
        let promise = Kinvey.Files.upload(pdfFile, metadata).then(function (file) {
            let secondPromise = Kinvey.Files.stream(file._id)
                .then(function (file) {
                    let pdf = file._downloadURL;

                    if (imageFile) {
                        let metadata = {
                            mimeType: imageFile.type,
                            size: imageFile.size,
                            public: true
                        };
                        let imagePromise = Kinvey.Files.upload(imageFile, metadata).then(function (file) {
                            let imageSecond = Kinvey.Files.stream(file._id)
                                .then(function (file) {

                                    let image = file._downloadURL;

                                    let bookData = {
                                        bookFile: pdf,
                                        image: image,
                                        name: $('#formCreateBook input[name=name]').val(),
                                        genre: $('#genre option:selected').val(),
                                        pageCount: $('#formCreateBook input[name=pageCount]').val()
                                    };

                                    $.ajax({
                                        method: "POST",
                                        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
                                        headers: getKinveyUserAuthHeaders(),
                                        data: bookData
                                    }).then(function (response) {
                                        listBooks();
                                        showView('viewBooks')
                                    });
                                })
                        })
                    }
                })
        }).catch(handleAjaxError);
    }
}



