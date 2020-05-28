import React, { useState } from "react";
import AnswersForm from "./AnswersForm.js";

const Encuesta = () => {
  const [accept, setAccept] = useState(false);

  const acceptFun = () => {
    setAccept(true);
  };

  return (
    <div className="container">
      <h1>Test this website</h1>
      {accept ? (
        <AnswersForm></AnswersForm>
      ) : (
        <div>
          <h3>Ready to begin testing?</h3>
          <button className="btn btn-primary" type="button" onClick={acceptFun}>
            Ready!
          </button>
        </div>
      )}
    </div>
  );
};

export default Encuesta;
