import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const MyTests = (props) => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch(`/getAllTestsUser/${props.user._id}`)
      .then((response) => response.json())
      .then((tests) => {
        console.log("test", tests);
        setTests(tests);
      });
  }, [props.user]);

  let code = tests.map((test) => {
    return (
      <div key={test.title + test.url + test.description} className="row">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{test.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{test.url}</h6>
            <p className="card-text">{test.description}</p>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#modalConsent"
              onClick={(evt) => props.clickFun(evt, test)}
            >
              See answers to this test
            </button>
          </div>
        </div>
      </div>
    );
  });

  if (props.currentTest !== null)
    code = <Redirect to={"/getTestAnswers"}></Redirect>;

  return (
    <div className="container">
      <h1>My tests</h1>
      {code}
    </div>
  );
};

export default MyTests;
