import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { submitForm } from "../utils/firebase";

export const Form = () => {
    const dininghalls = ["Allison", "Elder", "Plex West", "Sargent"]

    const [diningHall, setDiningHall] = useState(null)
    const [waitTime, setWaitTime] = useState('');
    const [stars, setStars] = useState(null);

    const handleSubmit = () => {
        submitForm(diningHall, waitTime);
    }


    return (
        <div className="container-center-horizontal">
            <div className="iphone-14-1 screen">
                <header className="header">
                    <div className="overlap-group4">
                        <div className="sort-by inter-normal-black-14px">
                            Sort By ↓
                        </div>
                        <div className="flex-row">
                            <div className="dining-informant">
                                DiningInformant
                            </div>
                            <div className="overlap-group">
                                <div className="worth-the-wait inter-normal-black-14px">
                                    Worth the Wait
                                </div>
                                <img className="star-1" src="./icons8-star-filled-48.png" alt="Star" />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="form">
                    <div className="overlap-group2">
                        <div className="share-your-experience inter-semi-bold-white-28px">
                            Share Your Experience!
                        </div>
                        <p className="which-dining-hall-did-you-go-to inter-semi-bold-black-20px">
                            Which dining hall did you go to?
                        </p>
                        {/* <div className="overlap-group1">
                            <select id="diningHall">
                                <option value="Allison">Allison</option>
                                <option value="Elder">Elder</option>
                                <option value="Plex West">Plex West</option>
                                <option value="Sargent">Sargent</option>
                            </select>
                        </div> */}
                        <Autocomplete
                            id="size-small-filled"
                            size="small"
                            value={diningHall}
                            onChange={(event, newValue) => { setDiningHall(newValue) }}
                            style={{ width: "320px" }}
                            options={dininghalls}
                            getOptionLabel={(option) => option}
                            defaultValue={dininghalls[0]}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        size="small"
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Dining Hall"
                                />
                            )}
                        />
                        <p className="how-many-minutes-did-you-wait inter-semi-bold-black-20px">
                            How many minutes did you wait?
                        </p>
                        {/* <div className="overlap-group-1">
                            
                            <input type="number" min="0" max="40"></input>
                        </div> */}
                        <TextField error={waitTime < 0} value={waitTime} onChange={(event) => { setWaitTime(event.target.value) }} style={{ width: "320px" }} type="number" />

                        <p className="how-would-you-rate-the-food inter-semi-bold-black-20px">
                            How would you rate the food?
                        </p>
                        <div className="menu-rating">
                            {/* stars here, use MUI */}
                            <Rating 
                                name="half-rating-read" 
                                value={stars} 
                                onChange={(event, newValue) => {
                                     setStars(newValue);}}
                                precision={0.5} 
                                sx={{ fontSize: "2vw" }} />
                        </div>
                        <div className="overlap-group3">
                            {/* <button>Submit!</button> */}
                            <Button onClick={handleSubmit} disabled={waitTime === '' || waitTime < 0 || stars === null || diningHall === null} variant="contained">Submit!</Button>
                        </div>
                    </div>
                </div>
                <div className="overlap-group5">
                    {/* turn this into a button */}
                    <div className="back-to-dining-halls inter-semi-bold-white-28px">
                        Back to Dining Halls
                    </div>
                </div>
            </div>
        </div>
    );
}