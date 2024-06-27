import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { createTurf } from '../../api_helpers/api_helpers';

const AddTurf = () => {
    const [turfName, setTurfName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [games, setGames] = useState([]);
    const [posterUrl, setPosterUrl] = useState('');
    const [featured, setFeatured] = useState(false);
    const [slots, setSlots] = useState([{ time: '', isBooked: false }]);

    const handleAddSlot = () => {
        setSlots([...slots, { time: '', isBooked: false }]);
    };

    const handleSlotChange = (index, value) => {
        const newSlots = [...slots];
        newSlots[index].time = value;
        setSlots(newSlots);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTurf(turfName,description,location,price,games,posterUrl,featured,slots)
        .then((res)=>console.log("From create turf",res))
    };

    return (
        <div>
        <Box paddingTop={10}>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Turf Name:</label>
                <input
                    type="text"
                    value={turfName}
                    onChange={(e) => setTurfName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Games:</label>
                <input
                    type="text"
                    value={games}
                    onChange={(e) => setGames(e.target.value.split(','))}
                    required
                />
            </div>
            <div>
                <label>Poster URL:</label>
                <input
                    type="text"
                    value={posterUrl}
                    onChange={(e) => setPosterUrl(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Featured:</label>
                <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                />
            </div>
            <div>
                <label>Slots:</label>
                {slots.map((slot, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder={`Slot ${index + 1} time`}
                            value={slot.time}
                            onChange={(e) => handleSlotChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddSlot}>
                    Add Slot
                </button>
            </div>
            <button type="submit">Create Turf</button>
        </form>
        </Box>
        </div>
    );
};


export default AddTurf
