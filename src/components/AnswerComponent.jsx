import React from "react";
import {Button} from "@mui/material";

export default function AnswerComponent(props) {
    return (
        <div>
            <Button variant="contained" onClick={props.clicked}>{props.answer}</Button>
        </div>
    );
}
