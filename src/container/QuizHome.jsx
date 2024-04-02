import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NumberInput from "../components/NumberInput";




function QuizHome() {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    console.log("questions", questions);
  }, [questions])
  const onInputChange = (val, key) => {
    console.log(val, key);

    const updatedFormData = {
      ...formData,
      [key]: val
    }

    setFormData(updatedFormData);
  } 

  const startQuiz = () => {
    const url = `https://opentdb.com/api.php?amount=${formData?.numberOfQuestions}&category=${formData?.category}&difficulty=${formData?.difficulty}`;
   
    fetch(url)
    .then((results) => {
      return results.json();
    })
    .then((response) => {
      if(response?.results) {
        setQuestions(response.results);
      }
    })
  }


  return (
    <Paper elevation={3} className="mainContent">
      <FormControl className="form-control">
        <NumberInput
          aria-label="Demo number input"
          placeholder="Number of questions"
          onChange={(_, val) => onInputChange(val, "numberOfQuestions")}
        />
      </FormControl>
      <FormControl className="form-control">
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          onChange={(e) => onInputChange(e.target.value, "category")}
        >
          <MenuItem value={21}>Sports</MenuItem>
          <MenuItem value={23}>History</MenuItem>
          <MenuItem value={24}>Politics</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="form-control">
        <InputLabel id="demo-simple-select-label">Select Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Difficulty"
          onChange={(e) => onInputChange(e.target.value, "difficulty")}
        >
          <MenuItem value={"easy"}>Easy</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"hard"}>Hard</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={startQuiz}>Start</Button>
    </Paper>
  );
}

export default QuizHome;
