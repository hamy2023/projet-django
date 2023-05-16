import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchEvents = createAsyncThunk(
  'appCalendar/fetchEvents',
  async ({ category, start, end, description }, { getState }) => {
    const selectedCalendars = getState().appCalendar.selectedCalendars
    const response = await axios.get('/apps/calendar/events', {
      params: {
        calendars: selectedCalendars,
        category: category,
        start: start,
        end: end,
        description: description
      }
    })

    return response.data
  }
)

export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event, { dispatch, getState }) => {
  const response = await axios.post('/apps/calendar/add-event', {
    data: {
      event
    }
  })

  const { selectedCalendars } = getState().appCalendar
  await dispatch(fetchEvents(selectedCalendars))

  return response.data.event
})

export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch, getState }) => {
  const response = await axios.post('/apps/calendar/update-event', {
    data: {
      event
    }
  })

  const { selectedCalendars } = getState().appCalendar
  await dispatch(fetchEvents(selectedCalendars))

  return response.data.event
})

export const deleteEvent = createAsyncThunk('appCalendar/deleteEvent', async (id, { dispatch, getState }) => {
  const response = await axios.delete('/apps/calendar/remove-event', {
    params: { id }
  })

  const { selectedCalendars } = getState().appCalendar
  await dispatch(fetchEvents(selectedCalendars))

  return response.data
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: null,
    selectedCalendars: ['Hackathon', 'Job Challenge'],
    isOpen: false
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleCloseDialog: state => {
      state.isOpen = false // Close the dialog
    },
    handleCalendarsUpdate: key => (dispatch, getState) => {
      const selectedCalendars = getState().appCalendar.selectedCalendars
      const category = key === 'Hackathon' ? 'Hackathon' : key === 'Job challenge' ? 'Job Challenge' : null

      if (category) {
        dispatch(fetchEvents(category))
      }

      const filterIndex = selectedCalendars.findIndex(i => i === key)
      if (selectedCalendars.includes(key)) {
        dispatch(handleCalendarsUpdate(selectedCalendars.filter(i => i !== key)))
      } else {
        dispatch(handleCalendarsUpdate([...selectedCalendars, key]))
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedCalendars = ['Hackathon', 'Job challenge']
      } else {
        state.selectedCalendars = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})

export const { handleSelectEvent, handleCalendarsUpdate } = appCalendarSlice.actions

export default appCalendarSlice.reducer
