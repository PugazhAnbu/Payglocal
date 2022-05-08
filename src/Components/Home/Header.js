import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Filter from './Filter'
function Header(props) {



    const { pageSize, booksList, setTrimData, page, searchTerm, setSearchTerm, openPopup, setOpenPopup, applyCount } = props;

    useEffect(() => {
        if (searchTerm === "") {

            let startValue = (0) * pageSize;
            console.log("startValue", startValue);
            let EndValue = startValue + pageSize;
            console.log("EndValue", EndValue);
            let slicedData = ([...booksList]?.slice(startValue, EndValue));

            setTrimData(slicedData);
            // console.log("this is trim data")
            // console.log("trimData", trimData);

        } else {

            let filteredData = (booksList.filter(item => {
                // console.log(item)
                return Object.keys(item?.volumeInfo).some(key =>
                    item?.volumeInfo[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            }));

            console.log("filteredData", filteredData)
            if (filteredData.length > pageSize) {
                let startValue = (page - 1) * pageSize;
                console.log("startValue", startValue);
                let EndValue = startValue + pageSize;
                console.log("EndValue", EndValue);
                let slicedData = (filteredData?.slice(startValue, EndValue));

                setTrimData(slicedData);

            } else {
                setTrimData(filteredData);

            }
        }



    }, [searchTerm]);

    const togglePopup = () => {
        setOpenPopup(!openPopup);
    }


    return (
        <div className='header'>

            <button className='btn mr-btn' onClick={togglePopup}>{applyCount === 0 ? "" : applyCount} Filter</button>
            <Filter togglePopup={togglePopup} props={props} />

            <div className='search-container'>
                <input type="search" placeholder='Search by Name, author, Genre..etc' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}>
                </input>

                <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}

export default Header