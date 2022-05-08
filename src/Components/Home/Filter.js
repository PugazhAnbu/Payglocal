import React, { useState } from "react";


function Filter({ props, togglePopup }) {

    const { booksList, setTrimData, openPopup, applyCount, setApplyCount } = props;
    const initialValues = { Fiction: "", Cooking: "", History: "" }
    const [filtered, setFiltered] = useState(initialValues);
    const [isShowRating, setIsShowRating] = useState(false);
    const [isShow, setIsShow] = useState(false);
    console.log("this is from filter function")
    const handleChange = (e) => {
        console.log(e)
        const { innerHTML, outerText } = e.target;

        (applyCount < Object.values(filtered).length) ? setApplyCount(applyCount + 1) : setApplyCount(Object.values(filtered).length)

        setFiltered({ ...filtered, [innerHTML]: outerText });


    }
    console.log("filter", filtered);
    if (!openPopup) return null;


    const clickApplied = () => {
        var filteredData
        Object.values(filtered).forEach(val => {
            console.log(val);
            if (val) {

                filteredData = (booksList.filter(item => {

                    return Object.keys(item?.volumeInfo).some(key => (item?.volumeInfo[key].toString().toLowerCase()).includes(val.toLowerCase()))
                }))
            }
        });
        setTrimData(filteredData);
        console.log("filteredData", filteredData)
        togglePopup();
    }
    const resetFilter = () => {
        setFiltered(initialValues);
        setApplyCount(0);
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

                <div className='rating'>
                    <h3 className="filter-heading" onClick={ShowRatings}>Ranting Range Filter</h3>
                    {
                        isShowRating && (<ul className='ultag-genre'>

                            <li key="3" onClick={handleChange}>Less 3</li>
                            <li key="4" onClick={handleChange}>above 4</li>
                            <li key="5" onClick={handleChange}>5</li>
                        </ul>)
                    }
                </div>
                <div className='genre'>
                    <h3 className="filter-heading" onClick={ShowDetails}>MultiSelect Genre Filter</h3>
                    {
                        isShow && (<ul className='ultag-genre'>

                            <li key="Fiction" onClick={handleChange}>Fiction</li>
                            <li key="Cooking" onClick={handleChange}>Cooking</li>
                            <li key="History" onClick={handleChange}>History</li>
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