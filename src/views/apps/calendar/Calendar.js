// ** React Import
import { useEffect, useRef } from 'react'
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css'

const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  extendedProps: {
    calendar: '',
    description: ''
  }
}

const Calendar = props => {
  // ** Props
  const {
    store,
    dispatch,
    direction,
    updateEvent,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
    data
  } = props

  // ** Refs
  const calendarRef = useRef()
  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi())
    }
  }, [calendarApi, setCalendarApi])

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }
  const eventRender = ({ event, el }) => {
    const timeEl = el.querySelector('.fc-time')
    const titleEl = el.querySelector('.fc-title')

    // Add challenge name to event title
    titleEl.innerHTML = `${event.title} - ${event.extendedProps.challenge_name}`

    // Append challenge name to time
    const challengeName = document.createElement('div')
    challengeName.classList.add('fc-challenge-name')
    challengeName.innerHTML = event.extendedProps.challenge_name
    timeEl.appendChild(challengeName)
  }

  if (store) {
    // ** calendarOptions(Props)
    const calendarOptions = {
      timeZone: 'UTC',
      events: data,
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'sidebarToggle,prev,next',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      // ...
      views: {
        week: {
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
        }
      },
      eventClick({ event: clickedEvent }) {
        dispatch(handleSelectEvent(clickedEvent))
        handleAddEventSidebarToggle()

        // * Only grab required field otherwise it goes in infinity loop
        // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
        // event.value = grabEventDataFromEventApi(clickedEvent)
        // isAddNewEventSidebarActive.value = true
      },

      customButtons: {
        sidebarToggle: {
          icon: 'bi bi-list',
          click() {
            handleLeftSidebarToggle()
          }
        }
      },
      eventDisplay: 'block',
      /*
            Enable dragging and resizing event
            ? Docs: https://fullcalendar.io/docs/editable
          */
      editable: false,

      /*
            Enable resizing event from start
            ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
          */
      eventResizableFromStart: true,

      /*
              Automatically scroll the scroll-containers during event drag-and-drop and date selecting
              ? Docs: https://fullcalendar.io/docs/dragScroll
            */
      dragScroll: true,

      /*
              Max number of events within a given day
              ? Docs: https://fullcalendar.io/docs/dayMaxEvents
            */
      dayMaxEvents: 1,

      /*
              Determines if day names and week names are clickable
              ? Docs: https://fullcalendar.io/docs/navLinks
            */
      navLinks: true,
      eventClassNames({ event: calendarEvent }) {
        // @ts-ignore
        const calendar = calendarEvent._def.extendedProps.calendar
        let colorName
        if (calendar === 'Job Challenge') {
          colorName = `bg-error`
        } else if (calendar === 'Hackathon') {
          colorName = 'bg-success'
        }

        return [
          // Background Color
          colorName
        ]
      },

      dateClick(info) {
        const ev = { ...blankEvent }
        ev.start = info.date
        ev.end = info.date
        ev.allDay = true

        // @ts-ignore
        dispatch(handleSelectEvent(ev))
        handleAddEventSidebarToggle()
      },

      /*
              Handle event drop (Also include dragged event)
              ? Docs: https://fullcalendar.io/docs/eventDrop
              ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
            */
      eventDrop({ event: droppedEvent }) {
        dispatch(updateEvent(droppedEvent))
      },

      /*
              Handle event resize
              ? Docs: https://fullcalendar.io/docs/eventResize
            */
      eventResize({ event: resizedEvent }) {
        dispatch(updateEvent(resizedEvent))
      },
      eventRender,
      ref: calendarRef,

      // Get direction from app state (store)
      direction
    }

    // @ts-ignore
    return <FullCalendar {...calendarOptions} />
  } else {
    return null
  }
}

export default Calendar
