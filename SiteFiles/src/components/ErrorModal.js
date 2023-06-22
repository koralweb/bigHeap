import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import error from "../mobx/error";
import {observer} from "mobx-react-lite";

function ErrorModal() {

    return (
        <>
            <Modal show={true}>
                <Modal.Header closeButton onHide={() => location.reload()}>
                    <Modal.Title>{error.errorText || 'Ошибка соединения с сервером'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{!error.errorText && `Проверьте соединение с интернетом и попробуйте перезагрузить страницу!`}</Modal.Body>
            </Modal>
        </>
    );
}

export default observer(ErrorModal)
