import React, { useState, useEffect } from "react";
import ModalConsent from "./ModalConsent.js";
import { Link, useParams } from "react-router-dom";

const TestWebsites = () => {
  const [currentTest, setCurrentTest] = useState({});
  const [tests, setTests] = useState([]);
  const [limit, setLimit] = useState(0);
  const temp = useParams().page;
  const page = temp <= 0 ? 1 : temp;
  const url = "/gettesting/";

  window.scrollTo(0, 0);

  const handleClick = (evt, test) => {
    setCurrentTest(test);
  };

  useEffect(() => {
    fetch(`/getAllTests/${page}`)
      .then((response) => {
        return response.json();
      })
      .then((tests) => {
        const chunked_arr = [tests];

        setTests(chunked_arr);
      });

    fetch("/getAllTestsTotal")
      .then((response) => {
        return response.json();
      })
      .then((total) => {
        setLimit(total / 5);
      });
  }, [page]);

  const next = () => {
    if (page >= limit) return page;
    var temp = page;
    temp++;
    return temp;
  };

  const previous = () => {
    if (page <= 1) return page;
    return page - 1;
  };

  const code = tests.map((group, i) => {
    return (
      <div>
        {group.map((test) => {
          return (
            <div key="<row></row>" className="row">
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
                    onClick={(evt) => handleClick(evt, test)}
                  >
                    Test this website
                  </button>
                  <ModalConsent test={currentTest}></ModalConsent>
                </div>
              </div>
            </div>
          );
        })}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <Link to={url + previous()} className="page-link">
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link to={url + next()} className="page-link">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  });

  return (
    <div className="container">
      <h1>Test some websites</h1>
      {code}
    </div>
  );
};

export default TestWebsites;
