import React, { useState } from "react";
import Icon from "./../../assets/icons/star.png";
import "./modal.css";
const Modal = () => {
  const [close, setClose] = useState(null);
  const [starsBlockStatus, setStarsBlockStatus] = useState(null);

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
                        onClick={() => setClose(true)}
                      />
                    </div>
                  ))}
                </div>
                <div className="texts-block">
                  <span>Плохо</span>
                  <span>Отлично</span>
                </div>
              </div>
            ) : (
              <div>
                <h2>Оставьте остыв пожалуйста</h2>
                <div className="feedback-block">
                  <textarea
                    placeholder="Введите отзыв"
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
