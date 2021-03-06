/*Everything is ready just renders
and client-side checks.
 */
class BookViews {
    constructor() {

    }

    //view
    drawBooks(books) {
        $("#books").empty();
        showInfo('Books loaded');
        if (books.length == 0) {
            $('#books').text('No books in the library.');
        }
        else {
            let table = $('<table>').attr('id', 'myTable')
                .append(($("<tr>")
                    .append('<th>Cover</th><th>Title</th><th>Genre</th><th>Page count</th><th>Read book</th>')));
            books = books.reverse();
            for (let book of books) {
                this.appendBookRow(book, table);
                $('#books').append(table);
            }
            $('#myTable').page(3)
        }
    }


//appending desired book to table
    appendBookRow(book, table) {

        let pdfLink = $('<a>').attr("href", book.bookFile);
        pdfLink.text('[View Book]');
        let imageFile = $('<img>').attr("src", book.image);

        table.append($('<tr>').append(
            $('<td>').append(imageFile),
            $('<td>').text(book.name),
            $('<td>').text(book.genre),
            $('<td>').text(book.pageCount),
            $('<td>').append(pdfLink)
        ));
    }


    getSearchGenre() {
        return $('#inputGenreSearch').val();
    };


    searchName(event) {
        return $('#inputNameSearch').val();
    };



    renderSearchedBooksByName(books) {
        $("#searchedByNameBooks").empty();
        let table = $('<table>').attr('id', 'mySearchNameTable')
            .append(($("<tr>")
                .append('<th>Cover</th><th>Title</th><th>Genre</th><th>Page count</th><th>Read Book</th>')));

        books = books.reverse();

        for (let book of books)
            this.appendBookRow(book, table);

        $('#searchedByNameBooks').append(table);
        $('#mySearchNameTable').page(3);
    }

    renderSearchedBooksByCategory(books) {
        $("#searchedByGenre").empty();
        let table = $('<table>').attr('id', 'mySearchNameTable')
            .append(($("<tr>")
                .append('<th>Cover</th><th>Title</th><th>Genre</th><th>Page count</th><th>Read Book</th>')));

        books = books.reverse();

        for (let book of books)
            this.appendBookRow(book, table);

        $('#searchedByGenre').append(table);
        $('#mySearchNameTable').page(3);
    }


    getImg() {
        let file = document.getElementById('imageFile').files[0];

        if (file.size > 100000) {
            showError("File size is too big to be a cover of a book, must be less than 100kb.");
            return;
        }

        if (file.type !== "image/jpeg") {
            showError("Image type is not jpeg.");
            return;
        }

        if (file) {
            let metadata = {
                mimeType: file.type,
                size: file.size,
                public: true
            };
            let fileAndMetadata = [file, metadata];
            return fileAndMetadata;
        }
    }

    getPDF() {
        let file = document.getElementById('pdfFile').files[0];

        if (file.type !== "application/pdf") {
            showError("Book type is not PDF.");
            return;
        }

        if (file) {
            let metadata = {
                mimeType: file.type,
                size: file.size,
                public: true
            };

            let fileAndMetadata = [file, metadata];
            return fileAndMetadata;
        }
    }

    validatePageCount(){
        if ($('#formCreateBook input[name=pageCount]').val() <= 0) {
            showError('Page count must be greater than zero.');
            return;
        }
    }
}