import React from 'react'
import './SideBarSearch.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdFilterList } from 'react-icons/md'

const SideBarSearch = () => {
    return (
        <div className='sideBarSearch'>
            <div className="input"><div className="search"><AiOutlineSearch /></div><input placeholder='Search or start new chat' className='inputSearch' type="text" /></div>
            <div className="filter"><MdFilterList /></div>
        </div>
    )
}

export default SideBarSearch