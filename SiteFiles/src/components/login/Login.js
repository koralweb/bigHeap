import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import md5 from "js-md5";
import error from "../../mobx/error";
import {observer} from "mobx-react-lite";
import screens from "../../mobx/screens";
import $api from "../../http";
import accessToken from "../../mobx/accessToken";

function Login() {
  const [show, setShow] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const errorExist = (err) => {
    screens.show('error')
    error.setErrorText(err)
  }


  const handleClose = () => {}
  const enter = async () => {
    try {
      const response = await $api.post(`/authorizationRequest`, {
        login,
        password: md5(password)
      })

      const {data} = response

      if(data.error !== null) {
        errorExist(data.error)
        return
      }

      accessToken.change(data.accessToken)
      screens.show('content')
    }catch (e) {
      console.log(e)
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="email"
                placeholder="Логин"
                autoFocus
                value={login}
                onInput={(e) => setLogin(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Пароль"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {login && password && (
            <Button variant="primary" onClick={enter}>
              Вход
            </Button>
          )}
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default observer(Login)
