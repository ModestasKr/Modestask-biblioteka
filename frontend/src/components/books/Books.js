import React, { useState, useEffect } from "react";
import {getBooks} from "../../api/libraries/apiLibraries"
import 'bootstrap/dist/css/bootstrap.min.css';



function Books() {
    const [books, setBooks] = useState([]);


    function getAllBooks() {
        getBooks().then((res) => {
          setBooks(res.data.data.book);
        });
      }


      useEffect(() => {
          getAllBooks();
          console.log(books);
      }, []);

      const book = books.map((item) => {
          const bookName = item.book
          const author = item.author
          const category = item.category
          const date = item.release_date
          return (
              <>
                <div>
                    <div>
                        <div className="Border border">
                            <div>
                                <p><b>Pavadinimas:</b> {bookName}</p>
                            </div>
                            <div>
                                <p><b>Autorius:</b> {author}</p>
                            </div>
                            <div>
                                <p><b>Kategorija:</b> {category}</p>
                            </div>
                            <div>
                                <p><b>Išleidimo data:</b> {date}</p>
                            </div>
                        </div>
                    </div>
                </div>
              </>
          )
      })
      return (
        <>
            {book}
        </>
      )
}

export default Books;
