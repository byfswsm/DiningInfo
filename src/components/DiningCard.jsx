import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { Menu } from './Menu';
import { CircularProgress } from '@mui/material';

export const DiningCard = (props) => {
  const { waitTime, diningHallId, stars, imageLink, diningData, loading } = props;

  const mealName = ['Breakfast', 'Lunch', 'Dinner'];

  const [isOpen, toggleOpen] = useState(false);

  let meal;
  const date = new Date();
  const hour = date.getHours();
  if (hour < 11) {
    meal = 0;
  } else if (hour < 16) {
    meal = 1;
  } else {
    meal = 2;
  }

  // const featuredItems = diningData ? diningData[diningHallId][meal][0]['items'].slice(0, 3) : [];
  const featuredItems = diningData
    ? diningData[diningHallId][mealName[meal].toLowerCase()][0]['items'].slice(0, 3)
    : [];

  const openModal = () => {
    toggleOpen(!isOpen);
  };

  let color;
  if (waitTime < 10) {
    color = '#79DE79';
  } else if (waitTime < 20) {
    color = '#FCFC99';
  } else {
    color = '#FB6962';
  }

  if (diningHallId == "Allision") {
    data.cy
  }

  return (
    <>
      <section className="cards" onClick={openModal}>
        <div>
          <img className="hallpic" src={imageLink} alt={`Picture of ${diningHallId}`} />
          <div className="hallname">
            <h2>{diningHallId} Dining Hall</h2>
          </div>
        </div>
        <div className="middle">
          <div className="middleleft">
            <div className="featureditems">
              <div className="featuredlabel">
                <h1>{mealName[meal]} Preview:</h1>
              </div>
              <div className="featureditemslist">
                {loading ? <CircularProgress /> : null}
                {featuredItems.map((item) => {
                  const { name } = item;
                  return (
                    <div key={name} className="item">
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="waitscore">
              <Rating
                name="half-rating-read"
                value={stars}
                precision={0.5}
                readOnly
                sx={{
                  '& .MuiRating-icon': {
                    fontSize: '5vw'
                  }
                }}
              />
            </div>
          </div>
          <div className="middleright">
            <div className="waitlabel" style={{ backgroundColor: color }}>
              <div id="waittime" className="waittime">{`${waitTime} `} </div>
              min
            </div>
            <div className="more">
              <button className="morebutton" data-cy={'menu-'+diningHallId.replaceAll(' ','-')}>
                Full Menu <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Menu
        open={isOpen}
        loading={loading}
        data={diningData}
        diningHallId={diningHallId}
        toggleModal={openModal}
      />
    </>
  );
};
