import React, { useState } from "react";
// import Icon from "./../../assets/icons/star.png";
import Api from "./../../api/Api";
import "./modal.css";
import Stars from "../Consultant/Stars";
import {checkToken} from "../../state/authReducer";
import {useDispatch} from "react-redux";

const Modal = (props) => {

  const [close, setClose] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [star, setStar] = useState("");
  const [starsBlockStatus, setStarsBlockStatus] = useState(null);
  const dispatch = useDispatch()
  const Send = async (req) => dispatch(checkToken(() => req))
  const postReview = () => {
    Send(Api.createReviews({
      consultant: props.userId,
      text: feedback,
      star: star
    }, props.userId)).then((item) => {
      props.setClose(!props.closed)
    });
  };

  return (
    <>
      {!props.closed ? null : (
        <div className={"overlay orange"}>
          <div className={"dialog"}>
            <div className="text-right">
              <button
                className={"btn btn-danger modal-close"}
                onClick={() => props.setClose(!props.closed)}
              >
                X
              </button>
            </div>
            {starsBlockStatus ? (
              <div>
                <h2>Ваша оценка данной консультации</h2>
                <div className="stars-block">
                  <Stars
                    color={"#ECBF2C"}
                    edit={true}
                    size={70}
                    value={star}
                    setStar={setStar}
                  />
                </div>
                <div className="texts-block btnBlock">
                  <span>Плохо</span>
                  <button
                    className="send-btn"
                    onClick={() => {
                      postReview();
                      setClose(true);
                    }}
                  >
                    Отправить
                  </button>
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
                  />
                </div>
                <div className="btnBlock">
                  <button
                    className="send-btn"
                    onClick={() => {
                      setStarsBlockStatus(true);
                    }}
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
