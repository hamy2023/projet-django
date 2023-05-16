// ** React Imports
import React, { SyntheticEvent, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { courseId } from './StepperVerticalWithNumbers'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
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
let sectionId = null
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  boxShadow: 'none !important',
  border:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[500]}` : `2px solid ${theme.palette.divider}`,
  '&:not(:last-of-type), &:last-child .MuiAccordionSummary-root:not(.Mui-expanded)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 'auto'
  },
  '&:first-of-type': {
    '& .MuiButtonBase-root': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    }
  },
  '&:last-of-type': {
    '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    }
  }
}))

// Styled component for AccordionSummary component
const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  marginBottom: -1,
  padding: theme.spacing(0, 4),
  minHeight: theme.spacing(12),
  transition: 'min-height 0.15s ease-in-out',
  backgroundColor: theme.palette.action[theme.palette.mode === 'light' ? 'selected' : 'hover'],
  borderBottom:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
  '&.Mui-expanded': {
    minHeight: theme.spacing(12)
  },
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    '&.Mui-expanded': {
      margin: '12px 0'
    }
  },
  '& .MuiTypography-root': {
    fontWeight: 400
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary
  }
}))

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(4)} !important`
}))

const AccordionCustomized = ({ sectionId }) => {
  const [details, setDetails] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(`http://localhost:8000/gamifiedcourse-management/sections/${sectionId}/content/`)
      setDetails(response.data)
    }
    fetchDetails()
  }, [])

  const [expanded, setExpanded] = useState('')

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = value => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

  return (
    <div>
      {details.map((section, index) => (
        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary
            id={`customized-panel-header-${index}`}
            expandIcon={expandIcon(`panel${index}`)}
            aria-controls={`customized-panel-content-${index}`}
          >
            <Typography>{section.subsection.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {section.texts.map(text => (
                <div key={text.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Icon icon='tabler:clipboard-text' style={{ marginRight: '0.5rem' }} />
                  {text.title}
                  <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{text.points} Eggs</span>
                </div>
              ))}
              {section.videos.map(video => (
                <div key={video.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Icon icon='tabler:player-skip-forward' style={{ marginRight: '0.5rem' }} />
                  {video.title}
                  <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{video.points} Eggs</span>
                </div>
              ))}
              {section.challenges.map(challenge => (
                <div key={challenge.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Icon icon='tabler:trophy' style={{ marginRight: '0.5rem' }} />
                  {challenge.title}
                  <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{challenge.points} Eggs</span>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

const CardActionCollapse = ({ sectionId }) => {
  // ** State
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Grid>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography>View Section Details</Typography>
        <IconButton
          size='small'
          aria-label='collapse'
          sx={{ color: 'text.secondary' }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon fontSize={20} icon={!collapsed ? 'tabler:chevron-down' : 'tabler:chevron-up'} />
        </IconButton>
      </div>
      <Collapse in={collapsed}>
        <AccordionCustomized sectionId={sectionId}></AccordionCustomized>
      </Collapse>
    </Grid>
  )
}

const CoursesList = () => {
  const router = useRouter()
  const [sections, setSections] = useState([])

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`http://localhost:8000/gamifiedcourse-management/courses/${courseId}/sections/`)
      setSections(response.data)
    }
    fetchSections()
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
    toast.error('not yet')
  }

  if (sections === null) {
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
          '& .first-icon': { position: 'absolute', top: -40, right: 0, opacity: 0.06, fontSize: '35rem' }
        }}
      >
        <Icon icon='tabler:list-details' className='first-icon' />
        <StepperWrapper>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {sections.map((section, index) => {
              sectionId = index + 1

              return (
                <Step key={index} className={clsx({ active: activeStep === index })}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number' /* style={{ color: '#CCCFDD' }} */>{`0${
                        index + 1
                      }`}</Typography>
                      <div>
                        <Typography className='step-title' /* style={{ color: '#63E169' }} */>
                          {section.name}
                        </Typography>
                        <Typography variant='body2' /* sx={{ color: '#CCCFDD' }} */>14 hours</Typography>
                      </div>
                    </div>
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ /* color: '#CCCFDD', */ mb: 5 }}>{section.description}</Typography>
                    <CardActionCollapse sectionId={section.id}></CardActionCollapse>

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
                        disabled={activeStep === sections.length - 1}
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
        {activeStep === sections.length && (
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
