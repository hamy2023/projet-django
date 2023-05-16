import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Grid } from '@mui/material'
import { Card, CardContent, CardActions, Button, Box, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

export let courseID = null

const setCourseID = value => {
  courseID = value
}
const ConsultGamifiedCourses = () => {
  const [standalones, setStandalone] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [expandedCourses, setExpandedCourses] = useState({})

  useEffect(() => {
    const fetchStandalone = async () => {
      const response = await axios.get('http://localhost:8000/gamifiedcourse-management/standalone-courses/')
      setStandalone(response.data)
    }
    fetchStandalone()
  }, [])

  const router = useRouter()
  const handleButtonClick = id => {
    setSelectedCourseId(id) // Update selectedPathId with the clicked path ID
  }

  useEffect(() => {
    if (selectedCourseId !== null) {
      setCourseID(selectedCourseId)
      console.log(courseID)
      router.push(router.asPath + '/details')
    }
  }, [selectedCourseId, router])

  const toggleExpand = courseId => {
    setExpandedCourses(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId]
    }))
  }

  const renderDescription = course => {
    const { id, description } = course
    const isExpanded = expandedCourses[id]

    if (description.length > 100) {
      const truncatedText = description.substring(0, 100) + '...'

      if (isExpanded) {
        return (
          <>
            <Typography variant='body2' sx={{ mb: 3 }}>
              {description}
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: 'primary', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
              onClick={() => toggleExpand(id)}
            >
              Collapse
            </Typography>
          </>
        )
      } else {
        return (
          <>
            <Typography variant='body2' sx={{ mb: 3 }}>
              {truncatedText}
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: 'primary', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
              onClick={() => toggleExpand(id)}
            >
              Read More
            </Typography>
          </>
        )
      }
    } else {
      return (
        <Typography variant='body2' sx={{ mb: 3 }}>
          {description}
        </Typography>
      )
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Gamified Courses</Typography>
      </Grid>
      {standalones.map(standalone => (
        <Grid item xs={6}>
          <Card sx={{ border: 0.75, boxShadow: 20 }}>
            <CardContent
              sx={{
                position: 'relative',
                zIndex: 1,
                p: theme => `${theme.spacing(3.25)} ${theme.spacing(5)} ${theme.spacing(4.5)} !important`,
                '& .first-icon': { position: 'absolute', top: -30, right: 0, opacity: 0.06, fontSize: '20rem' }
              }}
            >
              <Icon icon='tabler:device-gamepad-2' className='first-icon' />

              <Typography variant='h6' sx={{ display: 'flex', mb: 2.75, alignItems: 'center', '& svg': { mr: 2.5 } }}>
                <Icon icon='tabler:brand-python' color='#00e676' sx={{}} />
                {standalone.name}
              </Typography>
              {renderDescription(standalone)}
            </CardContent>
            <CardActions className='card-action-dense'>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => handleButtonClick(standalone.id)}>See Gamified Course details</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 14 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
                    <Icon icon='tabler:users' />
                    <Typography variant='body2'>3.2k</Typography>
                  </Box>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ConsultGamifiedCourses
