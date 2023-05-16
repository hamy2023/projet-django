// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const TabDatabase = () => {
  const [value, setValue] = useState('firebase')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <Typography variant='h6' sx={{ mb: 5 }}>
        Fill in Text Content Informations
      </Typography>
      <TextField id='Text title' label='Content Title' sx={{ width: '100%', mb: 5 }}></TextField>
      <TextField
        type='number'
        label='Points'
        value={value}
        id='form-props-number'
        InputLabelProps={{ shrink: true }}
        sx={{ width: '100%', mb: 5 }}
      />
      <TextField
        fullWidth
        label='Content'
        /* value={value} */
        placeholder='Text Content'
        multiline
        rows={4}
        sx={{ width: '100%', mb: 5 }}
        /* onChange={e => setPrizes(e.target.value)} */
      />
      <label htmlFor='course-pdf' style={{ display: 'inline-block' }}>
        <Button variant='contained' component='span'>
          Upload Pdf
        </Button>
      </label>
      <input
        required
        accept='application/pdf'
        id='course-pdf'
        type='file'
        name='pdf'
        /* onChange={handleVideoUpload} */
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default TabDatabase
