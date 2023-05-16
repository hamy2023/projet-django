// ** React Imports
import { useEffect, useState } from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import authConfig from 'src/configs/auth'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// ** Actions
import {
  addEvent,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'

export const fetchEvents = createAsyncThunk('calendar/fetchEvents', async selectedCalendars => {
  const response = await getEvents(selectedCalendars)
  return response.data
})
// ** CalendarColors
const calendarsColor = {
  'Job challenge': 'error',
  Hackathon: 'success'
}

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const handleClose = () => {
    dispatch(handleCloseDialog())
  }
  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

        const response = await fetch('http://localhost:8000/challenge-management/plannings/', {
          headers: {
            Authorization: `JWT ${accessToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        const modifiedData = data.map(event => ({
          ...event,
          title: `${event.challenge_name}`,
          calendar: `${event.category}`,
          description: `${event.description}`,
          colorName: calendarsColor[event.category] // Assign color based on challenge type
        }))

        console.log(modifiedData)
        setData(modifiedData)
        setFilteredData(modifiedData)
      } catch (error) {
        console.error(error)
        // Handle error
      }
    }

    fetchData()
  }, [])

  // ** Vars
  const leftSidebarWidth = 300
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
  }, [dispatch, store.selectedCalendars])
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  const handleFilterNormal = () => {
    const filteredNormal = data.filter(event => event.category === 'Hackathon')
    setFilteredData(filteredNormal)
  }

  const handleFilterJob = () => {
    const filteredJob = data.filter(event => event.category === 'Job challenge')
    setFilteredData(filteredJob)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Consult challenges</Typography>
      </Grid>
      <Grid item xs={12}>
        <CalendarWrapper
          className='app-calendar'
          sx={{
            boxShadow: skin === 'bordered' ? 0 : 6,
            ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
          }}
        >
          <SidebarLeft
            store={store}
            mdAbove={mdAbove}
            dispatch={dispatch}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarWidth={leftSidebarWidth}
            handleSelectEvent={handleSelectEvent}
            handleAllCalendars={handleAllCalendars}
            handleCalendarsUpdate={handleCalendarsUpdate}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
          <Box
            sx={{
              p: 6,
              pb: 0,
              flexGrow: 1,
              borderRadius: 1,
              boxShadow: 'none',
              backgroundColor: 'background.paper',
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <Calendar
              store={store}
              dispatch={dispatch}
              direction={direction}
              updateEvent={updateEvent}
              calendarApi={calendarApi}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleSelectEvent={handleSelectEvent}
              handleLeftSidebarToggle={handleLeftSidebarToggle}
              handleAddEventSidebarToggle={handleAddEventSidebarToggle}
              data={data}
            />
          </Box>
          {
            <AddEventSidebar
              store={store}
              dispatch={dispatch}
              addEvent={addEvent}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              calendarApi={calendarApi}
              drawerWidth={addEventSidebarWidth}
              handleSelectEvent={handleSelectEvent}
              addEventSidebarOpen={addEventSidebarOpen}
              handleAddEventSidebarToggle={handleAddEventSidebarToggle}
              data={data}
            />
          }
        </CalendarWrapper>
      </Grid>
    </Grid>
  )
}

export default AppCalendar
