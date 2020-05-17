import React, { useState, useEffect } from "react";
import ModalAnswerView from "./ModalAnswerView.js";

const TestAnswers = (props) => {
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [answers, setAnswers] = useState([]);

  const handleClick = (evt, answer) => {
    setCurrentAnswer(answer);
  };

  useEffect(() => {
    fetch(`/getAllAnswersTest/${props.test._id}`)
      .then((response) => response.json())
      .then((tests) => {
        const totalLength = tests.length;
        const chunked_arr = [];

        if (totalLength === 0) {
          setAnswers(chunked_arr);
          return;
        }

        if (totalLength === 1) {
          const temp = [tests[1], {}, {}];
          chunked_arr.push(temp);
          setAnswers(chunked_arr);
          return;
        }

        if (totalLength === 2) {
          const temp = [tests[1], tests[2], {}];
          setAnswers(chunked_arr);
          chunked_arr.push(temp);
          return;
        }

        const residue = totalLength % 3;
        const mod3Length = totalLength - residue;

        for (var i = 0; i < mod3Length; i += 3) {
          const temp = [tests[i], tests[i + 1], tests[i + 2]];
          chunked_arr.push(temp);
        }

        if (residue === 1) {
          const temp = [tests[mod3Length], {}, {}];
          chunked_arr.push(temp);
        }

        if (residue === 2) {
          const temp = [tests[mod3Length], tests[mod3Length + 1], {}];
          chunked_arr.push(temp);
        }

        setAnswers(chunked_arr);
      });
  }, []);

  const code = answers.map((group, i) => {
    return (
      <div key={"row" + i} className="row">
        {group.map((answer, j) => {
          return (
            <div key={"answer" + j} className="col-sm">
              {answer ? (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{"answer" + j}</h5>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#modalAnswerView"
                      onClick={(evt) => handleClick(evt, answer)}
                    >
                      See the answer
                    </button>
                    <ModalAnswerView answer={currentAnswer}></ModalAnswerView>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="container">
      <h1>Test answers</h1>
      {code}
    </div>
  );
};

export default TestAnswers;
