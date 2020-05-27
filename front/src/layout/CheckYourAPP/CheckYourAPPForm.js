import React, { useRef, useState, useEffect } from "react";
import CheckYourAPP from "./CheckYourAPP.js";
//import GenerateAnnonymousLink from "./GenerateAnnonymousLink.js";
import ErrorImage from "./ErrorImage.jpeg";
import { Link, Redirect } from "react-router-dom";
const randomstring = require("randomstring");

const CheckYourAPPForm = (props) => {
  const formRef = useRef();
  const textAreaRef = useRef();
  const buttonRef = useRef();
  const AnonymousLink = useRef();
  const copyButtonRef = useRef();
  const [url, setUrl] = useState(null);
  const [habeasData, setHabeasData] = useState("");
  const [instruction, setInstruction] = useState("");
  const [openQs, setOpenQs] = useState([]);
  const [openQsAdd, setOpenQsAdd] = useState([]);
  const [selectQs, setSelectQs] = useState([]);
  const [radioQs, setRadioQs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(null);
  const baseUrl = "/survey/";
  const anonymousUrl = baseUrl + randomstring.generate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const url = form.URL.value;
    console.log(buttonRef);
    setUrl(url);

    let test = {
      user: props.user._id,
      title: title,
      description: description,
      url: url,
      habeas: habeasData,
      selectQs: selectQs,
      radioQs: radioQs,
      openQs: openQsAdd,
      instruction: instruction,
      anonUrl: anonymousUrl,
    };

    fetch("/newTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    });
  };

  const isLogin = () => {
    const login = props.user;
    if (login == null) return false;
    return true;
  };

  useEffect(() => {
    fetch("/getBaseTest")
      .then((response) => {
        return response.json();
      })
      .then((test) => {
        let t = test[0];
        setSelectQs(t.defaultSelectQs);
        setHabeasData(t.habeas);
        setRadioQs(t.defaultRadioQs);
      });
  }, []);

  const handleChange = (evt) => {
    const form = formRef.current;
    const newHab = form.habeasd.value;
    setHabeasData(newHab);
    const newInst = form.instruction.value;
    setInstruction(newInst);
  };

  const handleChange2 = (evt) => {
    let matches = evt.target.id.match(/\d+/g);
    let copy = [...openQs];
    copy[matches[0]].label = evt.target.value;
    setOpenQsAdd(copy);
  };

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const addOpenQuestion = (evt) => {
    setOpenQs([...openQs, { label: "" }]);
    setOpenQsAdd([...openQsAdd, { label: "" }]);
  };

  const checkLink = (evt) => {
    evt.preventDefault();
    const form = formRef.current;
    const url = form.URL.value;
    setUrl(url);
  };

  const deleteRadio = (evt) => {
    let copy = [...radioQs];
    copy.splice(evt.target.id, 1);
    setRadioQs(copy);
  };

  const deleteSelect = (evt) => {
    let copy = [...selectQs];
    copy.splice(evt.target.id, 1);
    setSelectQs(copy);
  };

  const deleteOpen = (evt) => {
    let copy = [...openQs];
    let copy2 = [...openQsAdd];
    copy.splice(evt.target.id, 1);
    copy2.splice(evt.target.id, 1);
    setOpenQs(copy);
    setOpenQsAdd(copy2);
  };

  const copyAnonymousLink = (evt) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    const Alink = AnonymousLink.current;
    Alink.innerHTML = url;
    copyButtonRef.current.innerHTML = "Copied!";
  };

  const redirectTo = () => {
    setRedirect("/");
  };

  let code = (
    <div className="container">
      <h1>Create your own test </h1>
      <h5 id="h5CreateTest">
        Below you will see our default template for a test, we have included a
        Habeas Data and some demographic questions. You can choose to add or
        remove questions as they fit your purpose.
      </h5>
      {!isLogin() ? (
        <div>
          <img
            src={ErrorImage}
            alt="You need to be logged in to create your own test"
            height="112"
            width="112"
          />
          <div className="br"></div>
          <div className="alert alert-danger" role="alert">
            You need to be logged in to create your own test
          </div>
        </div>
      ) : (
        <div className="card" id="createForm">
          <div className="card-body">
            <div>
              <div>
                <h4>Basic info</h4>
              </div>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="row">
                    <div col-sm-12>
                      <label for="title">Title</label>
                      <textarea
                        className="form-control"
                        id="title"
                        rows="1"
                        placeholder="Type a title for your test here"
                        onChange={handleChangeTitle}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div col-sm-12>
                      <label for="description">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="1"
                        placeholder="Type a short description for your webpage here"
                        onChange={handleChangeDescription}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div col-sm-12>
                      <label>Insert your application URL</label>
                      <input
                        type="text"
                        className="form-control"
                        id="URL"
                        aria-describedby="emailHelp"
                      />
                      <button
                        type="button"
                        id="checkLink"
                        className="btn btn-primary"
                        onClick={checkLink}
                      >
                        Check your link
                      </button>
                    </div>
                  </div>
                </div>
                <CheckYourAPP url={url}></CheckYourAPP>
                <div className="form-group">
                  <div className="row">
                    <div col-sm-12>
                      <label for="texta1">Habeas Data</label>
                      <div className="br"></div>
                      <small>You can paste your own or edit our default</small>
                      <textarea
                        className="form-control"
                        id="habeasd"
                        rows="12"
                        value={habeasData}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-12">
                      <label for="texta2">
                        Instruction for the user to carry out
                      </label>
                      <div className="br"></div>
                      <textarea
                        className="form-control"
                        id="instruction"
                        rows="2"
                        placeholder="What do you want the user to do in your webpage?"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <h4>Questions</h4>
                </div>
                {radioQs.map((q, i) => {
                  return (
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-2"> Question {i + 1}</div>
                        <div className="col-sm-8">
                          <label>{q.label}</label>
                          {q.answers ? (
                            q.answers.map((ans, j) => {
                              return (
                                <div className="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    id={ans.answer}
                                    name={j}
                                    className="custom-control-input"
                                  ></input>
                                  <label
                                    className="custom-control-label"
                                    for={ans.answer}
                                  >
                                    {ans.answer}
                                  </label>
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="col-sm-2">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={deleteRadio}
                            id={i}
                          >
                            <svg
                              className="bi bi-x"
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {selectQs.map((q, i) => {
                  return (
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-2">
                          {" "}
                          Question {i + 1 + radioQs.length}
                        </div>
                        <div className="col-sm-8">
                          <label>{q.label}</label>
                          <select className="custom-select">
                            <option selected>{q.selected}</option>
                            {q.options ? (
                              q.options.map((o, j) => {
                                return (
                                  <option value={o.option}>{o.option}</option>
                                );
                              })
                            ) : (
                              <div></div>
                            )}
                          </select>
                        </div>
                        <div className="col-sm-2">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={deleteSelect}
                            id={i}
                          >
                            <svg
                              className="bi bi-x"
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {openQs.map((q, i) => {
                  return (
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-2">
                          Question {i + 1 + radioQs.length + selectQs.length}
                        </div>
                        <div className="col-sm-8">
                          <label for={"openQ" + i}>
                            {"Type your open question " + (i + 1)}
                          </label>
                          <div className="br"></div>
                          <textarea
                            className="form-control"
                            id={"openQ" + i}
                            rows="1"
                            placeholder="Type your question here"
                            onChange={handleChange2}
                          ></textarea>
                        </div>
                        <div className="col-sm-2">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={deleteOpen}
                            id={i}
                          >
                            <svg
                              className="bi bi-x"
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={addOpenQuestion}
                >
                  Add open question
                </button>
                <br />
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  ref={buttonRef}
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="br"></div>
            <div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Your test form has been succesfully submitted
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={redirectTo}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <textarea ref={textAreaRef} rows="1" id="modalTextArea">
                        {"https://designyourownaccesbilitytest.herokuapp.com" +
                          anonymousUrl}
                      </textarea>
                      <p>or click on the link to redirect to the page</p>
                      <Link
                        ref={AnonymousLink}
                        to={anonymousUrl}
                        className="nav-link"
                        id="linkAnon"
                      >
                        Link
                      </Link>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={copyAnonymousLink}
                        ref={copyButtonRef}
                      >
                        Copy link to clipboard
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={redirectTo}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  if (redirect) code = <Redirect to={redirect}></Redirect>;
  return <div>{code}</div>;
};

export default CheckYourAPPForm;
