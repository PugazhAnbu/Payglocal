import React, { useState } from "react";


function Filter({ props, togglePopup }) {

    const { booksList, trimData, setTrimData, openPopup, applyCount, setApplyCount } = props;
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

    const applyCountRating = () => {
       applyCount = applyCount + 1;
    }
    // const lessthan3Rating = () => {
    //     const largerThanSixty = (booksList.filter(item => {

    //         return (item?.volumeInfo?.averageRating >  )
    //     }))
    // }
    
        

    console.log("filter", filtered);
    if (!openPopup) return null;


    const clickApplied = () => {
        let appendobject = [];
        var filteredData
        Object.values(filtered).forEach(val => {
            console.log(val);
            if (val) {

                filteredData = (booksList.filter(item => {
                    return (item?.volumeInfo?.categories?.toString().toLowerCase() === val.toLowerCase())
                    //return Object.keys(item?.volumeInfo).some(key => (item?.volumeInfo[key].toString().toLowerCase()).includes(val.toLowerCase()))
                }))
                console.log("speard filter values",filteredData);
                filteredData.forEach(val => {
                    appendobject.push(val);
                })
              
               
               
            }
        });
        setTrimData(appendobject);
        // console.log("filteredData", appendobject);
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
                                <label>
                                <input type="radio" id="rating1" key="3" name="choice" value="Less 3" /><span  onClick={applyCountRating} for="rating1">Less 3</span>
                                </label>
                                <label>
                                <input type="radio" id="rating2" key="4" name="choice" value="above 4"/><span onClick={applyCountRating} for="rating2">above 4</span>
                                </label>
                                <label>
                                <input type="radio" id="rating3" key="5" name="choice" value="5"/><span  onClick={applyCountRating} for="rating3">5</span>
                                </label>
                           
                        </ul>)
                        
                    }
                </div>
                <div className='genre'>
                    <h3 className="filter-heading" onClick={ShowDetails}>MultiSelect Genre Filter</h3>
                    {
                        isShow && (<ul className='ultag-genre'>

                            <li key="Fiction" onClick={handleChange} style={{backgroundColor:filtered.Fiction==="Fiction"?"orange":""}}>Fiction</li>
                            <li key="Cooking" onClick={handleChange} style={{backgroundColor:filtered.Cooking==="Cooking"?"orange":""}}>Cooking</li>
                            <li key="History" onClick={handleChange} style={{backgroundColor:filtered.History==="History"?"orange":""}}>History</li>
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