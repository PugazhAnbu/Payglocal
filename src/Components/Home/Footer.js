import React, { useEffect } from 'react'

function Footer(props) {

    // console.log(props)
    const { pageSize, setPageSize, booksList, trimData, setTrimData, page, setPage, totalpages, setTotalPages, searchTerm, applyCount } = props;

    const Pagination = () => {
        if (searchTerm === "" || applyCount === 0) {
            setPage(1);
            console.log("pageSize", pageSize)
            let trimStart = (0) * pageSize;
            console.log("trimStart", trimStart);

            let trimEnd = trimStart + pageSize;
            console.log("trimEnd", trimEnd);
            let slicedData = ([...booksList].slice(trimStart, trimEnd));
            // console.log("slicedData", slicedData)
            setTrimData(slicedData);
            // console.log("BookList Pagination length", booksList.length)
            let allpages = Math.ceil(booksList.length / pageSize);
            setTotalPages(allpages);
            console.log("trimData", trimData);
            console.log("totalpages", totalpages);
        }
        // when searchTerm contain string at the same time change the page size that time we need to calculate our total pages bcoz we need to hide next buttton
        else {
            let allpages = Math.ceil(trimData.length / pageSize);
            setTotalPages(allpages);
            console.log("totalpages", totalpages);
        }

    }
    useEffect(() => {
        Pagination()

    }, [booksList, pageSize])

    useEffect(() => {
        slicePageData()
    }, [])

    function slicePageData(page) {

        setPage(page)
        console.log("page", page, totalpages);
        if (page < totalpages) {
            let startValue = (page - 1) * pageSize;
            console.log("startValue", startValue);
            let EndValue = startValue + pageSize;
            console.log("EndValue", EndValue);
            let slicedData = ([...booksList]?.slice(startValue, EndValue));

            setTrimData(slicedData);
            // console.log("this is trim data")
            // console.log("trimData", trimData);
        }


    }


    return (
        <div className='footer-container'>
            <span>
                <select className='page-selection' value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)) }}>
                    {
                        [10, 15, 20, 25].map(pageSize => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))
                    }

                </select> Entries Per Page</span>
            <div className='footer-button'>

                {
                    page > 1 ?
                        (
                            <button onClick={() => { slicePageData(page - 1) }}>Prev</button>
                        ) : (
                            null
                        )
                }

                {
                    page < totalpages ?
                        (
                            <button onClick={() => { slicePageData(page + 1) }}>Next</button>
                        ) : (
                            null
                        )
                }

            </div>
        </div>
    )
}

export default Footer