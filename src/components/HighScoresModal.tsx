import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useGameContext } from "../context/GameContext";
import { Button } from "./Button";
import { IHighScores, IScore } from "../types/highScores";
import { getHighScores } from "../util/getHighScores";
import { saveHighScores } from "../util/saveHighScores";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 500px;
  background-color: white;
  top: 100px;
  left: calc(50% - 250px);
  border-radius: 4px;
  padding: 30px;
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-gap: 20px;
  color: ${(props) => props.theme.primaryColour};
  justify-items: center;
  text-align: center;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 36px;
  color: ${(props) => props.theme.primaryColour};
`;

const Overlay = styled.div`
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 30px;
`;

const Input = styled.input`
  font-size: 20px;
  padding: 10px;
  border: 3px solid grey;
  color: ${(props) => props.theme.primaryColour};
  width: 100%;
  &:focus {
    border: 3px solid ${(props) => props.theme.primaryColour};
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

interface IHighScoresProps {
  finalScore: number;
}

const HighScoresModal = ({ finalScore }: IHighScoresProps) => {
  const {
    difficulty,
    setIsFinalScoreModalOpen,
    setFinalScore,
  } = useGameContext();
  const { primaryColour } = useContext(ThemeContext);
  const [name, setName] = useState("");

  const addScoreToArray = (scores: IHighScores) => {
    scores[difficulty] = [...scores[difficulty], { name, finalScore }]
      .sort((a: IScore, b: IScore) => {
        return b.finalScore - a.finalScore;
      })
      .slice(0, 10);
  };

  const handleSubmit = () => {
    if (!name) {
      return alert("Please enter a name");
    }

    const highScores = getHighScores();

    if (highScores) {
      const parsed: IHighScores = JSON.parse(highScores);

      let updatedScores = parsed;

      if (!parsed[difficulty]) {
        updatedScores[difficulty] = [{ name, finalScore }];
      } else {
        addScoreToArray(updatedScores);
      }

      saveHighScores(updatedScores);
    } else {
      const highScores = {
        [difficulty]: [{ name, finalScore }],
      };

      saveHighScores(highScores);
    }

    setIsFinalScoreModalOpen(false);
    setFinalScore(null);
  };

  const handleCancel = () => {
    setFinalScore(null);
    setIsFinalScoreModalOpen(false);
  };

  return (
    <Overlay>
      <ModalWrapper>
        <H1>Submit High Score</H1>

        <ContentWrapper>
          <div>
            <div>SCORE: {finalScore}</div>

            <div>DIFFICULTY: {difficulty} </div>
          </div>

          <Input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <ButtonWrapper>
            <Button isCompact color={primaryColour} onClick={handleSubmit}>
              Confirm
            </Button>
            <Button
              isCompact
              color={primaryColour}
              accentColor="#9e2517"
              onClick={handleCancel}
            >
              Don't Save
            </Button>
          </ButtonWrapper>
        </ContentWrapper>
      </ModalWrapper>
    </Overlay>
  );
};

export default HighScoresModal;
