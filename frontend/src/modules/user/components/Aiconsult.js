import React, { useRef, useState } from 'react';
import './NoteCard/NoteCard.css';
import './style1.css';
import { networkOperations } from '../../../shared/services/api-client';
import { Button, TextField, CircularProgress } from '@mui/material';

const SearchComponent = ({ data }) => {
  const symptomRef = useRef('');
  const [arrNote, setArr] = useState([]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const consultation = {
    mid: data.Mid,
  };

  const sendToSecondAPI = async (print) => {
    try {
      setLoading(true); // Start loading animation
      const send = {
        symptoms: symptomRef.current.value,
        diagnosis: print,
      };

      const response = await networkOperations.post(
        process.env.REACT_APP_AI_MODEL,
        send
      );

      setOutput(response.data[0].candidates[0].output);
      setLoading(false); // Stop loading animation
      setShowOutput(true);
    } catch (err) {
      setLoading(false); // Stop loading animation in case of error
      // Handle errors for the second API call
    }
  };

  const onclick = async () => {
    try {
      const response = await networkOperations.post(
        process.env.REACT_APP_DISPLAY_CONSULTATION,
        consultation
      );

      const arr = response.data.message;
      setArr(arr);

      const print = arr.reduce((a, n) => a + n.note, '');

      if (print.trim() !== '') {
        sendToSecondAPI(print);
      }
    } catch (err) {
      // Handle errors for the first API call
    }
  };

  return (
    <>
      <h1>AI Doctor</h1>
      <label htmlFor="symptoms">Symptoms:</label>
      <TextField id="systum" rows="4" cols="50" inputRef={symptomRef}></TextField>
      <button id="generateButton" onClick={onclick} className='btn btn-primary'>
        Generate Response
      </button>
      <div id="response"></div>
      <br /><br />
      {loading ? ( // Show loading animation when waiting for response
        <CircularProgress />
      ) : (
        <div>
          <label htmlFor="diagnosis">Diagnosis:</label>
          {showOutput && output && (
            <div id="diagnosis" rows="4" cols="50" className='NoteCard w-75'>
              <pre>{output}</pre>
            </div>
          )}
        </div>
      )}
      <br /><br />
    </>
  );
};

export default SearchComponent;
