import React, { useState } from 'react';
import { DiningCard } from '../components/DiningCard';
import { Form } from '../components/Form';
import { useDbData } from '../utils/firebase';
import { getAverageRatings, getAverageWaitTimeForHalls, menusToDictionary, useDiningHallData } from '../utils/helpers';

const imageDict = {
  Allison:
    'https://wbo.com/wp-content/uploads/2019/10/Allison-Dining-Hall-sating-and-food-service-1500x1000.png',
  Sargent:
    'https://sites.northwestern.edu/northeastarea/files/2019/09/SargentDining1-1-550x310.jpeg',
  Elder:
    'https://www.northwestern.edu/living/residential-experience/housing-options/res-halls/res-hall-images/20190901_elderdining.jpeg',
  'Plex West':
    'https://sites.northwestern.edu/southwestarea/files/2019/09/FWWestDining-550x310.jpeg'
};

export const HomePage = () => {
  // const [data, loading, menuError] = useDiningHallData();
  const [waitTimes, waitTimesError] = useDbData('Waiting Times', getAverageWaitTimeForHalls);
  const [ratings, ratingsError] = useDbData('Ratings', getAverageRatings);
  const [menus, menusError, loading] = useDbData('Dining Halls', menusToDictionary);

  const cards = waitTimes.map((diningHall) => {
    // console.log(ratings[diningHall['Dining Hall Id']]);
    return (
      <DiningCard
        key={diningHall['Dining Hall Id']} //{diningHall['Dining Hall Id']}
        waitTime={diningHall['Wait Time']} //{diningHall['Wait Time']}
        diningHallId={diningHall['Dining Hall Id']} //{diningHall['Dining Hall Id']}
        featuredItems={['Cajun Chicken', 'Roasted Broccoli', 'Pepperoni Pizza']} //{diningHall['Featured Items']}
        stars={ratings ? ratings[diningHall['Dining Hall Id']] : 0} //{diningHall['Stars']}
        imageLink={imageDict[diningHall['Dining Hall Id']]} //{diningHall['Image Link']}
        diningData={menus}
        loading={loading}
      />
    );
  });

  const [isOpen, toggleOpen] = useState(false);

  const openModal = (event) => {
    toggleOpen(!isOpen);
  };

  return (
    <>
      <section className="cardsWrapper">{cards}</section>
      <header>
        <div className="newbar">
          <div className="newleft">
            <h2>DiningInformant</h2>
          </div>
          <div className="topright">
            {/* <button className="sortby">
              Sort By <i className="fas fa-arrow-down"></i>
            </button> */}
          </div>
        </div>
      </header>
      <div className="footer">
        <button className="share" onClick={openModal} data-cy="share-your-experience">
          Share your experience!
        </button>
      </div>
      <Form open={isOpen} onClose={openModal} toggleModal={openModal} />
    </>
  );
};
