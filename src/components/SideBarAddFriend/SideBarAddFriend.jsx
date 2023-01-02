import React, { useEffect, useState } from 'react'
import './SideBarAddFriend.css'
import { BiArrowBack } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import UserSearched from '../UserSearched/UserSearched'
import { collection, query, where, getDocs, db } from '../../Firebase/Firebase'


const SideBarAddFriend = () => {

    const [inputVal, setInputVal] = useState('');
    const [value, setValue] = useState();
    const [searchFriend, setSearchFriend] = useState(false);
    const [fetchedData, setFetchedData] = useState();
    const [noUserFound, setNoUserFound] = useState(true);
    const [flag, setFlag] = useState(false);

    const userStore = useSelector((state) => state.userStore)

    useEffect(() => {
        setSearchFriend(false)

        async function fetchData() {

            const q = query(collection(db, "users"), where('phoneNumber', "==", `+${value}`));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.id !== userStore.user.uid) {
                    setSearchFriend(true)
                    setFetchedData({ id: doc.id, data: doc.data() })
                    setNoUserFound(true)
                }
            });

        }
        fetchData()
    }, [flag])

    const dispatch = useDispatch();


    const bool = false;

    const friendSearched = (flag, status) => {
        if (inputVal) {
            if (inputVal.length === 12 && flag) {
                setValue(inputVal);
                setNoUserFound(false)
                setFlag((e) => !e)
            }
            else if (status === 'added') {
                setInputVal('');
                setSearchFriend(false)
                setValue('');
            }
            else if (status === 'declined') {
                setInputVal('');
                setSearchFriend(false)
                setValue('');
            }
            else if (inputVal.length < 12) {
                setNoUserFound(false)
                setSearchFriend(false)
            }
            else {
                setSearchFriend(false)
                setInputVal('')
                setNoUserFound(true)
            }
        }
    }

    const gettingPhoneNumber = event => event.target.value.length === 13 ? null : setInputVal(event.target.value);

    return (
        <div className='sideBarAddFriend'>
            <div className="goBack"><BiArrowBack onClick={() => dispatch({ type: 'ADDFRIENDTOGGLE', bool })} /> <span>Go back</span></div>
            <div className="addFriendBox">
                <form onSubmit={(event) => { event.preventDefault(); friendSearched(true) }}>
                    <div className="addFriendInput"><AiOutlineSearch onClick={() => friendSearched(true)} /><input value={inputVal} className='friendSearch' onChange={gettingPhoneNumber} type="number" placeholder='92xxxxxxxxxx' /></div>
                </form>
                {searchFriend ? <UserSearched data={fetchedData.data} friendSearched={friendSearched} /> : ''}
                {!noUserFound && <div className="noUserFound">No User Found</div>}
            </div>
        </div>
    )
}

export default SideBarAddFriend