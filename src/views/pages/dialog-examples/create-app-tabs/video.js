// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'

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
import { createId } from 'src/pages/gamifiedcourses/mine'

const TabFramework = () => {
  const [value, setValue] = useState('ecommerce')
  const [sections, setSections] = useState([])

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`http://localhost:8000/gamifiedcourse-management/courses/${createId}/sections/`)
      setSections(response.data)
    }
    fetchSections()
  }, [])
  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <Typography variant='h6' sx={{ mb: 5 }}>
        Fill in Video Informations
      </Typography>
      <TextField id='video title' label='Video Title' sx={{ width: '100%', mb: 5 }}></TextField>
      <TextField
        type='number'
        label='Points'
        value={value}
        id='form-props-number'
        InputLabelProps={{ shrink: true }}
        sx={{ width: '100%', mb: 5 }}
      />
      <label htmlFor='course-video' style={{ display: 'inline-block' }}>
        <Button variant='contained' component='span'>
          Upload Video
        </Button>
      </label>
      <input
        required
        accept='video/*'
        id='course-video'
        type='file'
        name='video'
        /* onChange={handleVideoUpload} */
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default TabFramework
