import { PathId } from '../consult'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, CardContent, CardHeader, Button, Box, Container, styled } from '@mui/material'
import Divider from '@mui/material/Divider'
import Icon from 'src/@core/components/icon'
import CoursesList from 'src/views/forms/form-wizard/StepperVerticalWithNumbers'

const LearningPathInfo = () => {
  const [path, setPath] = useState({})

  useEffect(() => {
    const fetchPath = async () => {
      const response = await axios.get(`http://localhost:8000/learningpath-management/learning-paths/${PathId}/`)
      setPath(response.data)
    }
    fetchPath()
  }, [])

  const CustomDivider = styled(Divider)({
    height: '5px',
    marginLeft: '10px'
  })
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          border: 0.5,
          boxShadow: 0,
          color: 'common.white',
          backgroundColor: '#2F3348',
          mb: 10
        }}
      >
        <CardContent
          sx={{
            mt: 7,
            position: 'relative',
            zIndex: 1,
            p: theme => `${theme.spacing(3.25, 5, 4.5)} !important`,
            '& .first-icon': { position: 'absolute', top: -40, right: 0, opacity: 0.06, fontSize: '30rem' }
          }}
        >
          <Icon icon='tabler:route' className='first-icon' />
          <Typography variant='body2' sx={{ color: '#9BA3AB' }}>
            <strong>
              <span>L</span>
              <span>&nbsp;</span>
              <span>E</span>
              <span>&nbsp;</span>
              <span>A</span>
              <span>&nbsp;</span>
              <span>R</span>
              <span>&nbsp;</span>
              <span>N</span>
              <span>&nbsp;</span>
              <span>I</span>
              <span>&nbsp;</span>
              <span>N</span>
              <span>&nbsp;</span>
              <span>G</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>P</span>
              <span>&nbsp;</span>
              <span>A</span>
              <span>&nbsp;</span>
              <span>T</span>
              <span>&nbsp;</span>
              <span>H</span>
            </strong>
          </Typography>
          <Typography
            variant='h4'
            sx={{ display: 'flex', mb: 8, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
          >
            {path.name}
          </Typography>
          {/* <Typography variant='subtitle1' sx={{ mb: 10, color: '#CCCFDD' }}>
            {path.description}
          </Typography> */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
                <Icon icon='tabler:brand-python' />
                <Typography variant='body2' sx={{ color: 'common.white' }}>
                  Python
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
                <Icon icon='tabler:clock' />
                <Typography variant='body2' sx={{ color: 'common.white' }}>
                  14 hours
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
                <Icon icon='tabler:clock' />
                <Typography variant='body2' sx={{ color: 'common.white' }}>
                  {path.gamified_courses_count} Gamified Courses
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Typography variant='h6' sx={{ display: 'flex', mb: 3, alignItems: 'center', '& svg': { mr: 2.5 } }}>
        <Icon icon='tabler:file-description' opacity='0.8' />
        Path Description
        <Box sx={{ flexGrow: 1 }}>
          <Divider sx={{ height: '5px', ml: 3, borderBottomWidth: '1.5px' }} />
        </Box>
      </Typography>

      <Typography variant='subtitle1' sx={{ mb: 10 }}>
        {path.description}
      </Typography>
      <Typography variant='h6' sx={{ display: 'flex', mb: 3, alignItems: 'center', '& svg': { mr: 2.5 } }}>
        <Icon icon='tabler:list-numbers' opacity='0.8' />
        Path Content
        <Box sx={{ flexGrow: 1 }}>
          <Divider sx={{ height: '5px', ml: 3, borderBottomWidth: '1.5px' }} />
        </Box>
      </Typography>
    </Grid>
  )
}

const PathDetail = () => {
  return (
    <Grid container spacing={6} justifyContent='center' alignItems='center'>
      <Grid item xs={12}>
        <LearningPathInfo />
      </Grid>
      <Grid item xs={12}>
        <CoursesList />
      </Grid>
    </Grid>
  )
}

export default PathDetail
