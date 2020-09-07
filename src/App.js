import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import FlashcardList from './components/FlashcardList';
import Form from './components/Form'
import axios from 'axios';


function App() {
  const [ flashcards, setFlashcards ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(
          res.data.trivia_categories.map(category => {
            return {
              id: category.id,
              name: category.name
            }
          })
        )
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
            return {
              id: `${index} - ${Date.now()}`,
              question: decodeString(questionItem.question),
              answer,
              options: options.sort(() => Math.random() - .5)
            }
          })
        ) 
      })
  }

  return (
    <>
      <Form 
        handleSubmit = { handleSubmit } 
        categoryEl = { categoryEl } 
        amountEl = { amountEl }
        categories  = { categories }
      />
      <FlashcardList flashcards = { flashcards }/>
    </>
  );
}

export default App;