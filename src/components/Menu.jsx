import React, { useState } from 'react';
import { Box, CircularProgress, IconButton, Modal, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const tabs = ['Breakfast', 'Lunch', 'Dinner'];

// Component that will only render if value === index (ie. tab is selected)
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const Menu = (props) => {
  const { open, data, loading, diningHallId, toggleModal } = props;
  // var isOpen = false;
  // const [data, loading, menuError] = useDiningHallData();

  const [tabSelected, setTabSelected] = useState(0);

  // console.log(diningHallId);
  // console.log(open);

  const handleTabButtonPush = (event) => {
    setTabSelected(Number(event.target.id));
  };

  // breakfast menu array

  var menuItems = ' ';
  if (!loading) {
    // console.log(data);
    // console.log(data['Sargent']);
    // menuItems = data[diningHallId][tabSelected].map((category) => {
    menuItems = data[diningHallId][tabs[tabSelected].toLowerCase()].map((category) => {
      const { name, items } = category;

      return (
        <div key={name}>
          <div className="MenuCategory">
            <h3>{name}</h3>
          </div>
          {items.map((item) => {
            const { name } = item;

            return (
              <div key={name}>
                <Typography style={{ margin: '3px 1px 3px 25px' }} data-cy={name.replaceAll(' ','-')}>{name}</Typography>
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <Modal style={{ margin: '20px 20px', zLayer: '1' }} open={open} onClose={toggleModal}>
      <Paper className="MenuPaper">
        <div
          style={{
            padding: '3px 15px 0px 15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography variant="h4">{diningHallId}</Typography>
          <IconButton onClick={toggleModal}>
            <CloseIcon size="large" sx={{ fontSize: '50px' }} />
          </IconButton>
        </div>
        <ul className="MenuTabs">
          {tabs.map((tab, index) => {
            return (
              <li
                className={tabSelected === index ? 'active' : ''}
                key={tab}
                id={index}
                onClick={handleTabButtonPush}
                style={{ width: '33.3%' }}
                data-cy={tabs[index]}>
                {tab}
              </li>
            );
          })}
        </ul>
        <div style={{ overflowY: 'scroll' }}>
          <TabPanel value={tabSelected} index={0}>
            {loading ? <CircularProgress /> : menuItems}
          </TabPanel>
          <TabPanel value={tabSelected} index={1}>
            {loading ? <CircularProgress /> : menuItems}
          </TabPanel>
          <TabPanel value={tabSelected} index={2}>
            {loading ? <CircularProgress /> : menuItems}
          </TabPanel>
        </div>
      </Paper>
    </Modal>
  );
};
