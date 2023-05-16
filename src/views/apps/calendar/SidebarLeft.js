import { useRouter } from 'next/router'

// ** MUI Imports

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import {
  addEvent,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  fetchEvents,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'
import { Grid } from '@mui/material'

export const handleFilterUpdate = selectedCalendars => async dispatch => {
  await dispatch(handleCalendarsUpdate(selectedCalendars))
  await dispatch(fetchEvents(selectedCalendars))
}
const SidebarLeft = props => {
  const {
    store,
    mdAbove,
    dispatch,
    calendarApi,
    calendarsColor,
    leftSidebarOpen,
    leftSidebarWidth,
    handleSelectEvent,
    handleAllCalendars,
    handleCalendarsUpdate,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props

  const colorsArr = calendarsColor ? Object.entries(calendarsColor) : []

  const renderFilters = colorsArr.length
    ? colorsArr.map(([key, value]) => {
        return (
          <FormControlLabel
            key={key}
            label={key}
            control={
              <Checkbox
                color={value}
                checked={store.selectedCalendars.includes(key)}
                onChange={() => dispatch(handleFilterUpdate([key]))}
              />
            }
          />
        )
      })
    : null
  const router = useRouter()
  const handleCreateChallengeClick = () => {
    router.push('/challenges/create_challenge') // navigate to the desired page
  }
  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    dispatch(handleSelectEvent(null))
  }
  if (renderFilters) {
    return (
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          disableAutoFocus: true,
          disableScrollLock: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 2,
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            borderRadius: 1,
            boxShadow: 'none',
            width: leftSidebarWidth,
            borderTopRightRadius: 0,
            alignItems: 'flex-start',
            borderBottomRightRadius: 0,
            zIndex: mdAbove ? 2 : 'drawer',
            position: mdAbove ? 'static' : 'absolute'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >
        <Box sx={{ p: 6, width: '100%' }}>
          <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleCreateChallengeClick}>
            <Icon icon='tabler:plus' fontSize='1.125rem' />
            Create a challenge
          </Button>
        </Box>

        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <DatePickerWrapper
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' }
          }}
        >
          <DatePicker inline onChange={date => calendarApi.gotoDate(date)} />
        </DatePickerWrapper>
        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <Box sx={{ p: 6, width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography variant='body2' sx={{ mb: 2, color: 'text.disabled', textTransform: 'uppercase' }}>
            Guide
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={1.5}>
              <Icon icon='tabler:circle-filled' color='green' />
            </Grid>
            <Grid item xs={1}>
              <Typography variant='body2' sx={{ mb: 2, ml: 1, textTransform: 'uppercase' }}>
                Hackathon
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={10}>
            <Grid item xs={1}>
              <Icon icon='tabler:circle-filled' color='red' />
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body2' sx={{ mb: 2, textTransform: 'uppercase' }}>
                Job Challenge
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    )
  } else {
    return null
  }
}

export default SidebarLeft
