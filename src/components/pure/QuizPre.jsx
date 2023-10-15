import { useState } from "react";
import { quiz } from "./quiz.js";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const QuizPre = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <Box
      maxWidth="500px"
      minWidth="250px"
      bg="#ffffff"
      borderRadius="4px"
      mt="30px"
      p="30px 60px"
    >
      {!showResult ? (
        <div>
          <div>
            <span
              className="active-question-no"
              style={{
                fontSize: "32px",
                fontWeight: 500,
                color: "principal.100",
              }}
            >
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span
              style={{
                
                 "fontSize": "16px",
    "fontWeight": 500,
    "color": "#e0dee3"
              }}
            >
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <Text fontSize="20px" fontWeight="500" margin={0}>
            {question}
          </Text>
          <ul
            style={{
              "margin-top": "20px",
            }}
          >
            {choices.map((answer, index) => (
              <li
                style={
                  selectedAnswerIndex === index
                    ? {
                        background: "#f1f7fc",
                        border: "1px solid #000",
                        padding: "11px",
                        marginTop: "15px",
                        cursor: "pointer",
                        borderRadius: "16px",
                        listStyle: "none",
                      }
                    : {
                        textDecoration: "none",
                        listStyle: "none",
                        color: "#2d264b",
                        fontSize: "16px",
                        background: "#ffffff",
                        border: "1px solid #eaeaea",
                        borderRadius: "16px",
                        padding: "11px",
                        marginTop: "15px",
                        cursor: "pointer",
                      }
                }
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAnswerIndex === index ? "selected-answer" : null
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button
              style={{
                background:
                  "linear-gradient(90.04deg, #000000 0.03%, #444444 99.96%)",
                borderRadius: "9px",
                fontSize: "18px",
                color: "#ffffff",
                padding: "10px 42px",
                outline: "none",
                border: "none",
                cursor: "pointer",
                marginTop: "15px",
              }}
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3 style={{
 "font-size": "24px",
  "letter-spacing": "1.4px",
  "text-align": "center",
          }}>Resultados</h3>
          <p
          style={{
            "font-size": "16px",
  "font-weight": 500,
          }}
          >
            Total Preguntas: <span
            
            style={{
               "color": "#800080",
  "font-size": "22px",
            }}
            >{questions.length}</span>
          </p>
          <p style={{
            "font-size": "16px",
  "font-weight": 500,
          }}>
            Puntaje Total:<span
            style={{
               "color": "#800080",
  "font-size": "22px",
            }}
            > {result.score}</span>
          </p>
          <p style={{
            "font-size": "16px",
  "font-weight": 500,
          }}>
            Respuestas Correctas:<span
            style={{
               "color": "#800080",
  "font-size": "22px",
            }}
            > {result.correctAnswers}</span>
          </p>
          <p
          style={{
            "font-size": "16px",
  "font-weight": 500,
          }}
          >
            Respuestas Incorrectas:<span
            style={
              {
                 "color": "#800080",
  "font-size": "22px",
              }
            }
            > {result.wrongAnswers}</span>
          </p>
          <Button colorScheme="facebook" mt={"15px"} w={"100%"} as={Link} to={"/convocatoriasUser"}>
            Volver
          </Button>
        </div>
      )}
    </Box>
  );
};

export default QuizPre;
