import { Modal } from 'antd';
import { useRef, useState } from 'react';
import './ModalResetPass.css';
import { auth, sendPasswordResetEmail } from '../../Firebase/Firebase';

const ModalResetPass = ({ togglingModal, showModal }) => {

    const inputRef = useRef();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const [errorMessage, setErrorMessage] = useState(false);

    const handleOk = async () => {

        if (inputRef.current.value.match(emailRegex)) {

            await sendPasswordResetEmail(auth, inputRef.current.value)
                .then(() => {
                    showModal(false)
                    inputRef.current.value = "";
                })
                .catch((error) => {
                    setErrorMessage(true)
                    setTimeout(() => setErrorMessage(false), 2000)
                });

        }
        else {
            showModal(true)
            setErrorMessage(true)
            setTimeout(() => setErrorMessage(false), 2000)
        }
    };

    const handleCancel = () => {
        showModal(false)
        inputRef.current.value = "";
    };

    return (
        <>
            <Modal okText='Send' title="Enter your Email Address" open={togglingModal} onOk={handleOk} onCancel={handleCancel}>
                <div className='modalInput'>
                    <input ref={inputRef} type='text' placeholder='Enter your Email' />
                    {errorMessage && <p>*Email is incorrect</p>}
                </div>
            </Modal>
        </>
    );
};

export default ModalResetPass