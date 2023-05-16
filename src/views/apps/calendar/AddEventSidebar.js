// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'
import { styled } from '@mui/material/styles'

// ** MUI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const defaultState = {
  title: '',
  calendar: '',
  startDate: new Date(),
  endDate: new Date(),
  description: ''
}

const AddEventSidebar = props => {
  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle,
    data,
    theme
  } = props

  // ** States
  const [values, setValues] = useState(defaultState)

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = data => {
    const modifiedEvent = {
      display: 'block',
      title: event.title,
      end: event.end,
      start: event.start,
      extendedProps: {
        calendar: event.category,
        description: values.description.length ? values.description : undefined
      }
    }
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(modifiedEvent))
    } else {
      dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    }
    calendarApi.refetchEvents()
    handleSidebarClose()
  }

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent(store.selectedEvent.id))
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const handleStartDate = date => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = async e => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      const Data = await fetch(`http://localhost:8000/challenge-management/plannings/${event.id}`)
      const showData = await Data.json()
      console.log(showData)
      setValues({
        title: showData.challenge_name || '',
        calendar: showData.category || '',
        endDate: showData.end !== null ? event.end : event.start,
        startDate: showData.start !== null ? event.start : new Date(),
        description: showData.description || ''
      })
    }
  }

  const CustomDatePickerInputStart = ({ value, onClick }) => (
    <input type='text' value={values.startDate} readOnly={true} />
  )

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])

  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])
  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  return (
    <Dialog open={addEventSidebarOpen} onClose={handleSidebarClose} fullWidth maxWidth='sm'>
      <DialogTitle>Challenge Info</DialogTitle>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid fullWidth sx={{ mb: 2 }} sm={12}>
              <Controller
                name='title'
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Title'
                    variant='outlined'
                    margin='normal'
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    onChange={e => setValues({ ...values, title: e.target.value })}
                    value={values.title}
                    readOnly
                    InputProps={{ readOnly: true }}
                    /* sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'error'
                      }
                    }} */
                  />
                )}
              />
            </Grid>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                label='Category'
                labelId='event-category'
                onChange={e => setValues({ ...values, calendar: e.target.value })}
                value={values.calendar}
                readOnly
                InputProps={{ readOnly: true }}
              />
            </FormControl>

            <Box sx={{ mb: 4 }}>
              <DatePicker
                selectsStart
                id='event-start-date'
                endDate={values.endDate}
                selected={values.startDate}
                startDate={values.startDate}
                showTimeSelect={!values.allDay}
                dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='Start Date' registername='startDate' />}
                onChange={date => setValues({ ...values, startDate: new Date(date) })}
                readOnly
                InputProps={{ readOnly: true }}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <DatePicker
                selectsEnd
                id='event-end-date'
                endDate={values.endDate}
                selected={values.endDate}
                minDate={values.startDate}
                startDate={values.startDate}
                showTimeSelect={!values.allDay}
                dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='End Date' registername='endDate' />}
                onChange={date => setValues({ ...values, endDate: new Date(date) })}
                readOnly
              />
            </Box>

            <TextField
              fullWidth
              label='Description'
              variant='outlined'
              margin='normal'
              onChange={e => setValues({ ...values, description: e.target.value })}
              value={values.description}
              multiline
              rows={4}
              InputProps={{ readOnly: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSidebarClose} color='secondary'>
              Close
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  )
}

export default AddEventSidebar
