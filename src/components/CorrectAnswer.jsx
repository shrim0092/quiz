import React, { useState } from "react";

const CorrectAnswer = ({ correctQuestions=0, totalQuestions=0 }) => {

  return (
    <>
      <div className="correct-answers">
        Correct Answers: {`${correctQuestions}`} / {`${totalQuestions}`}
      </div>
    </>
  );
};
export default CorrectAnswer;
