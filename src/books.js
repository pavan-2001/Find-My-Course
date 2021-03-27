import { ContactlessOutlined } from '@material-ui/icons';
import React, {useState, useEffect, Fragment} from 'react';
import {fetchBooks} from './api';

export default function Books() {
    const [books, setBooks] = useState([]);
        const getBooks = () => {
            fetchBooks('python').then((result) => setBooks(result));
        };
        const listItems = books.map((d) => (
            <li key={d.volumeInfo.title}>
                {d.volumeInfo.title}
            </li>
        ));
        
        return (
            <Fragment>
            <button onClick={getBooks}>Click</button>
            <div>
                {listItems}
            </div>
            </Fragment>
        );

}