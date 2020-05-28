import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const AnswersForm = (props) => {
  const formRef = useRef();
  const instructionRef = useRef();
  const [test, setTest] = useState(null);
  const [redirect, setRedirect] = useState(null);
  //const [understand, setUnderstand] = useState(false);

  const handleSubmit = (evt) => {
    var formData = new FormData(formRef.current);
    let answers = [];
    // Display the key/value pairs
    let ans = "";
    for (var q of test.radioQs) {
      ans = q.label;
    }
    let count = 0;
    for (var pair of formData.values()) {
      if (count === 1) ans = "Could you carry out the instruction?";
      answers = [...answers, { question: ans, answer: pair }];
      count++;
    }
    for (let i = 3; i < formRef.current.length - 3; i++) {
      let j = i - 3;
      let k = j - test.selectQs.length;
      if (j >= test.selectQs.length) {
        ans = test.openQs[k].label;
      } else {
        ans = test.selectQs[j].label;
      }
      answers = [
        ...answers,
        { question: ans, answer: formRef.current[i].value },
      ];
    }
    const testAns = { test: test._id, answers };

    fetch("/newAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testAns),
    });
    console.log(evt.target);
    alert("Thank you for your submission");
    evt.target.innerHTML = "Submitted!";
    setRedirect("/");
  };

  useEffect(() => {
    const pieces = window.location.href.split("/");
    const url = pieces[pieces.length - 1];
    fetch(`/getTestUrl/survey/${url}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        console.log("json", jsonRes);
        setTest(jsonRes);
      });
  }, []);

  let code = (
    <div>
      {test !== null ? (
        <div class="card">
          <h5 class="card-header">{test.title ? test.title : "Error"}</h5>

          {test.title ? (
            <div key={test.url + 1} class="card-body">
              <form ref={formRef} onSubmit={handleSubmit}>
                <label>Description</label>
                <p>{test.description}</p>
                <label>Habeas Data</label>
                <p>{test.habeas}</p>
                <label>This is the link you need to go to</label>
                <div></div>
                <a href={test.url} target="_blank">
                  {test.url}
                </a>
                <div className="br"></div>
                <h5>Demographic questions</h5>
                {test.radioQs.map((q, i) => {
                  return (
                    <div className="form-group">
                      <label>{q.label}</label>
                      {q.answers ? (
                        q.answers.map((ans) => {
                          return (
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id={ans.answer}
                                name={"radio" + i}
                                value={ans.answer}
                                className="custom-control-input"
                                required
                              ></input>
                              <label
                                className="custom-control-label"
                                htmlFor={ans.answer}
                              >
                                {ans.answer}
                              </label>
                              <div class="invalid-feedback">
                                Select an option before submitting
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                })}
                {test.selectQs.map((q) => {
                  return (
                    <div className="form-group">
                      <label>{q.label}</label>
                      <select className="custom-select" required>
                        <option>{q.selected}</option>
                        {q.options ? (
                          q.options.map((o) => {
                            return <option value={o.option}>{o.option}</option>;
                          })
                        ) : (
                          <div></div>
                        )}
                      </select>
                    </div>
                  );
                })}
                {test.openQs.map((q, i) => {
                  return (
                    <div className="form-group">
                      <label htmlFor={"openQ" + i}>{q.label}</label>
                      <br></br>
                      <textarea
                        className="form-control"
                        id={"openQ" + i}
                        rows="1"
                        placeholder="Type your question here"
                        required
                      ></textarea>
                    </div>
                  );
                })}
                <p>{"Instruction: " + test.instruction}</p>
                <div className="form-group" ref={instructionRef}>
                  <label>Could you carry out the instruction?</label>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="yesInstruction"
                      name="radioComplete"
                      value="Yes"
                      className="custom-control-input"
                      required
                    ></input>
                    <label
                      className="custom-control-label"
                      htmlFor="yesInstruction"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="noInstruction"
                      name="radioComplete"
                      value="No"
                      className="custom-control-input"
                      required
                    ></input>
                    <label
                      className="custom-control-label"
                      htmlFor="noInstruction"
                    >
                      No
                    </label>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="card-body">
              {" "}
              <h2> error</h2>
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <div class="d-flex justify-content-center">
            <div>
              <h3>Loading</h3>
            </div>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  if (redirect) code = <Redirect to={redirect}></Redirect>;
  return code;
};

export default AnswersForm;
