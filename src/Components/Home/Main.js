import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './home.scss';


//import Components
import Footer from './Footer';
import Header from './Header';
function Main() {

    const [booksList, setBooksList] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [trimData, setTrimData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalpages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [applyCount, setApplyCount] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const fetchBooks = async () => {
        const response = await axios.get("https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&maxResults=40&key=AIzaSyA6xwmKeZ7AXmOv-5un7H4-kC5ZIPgUolA")
            .catch((error) => {
                console.log("Error", error);
            })
        console.log(response.data.items);
        setBooksList(response.data.items);
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    // useEffect(()=> {

    // },[trimData])
    const renderList = (book, index) => {
        //book.valumeinfo contains title author page .etc so we directly extract
        //retailPrice
        const { title, authors, saleInfo, averageRating, imageLinks, categories } = book.volumeInfo;


        return (

            <div key={index} className="card-horizontal">
                <div className="img-square-wrapper">

                    <a href={imageLinks?.thumbnail} rel="noreferrer" target="_blank" ><img src={imageLinks?.thumbnail} alt="Card cap" /></a>

                </div>

                <div className="card-body">
                    <li>BookName: <span> {title}</span> </li>
                    <li>Author:  <span> {authors}</span></li>
                    <li>Rating:  <span> {averageRating}</span></li>
                    <li>Genre:  <span> {categories}</span></li>
                    <li>Price: <span>{saleInfo?.saleability === "FOR_SALE" ? saleInfo?.retailPrice : "NOT_FOR_SALE"}</span></li>
                </div>

            </div>

        )
    }

    // Usage
    let props = {
        pageSize: pageSize,
        setPageSize: setPageSize,
        booksList: booksList,
        setBooksList: setBooksList,
        trimData: trimData,
        setTrimData: setTrimData,
        page: page,
        setPage: setPage,
        totalpages: totalpages,
        setTotalPages: setTotalPages,
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm,
        applyCount: applyCount,
        setApplyCount: setApplyCount,
        openPopup: openPopup,
        setOpenPopup: setOpenPopup


    }
    return (

        <div>
            <Header {...props} />
            <div className='Book-container'>
                {trimData.map(renderList)}
            </div>

            <Footer {...props} />
        </div>
    )

}

export default Main;