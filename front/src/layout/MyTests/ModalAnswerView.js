import React from "react";

const modalAnswerView = (props) => {
  return (
    <div
      className="modal fade"
      id="modalAnswerView"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Answer
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.answers ? (
              <div>
                {props.answers.map((ans, j) => {
                  return (
                    <div>
                      <h5>{ans.question}</h5>
                      <h5>{ans.answer}</h5>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default modalAnswerView;
