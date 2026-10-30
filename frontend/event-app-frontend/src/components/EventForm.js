import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import './EventForm.css';

const EventForm = ({ onEventAdd }) => {
	const [newEvent, setNewEvent] = useState({ title: '', date: '', reminder: false });

	const handleInputChange = (e) => {
		setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		setNewEvent({ ...newEvent, [e.target.name]: e.target.checked });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create a new event
		axios.post('/api/events', newEvent)
			.then(response => {
				onEventAdd(response.data);
				setNewEvent({ title: '', date: '', reminder: false });
			})
			.catch(error => console.error(error));
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				backgroundColor: '#212121',  // Dark gray background for form
				padding: 4,
				borderRadius: 2,
				boxShadow: 3,
				maxWidth: 500,
				margin: '0 auto',
			}}
		>
			<Typography variant="h6" align="center" sx={{ color: '#B39DDB', fontWeight: 'bold' }}>
				Add New Event
			</Typography>

			<TextField
				label="Title"
				name="title"
				value={newEvent.title}
				onChange={handleInputChange}
				required
				fullWidth
				variant="outlined"
				sx={{
					backgroundColor: '#333',  // Slightly darker background for inputs
					borderRadius: 2,
					'& .MuiInputLabel-root': {
						color: '#B39DDB',  // Purple label color
					},
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#B39DDB',  // Purple border color
						},
						'&:hover fieldset': {
							borderColor: '#9575CD',  // Lighter purple border on hover
						},
					},
				}}
			/>
			<TextField
				label="Date"
				type="date"
				name="date"
				value={newEvent.date}
				onChange={handleInputChange}
				required
				InputLabelProps={{ shrink: true }}
				fullWidth
				variant="outlined"
				sx={{
					backgroundColor: '#333',  // Slightly darker background for inputs
					borderRadius: 2,
					'& .MuiInputLabel-root': {
						color: '#B39DDB',  // Purple label color
					},
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#B39DDB',  // Purple border color
						},
						'&:hover fieldset': {
							borderColor: '#9575CD',  // Lighter purple border on hover
						},
					},
				}}
			/>
			<FormControlLabel
				control={
					<Checkbox
						name="reminder"
						checked={newEvent.reminder}
						onChange={handleCheckboxChange}
						color="primary"
					/>
				}
				label="Set Reminder"
				sx={{ color: '#fff' }}  // White label color
			/>

			<Button
				type="submit"
				variant="contained"
				sx={{
					borderRadius: 20,  // Rounded corners for the button
					padding: '12px 24px',
					fontWeight: 'bold',
					backgroundColor: '#B39DDB',  // Light purple background for the button
					'&:hover': {
						backgroundColor: '#9575CD',  // Lighter purple on hover
						transform: 'translateY(-3px)',  // Smooth button lift on hover
					},
					color: '#ffffff',  // White text color
					boxShadow: 3,  // Subtle shadow for a 3D effect
				}}
			>
				Add Event
			</Button>
		</Box>
	);
};

export default EventForm;
