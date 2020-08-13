import React, { useState } from "react";
import Icon from "./../../assets/icons/star.png";
import Api from "./../../api/Api";
import "./modal.css";
import Stars from "../Consultant/Stars";
const Modal = () => {
  const [close, setClose] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [star, setStar] = useState("");
  const [starsBlockStatus, setStarsBlockStatus] = useState(null);

  const postReview = () => {
    Api.createReviews({
      consultant: 1,
      text: feedback,
    }).then((item) => console.log("item", item));
  };

  console.log(star);
  return (
    <>
      {close ? null : (
        <div className={"overlay"}>
          <div className={"dialog"}>
            <div className="text-right">
              <button
                className={"btn btn-danger modal-close"}
                onClick={() => setClose(true)}
              >
                X
              </button>
            </div>
            {starsBlockStatus ? (
              <div>
                <h2>Ваша оценка данной консультации</h2>
                <div className="stars-block">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item}>
                      <img
                        src={Icon}
                        alt="Icon"
                        className="star-icon"
                        onClick={() => {
                          setStar(item);
                          postReview();
                          setClose(true);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="texts-block">
                  <span>Плохо</span>
                  {/* <button
                    className="green-btn"
                    onClick={() => {
                      postReview();
                      setClose(true);
                    }}
                  >
                    Отправить
                  </button> */}
                  <span>Отлично</span>
                </div>
              </div>
            ) : (
              <div>
                <h2>Оставьте отзыв пожалуйста</h2>
                <div className="feedback-block">
                  <textarea
                    placeholder="Введите отзыв"
                    onChange={(e) => setFeedback(e.target.value)}
                    className="text-feedback"
                  ></textarea>
                </div>
                <div className="btnBlock">
                  <button
                    className="send-btn"
                    onClick={() => setStarsBlockStatus(true)}
                  >
                    Отправить
                  </button>
                  <button className="green-btn">Выйти</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
