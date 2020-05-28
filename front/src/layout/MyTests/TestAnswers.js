import React, { useState, useEffect } from "react";
import ModalAnswerView from "./ModalAnswerView.js";

const TestAnswers = (props) => {
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [answers, setAnswers] = useState([]);

  const handleClick = (evt, answer) => {
    console.log("current ans", answer);
    setCurrentAnswer(answer);
  };

  useEffect(() => {
    fetch(`/getAllAnswersTest/${props.test._id}`)
      .then((response) => response.json())
      .then((answersFetch) => {
        console.log("answers", answersFetch);
        setAnswers(answersFetch);
      });
  }, []);

  const code = answers.map((ans, j) => {
    return (
      <div className="card" id="TestAnswersCard">
        <div className="card-body">
          <h5 className="card-title">{"Answer " + j}</h5>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#modalAnswerView"
            onClick={(evt) => handleClick(evt, ans)}
          >
            See the answers
          </button>
          <ModalAnswerView answers={currentAnswer.answers}></ModalAnswerView>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <h1>Test {props.test !== null ? props.test.title : ""} answers</h1>
      {code}
    </div>
  );
};

export default TestAnswers;
