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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'
import { createId } from 'src/pages/gamifiedcourses/mine'

const TabDetails = () => {
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
      <FormControl sx={{ width: '100%', mb: 5 }}>
        <InputLabel id='section'>Section</InputLabel>
        <Select
          label='Section'
          defaultValue=''
          id='section'
          labelId='Section'
          value={value}
          onChange={handleChange}
          sx={{ width: '100%' }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {sections.map(section => (
            <MenuItem key={section.id} value={section.name}>
              {section.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField id='outlined-basic' label='Sub Section Title' sx={{ width: '100%', mb: 20 }}></TextField>
    </div>
  )
}

export default TabDetails
