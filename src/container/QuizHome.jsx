import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Modal,
  Typography,

} from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberInput from "../components/NumberInput";
import CorrectAnswer from "../components/CorrectAnswer";
import "./QuizHome.css"
import AnswerComponent from "../components/AnswerComponent";

function QuizHome() {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState();
  const [showResult, setShowResult] = useState(false);
  const [resultDialog, setResultDialog] = useState(false);
  const [correct, setCorrect] = useState(0);
  const resultClose = () => setResultDialog(false);

  useEffect(() => {
    if (questions.length) {
      setActiveQuestion(questions[activeIndex]);
    }
  }, [questions]);

  useEffect(() => {
    if (activeIndex === questions.length - 1) {
      setShowResult(true);
    }
    setActiveQuestion(questions[activeIndex]);
  }, [activeIndex]);

  const onInputChange = (val, key) => {
    console.log(val, key);

    const updatedFormData = {
      ...formData,
      [key]: val,
    };

    setFormData(updatedFormData);
  };

  const startQuiz = () => {
    setIsStarted(true);

    const url = `https://opentdb.com/api.php?amount=${formData?.numberOfQuestions}&category=${formData?.category}&difficulty=${formData?.difficulty}&type=multiple`;

    fetch(url)
      .then((results) => {
        return results.json();
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response?.results) {
          setQuestions(response.results);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onNextQuestion = () => {
    setActiveIndex(activeIndex + 1);
  };
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //Initial View : Form
  //Second View : Questions & Answers : Button : Correct Answer
  //Modal: Result

  return (
    <>
      {!isStarted && (
        <Paper elevation={3} className="mainContent">
          <FormControl className="form-control">
            <NumberInput
              aria-label="Demo number input"
              placeholder="Number of questions"
              value={formData?.numberOfQuestions ?? 0}
              onChange={(_, val) => onInputChange(val, "numberOfQuestions")}
            />
          </FormControl>
          <FormControl className="form-control">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={formData?.category ?? ""}
              onChange={(e) => onInputChange(e.target.value, "category")}
            >
              <MenuItem value={21}>Sports</MenuItem>
              <MenuItem value={23}>History</MenuItem>
              <MenuItem value={24}>Politics</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="form-control">
            <InputLabel id="demo-simple-select-label">
              Select Difficulty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Difficulty"
              value={formData?.difficulty ?? ""}
              onChange={(e) => onInputChange(e.target.value, "difficulty")}
            >
              <MenuItem value={"easy"}>Easy</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"hard"}>Hard</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={startQuiz}>
            Start
          </Button>
        </Paper>
      )}

      {isStarted && (
        <Paper elevation={3} className="mainContent">
          <div className="section1">
            <CorrectAnswer correctQuestions={correct} totalQuestions={questions.length} />
          </div>
          <div className="section2">
            {loading ? (
              <CircularProgress />
            ) : (
              <h1>{activeQuestion?.question}</h1>
            )}
          </div>
          <div className="section3">
            {
              activeQuestion?.incorrect_answers.map((item) => <AnswerComponent answer={item}/>)
            }
            <AnswerComponent answer={activeQuestion?.correct_answer} clicked={() => setCorrect(correct+1)}/>
          </div>
          <div className="section4">
            {!showResult ? (
              <Button variant="contained" onClick={onNextQuestion}>
                Next Question
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setResultDialog(true)}>
                Check Result
              </Button>
            )}
          </div>
        </Paper>
      )}
      <Modal
      open={resultDialog}
      onClose={resultClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Result is:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            `{correct} / {questions.length}`
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default QuizHome;
