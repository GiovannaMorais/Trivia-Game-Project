import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Question.css';

class Question extends Component {
  toggleQuestionClass = (answered, question, answer) => {
    if (!answered) {
      return '';
    }

    if (answered && question.includes(answer)) {
      return 'wrong';
    }

    return 'correct';
  }

  render() {
    const { question, answered, handleClick, isDisabled } = this.props;

    const answers = question.sortedAnswers;

    return (
      <div className="question-div">
        <div data-testid="question-category">{question.category}</div>
        <div data-testid="question-text">{question.question}</div>
        <div className="buttons-container" data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              type="button"
              key={ answer }
              disabled={ isDisabled }
              data-testid={
                question.incorrect_answers.includes(answer)
                  ? `wrong-answer-${index}`
                  : 'correct-answer'
              }
              className={
                this.toggleQuestionClass(answered, question.incorrect_answers, answer)
              }
              onClick={ handleClick }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    sortedAnswers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  answered: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
