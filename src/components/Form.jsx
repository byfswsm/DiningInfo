import React, { useState } from 'react';
import { submitForm } from '../utils/firebase';
import { Rating, Modal, Paper, Button, Select, MenuItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Form = (props) => {
  const { open, onClose, toggleModal } = props;

  const [diningHallId, setDiningHallId] = useState('');
  const [waitTime, setWaitTime] = useState(0);
  const [rating, setRating] = useState(null);

  const handleWaitTimeChange = (event) => {
    let { value, min, max } = event.target;
    if (value !== '') {
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    }
    setWaitTime(value);
  };
  const handleDiningHallChange = (event) => {
    setDiningHallId(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    console.log(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm(diningHallId, waitTime, rating);
    toggleModal();
    setDiningHallId('');
    setWaitTime(0);
    setRating(null);
  };

  return (
    <Modal className="modal scrollbar-hidden" open={open} onClose={onClose}>
      <>
        <IconButton sx={{ position: 'fixed', top: 10, right: 10 }} onClick={onClose}>
          <CloseIcon size="large" sx={{ color: 'white', fontSize: '50px' }} />
        </IconButton>
        <Paper sx={{ borderRadius: '25px' }} className="formpaper">
          <div className="form" id="userSubmittedForm">
            <div className="shareYourExperienceHeader">
              <h1 className="shareYourExperienceH1">Share Your Experience!</h1>
            </div>
            <div className="question">
              <h1 className="questionH1" data-cy="dining-hall-question">Which dining hall did you go to?</h1>
            </div>
            <div className="response">
              <Select
                data-cy = "dining-hall-dropdown"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiSelect-select': {
                    fontSize: '3.5vw',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }
                }}
                className="formdropdown"
                value={diningHallId}
                onChange={handleDiningHallChange}
                id="diningHall">
                <MenuItem data-cy = "click-on-allison" value={'Allison'}>Allison</MenuItem>
                <MenuItem value={'Elder'}>Elder</MenuItem>
                <MenuItem value={'Plex West'}>Plex West</MenuItem>
                <MenuItem data-cy = "click-on-sargent" value={'Sargent'}>Sargent</MenuItem>
              </Select>
            </div>
            <div className="question">
              <h1 className="questionH1">What was your wait time in minutes?</h1>
            </div>
            <div className="response">
              <input
              data-cy="wait-time-typing"
                className="waittimeinput"
                type="number"
                min="0"
                max="120"
                id="userWaitTime"
                value={waitTime}
                onChange={handleWaitTimeChange}></input>
            </div>
            <div className="question">
              <h1 className="questionH1">How would you rate the food?</h1>
            </div>
            <div>
              <Rating
                sx={{
                  '& .MuiRating-icon': {
                    fontSize: '10vw'
                  }
                }}
                data-cy="halfratingread"
                name="half-rating-read"
                precision={0.5}
                size="large"
                id="userStars"
                value={rating}
                onChange={handleRatingChange}
              />
              
            </div>
            <div className="buttoncontainer">
              <Button  
                data-cy="submit-button"
                sx={{ fontSize: '1.5em' }}
                className="submitbutton"
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                size="large"
                disabled={
                  waitTime === '' ||
                  waitTime < 0 ||
                  waitTime > 120 ||
                  rating === null ||
                  diningHallId === ''
                }
                id="submit"
                type="submit">
                Submit!
              </Button>
            </div>
            <div>
              word
            </div>
          </div>
        </Paper>
      </>
    </Modal>
  );
};
