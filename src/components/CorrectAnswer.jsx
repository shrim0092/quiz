import React, { useState, useEffect } from "react";
import "./Correctans.css";

const CorrectAnswer = ({ correctQuestions, totalQuestions }) => {
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCorrect(correctQuestions);
  }, [correctQuestions]);

  useEffect(() => {
    setTotal(totalQuestions);
  }, [totalQuestions]);

  return (
    <>
      <div className="correct-answers">
        Correct Answers: {correct} / {total}
      </div>
    </>
  );
};
export default CorrectAnswer;
