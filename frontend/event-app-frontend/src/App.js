// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { Container, Typography, AppBar, Toolbar, CssBaseline, Box } from '@mui/material';
import './App.css';

const App = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		// Fetch events from the server
		axios.get('/api/events')
			.then(response => setEvents(response.data))
			.catch(error => console.error(error));
	}, []);

	const handleEventAdd = (newEvent) => {
		setEvents([...events, newEvent]);
	};

	const handleEventDelete = (id) => {
		// Delete an event
		axios.delete(`/api/events/${id}`)
			.then(() => setEvents(events.filter(event => event._id !== id)))
			.catch(error => console.error(error));
	};

	const handleToggleReminder = (eventId) => {
		// Find the event by ID
		const selectedEvent = events.find(event => event._id === eventId);

		// Toggle the reminder status
		const updatedEvent = {
			...selectedEvent,
			reminder: !selectedEvent.reminder
		};

		// Update the event in the database
		axios.put(`/api/events/${eventId}`, updatedEvent)
			.then(response => {
				// If the update is successful, update the events in the state
				const updatedEvents = events.map(event =>
					event._id === eventId ? updatedEvent : event
				);
				setEvents(updatedEvents);
			})
			.catch(error => console.error(`Error updating reminder status for event with ID ${eventId}:`, error));
	};

	const onEventEdit = (eventId, updatedData) => {
		// Update the event in the database
		axios.put(`/api/events/${eventId}`, updatedData)
			.then(response => {
				// If the update is successful, update the events in the state
				const updatedEvents = events.map(event =>
					event._id === eventId ? { ...event, ...updatedData } : event
				);
				setEvents(updatedEvents);
			})
			.catch(error => console.error(`Error updating event with ID ${eventId}:`, error));
	};

	return (
		<Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
			<CssBaseline />
			<Container maxWidth="lg" className="main-container" sx={{ paddingTop: 4 }}>
				{/* AppBar Section */}
				<AppBar position="sticky" sx={{ marginBottom: 4, backgroundColor: '#000' }}>
					<Toolbar>
						<Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
							Event Management App
						</Typography>
					</Toolbar>
				</AppBar>

				{/* Title Section */}
				<Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
					Event Management App
				</Typography>

				{/* Event Form Section */}
				<EventForm onEventAdd={handleEventAdd} />

				{/* Event List Section */}
				<EventList
					events={events}
					onEventDelete={handleEventDelete}
					onToggleReminder={handleToggleReminder}
					onEventEdit={onEventEdit}
				/>
			</Container>
		</Box>
	);
};

export default App;
