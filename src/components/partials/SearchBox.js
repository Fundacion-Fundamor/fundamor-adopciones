import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './searchBox.scss'

/**Text input utilizado para la busqueda
 * 
 * @param {*} param0 
 * @returns 
 */
export default function SearchBox({ handleSearch,placeholder="" }) {

    const [value, setValue] = useState("")
    return (<div className="search-wrapper" style={{ position: "relative" }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch("search", value) }}>
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} id="search-field" placeholder={placeholder} />
            <button type="button" onClick={() => handleSearch("search", value)}><AiOutlineSearch size={20} /></button>
        </form>
    </div>)
}