/*Everything is ready just renders
and client-side checks.
 */
class BookViews{
    constructor(){

    }
    //view
    viewBook(data){
        //view a book(detailed)
    }

    listBooks(data){
        data.forEach((entity) => {
            let booksDiv = $("<div class='book'></div>")
            booksDiv.append($(`<div>${entity.title}</div>`))
            booksDiv.append($(`<div>${entity.author}</div>`))
            booksDiv.append($(`<div>${entity.description}</div>`))
        })
    }
}