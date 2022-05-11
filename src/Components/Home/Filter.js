import React, { useState } from "react";


function Filter({ props, togglePopup }) {

    const { booksList, setTrimData, pageSize, page, openPopup, totalpages, setTotalPages, applyCount, setApplyCount } = props;
    const initialValues = { Fiction: "", Cooking: "", History: "", }
    const [filtered, setFiltered] = useState(initialValues);
    const [isShowRating, setIsShowRating] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [ratingcount, setRatingcount] = useState(0);
    const [rating, setRating] = useState(0);
    const [filterText, setFilterText] = useState('');
    const handleChange = (e) => {

        const { innerHTML, outerText } = e.target;


        (applyCount < Object.values(filtered).length + 1) ? setApplyCount(applyCount + 1) : setApplyCount(Object.values(filtered).length)

        setFiltered({ ...filtered, [innerHTML]: outerText });


    }
    console.log("filtered", filtered)
    const applyCountRating = (e) => {
        console.log("event isShow", typeof (e.target.nextElementSibling.innerText), e, e.target.nextElementSibling.innerText)
        setRating(e.target.nextElementSibling.innerText);
        // setFilterText()
        if (ratingcount === 0) {
            setApplyCount(applyCount + 1);

            setRatingcount(ratingcount + 1);

        }
    }
    // const lessthan3Rating = () => {
    //     const largerThanSixty = 
    //     }))
    // }




    if (!openPopup) return null;



    const clickApplied = () => {
        let appendobject = [];
        var filteredData, ratingFilterarray
        if (applyCount === 0) {

            let startValue = (0) * pageSize;
            console.log("startValue", startValue);
            let EndValue = startValue + pageSize;
            console.log("EndValue", EndValue);
            let slicedData = ([...booksList]?.slice(startValue, EndValue));

            setTrimData(slicedData);
            // console.log("this is trim data")
            // console.log("trimData", trimData);

        } else if (rating > 0) {
            console.log(typeof (rating))
            if (parseInt(rating) === parseInt(3)) {
                console.log("rating", rating);
                ratingFilterarray = [...booksList].filter(item => {
                    return (parseInt(item?.volumeInfo?.averageRating) < parseInt(rating))
                })

            } else if (parseInt(rating) === parseInt(4)) {
                ratingFilterarray = [...booksList].filter(item => {
                    return (parseInt(item?.volumeInfo?.averageRating) > parseInt(rating))
                })
            } else {
                console.log("rating", rating);
                ratingFilterarray = [...booksList].filter(item => {
                    return (parseInt(item?.volumeInfo?.averageRating) <= parseInt(rating))
                })
            }
            ratingFilterarray.forEach(val => {
                appendobject.push(val);
            })
            //        console.log("appendobject.length", appendobject)
            console.log("appendobject.length", appendobject.length)
            if (appendobject.length > pageSize) {
                console.log("page is filter file", page)
                let startValue = (page - 1) * pageSize;
                console.log("startValue", startValue);
                let EndValue = startValue + pageSize;
                console.log("EndValue", EndValue);
                let slicedData = (appendobject?.slice(startValue, EndValue));
                let allpages = Math.ceil(appendobject.length / pageSize);
                setTotalPages(allpages);
                console.log("totalpages from filter file", totalpages);
                setTrimData(slicedData);

            } else {
                setTrimData(appendobject);

            }

        }
        else {


            Object.values(filtered).forEach(val => {
                console.log(val);
                if (val) {

                    filteredData = (booksList.filter(item => {
                        return (item?.volumeInfo?.categories?.toString().toLowerCase() === val.toLowerCase())
                        //return Object.keys(item?.volumeInfo).some(key => (item?.volumeInfo[key].toString().toLowerCase()).includes(val.toLowerCase()))
                    }))
                    console.log("speard filter values", filteredData);




                    if (rating > 0) {
                        console.log(typeof (rating))
                        if (parseInt(rating) === parseInt(3)) {
                            console.log("rating", rating);
                            ratingFilterarray = filteredData.filter(item => {
                                return (parseInt(item?.volumeInfo?.averageRating) < parseInt(rating))
                            })

                        } else if (parseInt(rating) === parseInt(4)) {
                            ratingFilterarray = filteredData.filter(item => {
                                return (parseInt(item?.volumeInfo?.averageRating) > parseInt(rating))
                            })
                        } else {
                            console.log("rating", rating);
                            ratingFilterarray = filteredData.filter(item => {
                                return (parseInt(item?.volumeInfo?.averageRating) < parseInt(rating))
                            })
                        }
                        ratingFilterarray.forEach(val => {
                            appendobject.push(val);
                        })
                        //        console.log("appendobject.length", appendobject)
                        console.log("appendobject.length", appendobject.length)
                        if (appendobject.length > pageSize) {
                            console.log("page is filter file", page)
                            let startValue = (page - 1) * pageSize;
                            console.log("startValue", startValue);
                            let EndValue = startValue + pageSize;
                            console.log("EndValue", EndValue);
                            let slicedData = (appendobject?.slice(startValue, EndValue));
                            let allpages = Math.ceil(appendobject.length / pageSize);
                            setTotalPages(allpages);
                            console.log("totalpages from filter file", totalpages);
                            setTrimData(slicedData);

                        } else {
                            setTrimData(appendobject);

                        }

                    } else {
                        filteredData.forEach(val => {
                            appendobject.push(val);
                        })
                        //       
                        setTrimData(appendobject);

                    }

                }
            });

            console.log("appendobject.length", appendobject)
            console.log("appendobject.length", appendobject.length)
            if (appendobject.length > pageSize) {
                console.log("page is filter file", page)
                let startValue = (page - 1) * pageSize;
                console.log("startValue", startValue);
                let EndValue = startValue + pageSize;
                console.log("EndValue", EndValue);
                let slicedData = (appendobject?.slice(startValue, EndValue));
                let allpages = Math.ceil(appendobject.length / pageSize);
                setTotalPages(allpages);
                console.log("totalpages from filter file", totalpages);
                setTrimData(slicedData);

            } else {
                setTrimData(appendobject);

            }
        }
        togglePopup();
    };



    const resetFilter = () => {
        setFiltered(initialValues);
        setApplyCount(0);
        setRatingcount(0);
        togglePopup();
    }

    const ShowDetails = () => {
        setIsShow(!isShow);
    }
    const ShowRatings = () => {
        setIsShowRating(!isShowRating);
    }



    return (
        <div className='popup-container'>
            <div className='popup-content'>

                <div className='genre'>
                    <h3 className="filter-heading" onClick={ShowRatings}>Ranting Range Filter</h3>
                    {
                        isShowRating && (<ul className='ultag-genre'>
                            <label style={{ backgroundColor: (rating.toString() === (3).toString()) ? "orange" : "" }} onClick={applyCountRating}>
                                <input type="radio" id="rating1" key="3" name="choice" value="Less 3" />Less<span htmlFor="rating1" value="3">3</span>
                            </label>
                            <label style={{ backgroundColor: (rating.toString() === (4).toString()) ? "orange" : "" }} onClick={applyCountRating}>
                                <input type="radio" id="rating2" key="4" name="choice" value="above 4" />above<span htmlFor="rating2" value="4">4</span>
                            </label>
                            <label style={{ backgroundColor: (rating.toString() === (5).toString()) ? "orange" : "" }} onClick={applyCountRating}>
                                <input type="radio" id="rating3" key="5" name="choice" value="5" />LessThan & equal<span htmlFor="rating3" value="5">5</span>
                            </label>

                        </ul>)

                    }
                </div>
                <div className='genre'>
                    <h3 className="filter-heading" onClick={ShowDetails}>MultiSelect Genre Filter</h3>
                    {
                        isShow && (<ul className='ultag-genre'>

                            <li key="Fiction" onClick={handleChange} style={{ backgroundColor: filtered.Fiction === "Fiction" ? "orange" : "" }}>Fiction</li>
                            <li key="Cooking" onClick={handleChange} style={{ backgroundColor: filtered.Cooking === "Cooking" ? "orange" : "" }}>Cooking</li>
                            <li key="History" onClick={handleChange} style={{ backgroundColor: filtered.History === "History" ? "orange" : "" }}>History</li>
                        </ul>)
                    }

                </div>
                <div className="pop-footer">
                    <button className="btn align-btn" onClick={resetFilter}>Reset</button>
                    <button className="btn align-btn" onClick={clickApplied}>Apply</button>
                </div>

            </div>
        </div>
    )

}
export default Filter;