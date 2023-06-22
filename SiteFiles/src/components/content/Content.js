import React, { useEffect } from "react";
import contentStartRequest from "../../requests/contentStartRequest";
import {observer} from "mobx-react-lite";

function Content() {
  useEffect(() => {
    contentStartRequest()
  }, []);
  return <div>
    <button onClick={contentStartRequest}>Send</button>
  </div>;
}

export default observer(Content)
