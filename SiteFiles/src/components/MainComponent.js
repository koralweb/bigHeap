import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Login from "./login/Login";
import Content from "./content/Content";
import ErrorModal from "./ErrorModal";
import startRequest from "../requests/startRequest";
import fetchIntercept from 'fetch-intercept';
import request from "../interceptors/request";
import requestError from "../interceptors/requestError";
import response from "../interceptors/response";
import responseError from "../interceptors/responseError";
import screens from "../mobx/screens";

const unregister = fetchIntercept.register({
  request,
  requestError,
  response,
  responseError
});

function MainComponent() {

  useEffect(startRequest, []);

  return (
    <div>
      {screens.login && <Login />}
      {screens.content && <Content />}
      {screens.error && <ErrorModal />}
    </div>
  );
}

export default observer(MainComponent);
