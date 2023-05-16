// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/icons-material/Checkbox'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

const TabBilling = () => {
  // ** States
  const [name, setName] = useState('')

  return (
    <div>
      <Typography variant='h6' sx={{ mb: 5 }}>
        Fill in Challenge Informations
      </Typography>
      <TextField id='Challenge title' label='Challenge Title' sx={{ width: '100%', mb: 5 }}></TextField>
      <TextField
        type='number'
        label='Points'
        /* value={value} */
        id='form-props-number'
        InputLabelProps={{ shrink: true }}
        sx={{ width: '100%', mb: 5 }}
      />
      <TextField
        fullWidth
        label='Content'
        /* value={value} */
        placeholder='Challenge Content'
        multiline
        rows={4}
        sx={{ width: '100%', mb: 5 }}
        /* onChange={e => setPrizes(e.target.value)} */
      />
      <FormControlLabel
        control={
          <Checkbox
            /* checked={task.vr} */
            /* onChange={e => {
              handleTaskChange(task.id, task.description, task.points, e.target.checked, task.editor)
            }} */
            color='primary'
          />
        }
        label='VR Experience'
      />
      <FormControlLabel
        control={
          <Checkbox
            /* checked={task.editor}
            onChange={e => {
              handleTaskChange(task.id, task.description, task.points, task.vr, e.target.checked)
            }} */
            color='primary'
          />
        }
        label='Code Editor'
      />
      <FormControlLabel
        control={
          <Checkbox
            /* checked={task.editor}
            onChange={e => {
              handleTaskChange(task.id, task.description, task.points, task.vr, e.target.checked)
            }} */
            color='primary'
          />
        }
        label='Quiz'
      />
    </div>
  )
}

export default TabBilling
