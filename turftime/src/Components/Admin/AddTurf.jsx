import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { createTurf } from '../../api_helpers/api_helpers';

const AddTurf = () => {
    const [turfName, setTurfName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [games, setGames] = useState([]);
    const [posterUrl, setPosterUrl] = useState('');
    const [featured, setFeatured] = useState(false);
    const [slots, setSlots] = useState([{ date: '', time: '', isBooked: false }]);

    const handleAddSlot = () => {
        setSlots([...slots, { date: '', time: '', isBooked: false }]);
    };

    const handleSlotChange = (index, key, value) => {
        const newSlots = slots.map((slot, i) => {
            if (i === index) {
                return { ...slot, [key]: value };
            }
            return slot;
        });
        setSlots(newSlots);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTurf(turfName, description, location, price, games, posterUrl, featured, slots)
            .then((res) => console.log("From create turf", res))
            .then(() => {
                setTurfName("");
                setDescription("");
                setFeatured(false);
                setLocation("");
                setPrice("");
                setGames([]);
                setPosterUrl("");
                setSlots([{ date: '', time: '', isBooked: false }]);
            });
    };

    return (
        <Box padding={4} marginTop={6}>
            <Typography variant="h4" gutterBottom>
                Add New Turf
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Turf Name"
                            value={turfName}
                            onChange={(e) => setTurfName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Games"
                            value={games.join(',')}
                            onChange={(e) => setGames(e.target.value.split(','))}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Poster URL"
                            value={posterUrl}
                            onChange={(e) => setPosterUrl(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                />
                            }
                            label="Featured"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Slots
                        </Typography>
                        {slots.map((slot, index) => (
                            <Grid container spacing={2} key={index} alignItems="center">
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label={`Slot ${index + 1} Date`}
                                        InputLabelProps={{ shrink: true }}
                                        value={slot.date}
                                        onChange={(e) => handleSlotChange(index, 'date', e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        fullWidth
                                        label={`Slot ${index + 1} Time`}
                                        value={slot.time}
                                        onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
                                        required
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Button variant="outlined" onClick={handleAddSlot} sx={{ mt: 2 }}>
                            Add Slot
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Turf
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddTurf;
