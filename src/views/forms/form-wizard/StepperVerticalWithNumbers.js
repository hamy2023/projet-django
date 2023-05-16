// ** React Imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { PathId } from 'src/pages/learningpaths/consult'

// ** MUI Imports
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import StepContent from '@mui/material/StepContent'
import Icon from 'src/@core/components/icon'
import Avatar from 'src/@core/components/mui/avatar'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Third Party Imports
import clsx from 'clsx'
import toast from 'react-hot-toast'

// ** Custom Components Imports
import StepperCustomDot from 'src/pages/learningpaths/details/steppericon'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

export let courseId = null
const CoursesList = () => {
  const router = useRouter()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(
        `http://localhost:8000/gamifiedcourse-management/learning-paths/${PathId}/gamified-courses/`
      )
      setCourses(response.data.gamified_courses)
    }
    fetchCourses()
  }, [])
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }
  const handleClick = async index => {
    courseId = index
    console.log(courseId)
    router.push('/gamifiedcourses/details/')
  }

  if (courses === null) {
    // Loading state
    return <div>Loading...</div>
  }

  return (
    <Card
      sx={{
        border: 0,
        boxShadow: 0
        /* color: 'common.white' */
      }}
    >
      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          p: theme => `${theme.spacing(3.25, 5, 4.5)} !important`,
          '& .first-icon': { position: 'absolute', top: -40, right: 0, opacity: 0.06, fontSize: '30rem' }
        }}
      >
        <Icon icon='tabler:device-gamepad-2' className='first-icon' />
        <StepperWrapper>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {courses.map((course, index) => {
              return (
                <Step key={index} className={clsx({ active: activeStep === index })}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number' /* style={{ color: '#CCCFDD' }} */>{`0${
                        index + 1
                      }`}</Typography>
                      <div>
                        <a
                          href='#'
                          onClick={() => handleClick(course.id)}
                          style={{ textDecoration: 'none' /* , color: '#CCCFDD' */ }}
                        >
                          <Typography className='step-title' /* style={{ color: '#63E169' }} */>
                            {course.name}
                          </Typography>
                        </a>
                        <Typography variant='body2' /* sx={{ color: '#CCCFDD' }} */>14 hours</Typography>
                      </div>
                    </div>
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ /* color: '#CCCFDD', */ mb: 5 }}>{course.description}</Typography>
                    <Box
                      sx={{
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center' /* */
                      }}
                    >
                      <CustomAvatar skin='light-static' color='error' sx={{ width: 34, height: 34, mr: 2.75 }}>
                        NM
                      </CustomAvatar>
                      <Typography variant='body2' sx={{ /* color: 'common.white', */ fontWeight: 'bold' }}>
                        Naila Marir
                      </Typography>
                    </Box>
                    <div className='button-wrapper'>
                      <Button
                        size='small'
                        color='secondary'
                        variant='outlined'
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        Back
                      </Button>
                      <Button
                        size='small'
                        variant='contained'
                        onClick={handleNext}
                        sx={{ ml: 4 }}
                        disabled={activeStep === courses.length - 1}
                      >
                        Next
                      </Button>
                    </div>
                  </StepContent>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
        {activeStep === courses.length && (
          <Box sx={{ mt: 2 }}>
            <Typography>All steps are completed!</Typography>
            <Button size='small' sx={{ mt: 2 }} variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default CoursesList
