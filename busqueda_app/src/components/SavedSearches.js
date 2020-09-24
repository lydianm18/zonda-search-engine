import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

const SavedSearches = (props) => {
    console.log(props)

    const [savedSearchedA, setSavedSearchedA] = useState(null);

    useEffect(() => {

    }, [props.params])

    return (
        <div className="sk-panel filter--searches">
            <div className="sk-panel__header">Saved Searches</div>
            <div className="sk-panel__content">
                <p><a href={props.params} className="saved-search-link">Last Search 1</a></p>
                <p><a href="" className="saved-search-link">Last Search 2</a></p>
                <p><a href="" className="saved-search-link">Last Search 3</a></p>
            </div>
        </div>
    )
}

export default SavedSearches
