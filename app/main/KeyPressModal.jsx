import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { KEYS } from './config';

const KeyPressModal = ({ isOpen, toggle, title, onSubmit }) => {
    const [waiting, setWaiting] = useState(true);
    const [selectedKey, setSelectedKey] = useState(true);
    const [modal, modalState, toggleModal] = useState();

    const handleModalSubmit = () => {
        onSubmit(selectedKey);
        toggle();
    }

    useEffect(() => {
        const onKeyDown = (e) => {
            console.log({ keyCode: e.keyCode, str: String(e.keyCode), mapped: KEYS[String(e.keyCode)] })
            setSelectedKey(KEYS[String(e.keyCode)]);
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => toggle()}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}><h2>{title}</h2>
            <p>Selected Key: {selectedKey}</p>
            <button className="float-right" onClick={handleModalSubmit}>Continue</button>
        </Modal>
    )
}

export default KeyPressModal
