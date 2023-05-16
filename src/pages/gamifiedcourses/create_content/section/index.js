// ** React Imports
import React, { SyntheticEvent, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Document, Page } from 'react-pdf/dist/esm/entry.vite'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import Modal from 'react-modal'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createId } from '../../mine'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
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

const VideoModal = ({ video, subsection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState('')
  const [sub, setSub] = useState('')
  const [vid, setVid] = useState('')
  const [vidP, setVidP] = useState('')
  const [vidF, setVidF] = useState('')
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditVideo = async e => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('subsection_name', sub)
      formData.append('title', vid)
      formData.append('points', vidP)
      formData.append('video_file', vidF)
      const videoResponse = await fetch(`http://localhost:8000/gamifiedcourse-management/video/${id}/`, {
        method: 'PUT',
        body: formData
      })
      const videoData = await videoResponse.json()
      console.log(videoData)

      toast.success('Video Updated!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }
  const handleDeleteVideo = async e => {
    e.preventDefault()
    try {
      const videoResponse = await fetch(`http://localhost:8000/gamifiedcourse-management/video/${id}/delete/`, {
        method: 'Delete'
      })

      setOpen1(false)
      toast.success('Video Deleted!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }

  const handleVideoUpload = event => {
    setVidF(event.target.files[0])
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div key={video.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <Icon icon='tabler:player-skip-forward' style={{ marginRight: '0.5rem' }} />
      <span style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
        {video.title}
      </span>
      <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{video.points} Eggs</span>
      <IconButton
        color='primary'
        size='small'
        onClick={event => {
          event.stopPropagation()
          setId(video.id)
          setSub(subsection)
          setVid(video.title)
          setVidP(video.points)
          setVidF(video.video_file)
          setOpen(true) // Open the edit dialog
        }}
      >
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton
        color='error'
        size='small'
        onClick={event => {
          event.stopPropagation()
          setId(video.id)
          setOpen1(true) // Open the edit dialog
        }}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>

      <Dialog open={isOpen} onClose={handleCloseModal} maxWidth='md'>
        <div style={{ padding: '1rem' }}>
          <video
            src={`http://localhost:8000/${video.video_file}`}
            controls
            autoPlay
            style={{ width: '100%', height: 'auto', outline: 'none' }}
          />
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Dialog>
      <Dialog fullWidth open={open} scroll='body' maxWidth='md' onClose={handleClose} onBackdropClick={handleClose}>
        <DialogContent>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Video Content
            </Typography>
          </Box>
          <div>
            <TextField
              id='outlined-basic'
              label='Sub Section Title'
              sx={{ width: '100%', mb: 5 }}
              value={sub}
              onChange={e => setSub(e.target.value)}
            ></TextField>
            <TextField
              id='outlined-basic'
              label='Video Title'
              sx={{ width: '100%', mb: 5 }}
              value={vid}
              onChange={e => setVid(e.target.value)}
            ></TextField>
            <TextField
              type='number'
              label='Points'
              value={vidP}
              onChange={e => setVidP(e.target.value)}
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
              id='course-video'
              type='file'
              name='video'
              onChange={handleVideoUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant='contained' onClick={handleEditVideo}>
              {' '}
              Save{' '}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box bgcolor='error.main' style={{ backgroundColor: 'transparent' }} p={2}>
          <DialogContent>
            <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Delete Action
              </Typography>
            </Box>
            <Alert variant='outlined' color='error'>
              Do you really want to delete this video content?
            </Alert>
          </DialogContent>

          <DialogActions className='dialog-actions-dense'>
            <Button color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button color='error' onClick={handleDeleteVideo}>
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  )
}

const TextModal = ({ text, subsection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [numPages, setNumPages] = useState(null)
  const [id, setId] = useState(null)
  const [sub, setSub] = useState('')
  const [textt, setText] = useState('')
  const [textP, setTextP] = useState(null)
  const [textC, setTextC] = useState('')
  const [textF, setTextF] = useState('')
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)

  const handleEditText = async e => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('subsection_name', sub)
      formData.append('title', textt)
      formData.append('content', textC)
      formData.append('points', textP)
      formData.append('pdf_file', textF)
      const textResponse = await fetch(`http://localhost:8000/gamifiedcourse-management/text/${id}/`, {
        method: 'PUT',
        body: formData
      })
      const textData = await textResponse.json()
      console.log(textData)

      toast.success('Text Updated!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }
  const handleDeleteText = async e => {
    e.preventDefault()
    try {
      const videoResponse = await fetch(`http://localhost:8000/gamifiedcourse-management/text/${id}/delete/`, {
        method: 'Delete'
      })

      setShow1(false)
      toast.success('Text Content Deleted!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }

  const handleTextUpload = event => {
    setTextF(event.target.files[0])
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  return (
    <div key={text.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <Icon icon='tabler:clipboard-text' style={{ marginRight: '0.5rem' }} />
      <span style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
        {text.title}
      </span>
      <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{text.points} Eggs</span>
      <IconButton
        color='primary'
        size='small'
        onClick={event => {
          event.stopPropagation()
          setId(text.id)
          setSub(subsection)
          setText(text.title)
          setTextC(text.content)
          setTextP(text.points)
          setTextF(text.pdf_file)
          setShow(true) // Open the edit dialog
        }}
      >
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton
        color='error'
        size='small'
        onClick={event => {
          event.stopPropagation()
          setId(text.id)
          setShow1(true) // Open the edit dialog
        }}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>

      <Dialog open={isOpen} onClose={handleCloseModal} maxWidth='md'>
        <div style={{ padding: '1rem' }}>
          <Document file={`http://localhost:8000/${text.pdf_file}`} onLoadSuccess={onDocumentLoadSuccess}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {Array.from({ length: numPages }, (_, index) => (
                <div key={index + 1} style={{ marginBottom: 0 }}>
                  <Page pageNumber={index + 1} width={600} renderTextLayer={false} />
                </div>
              ))}
            </div>
          </Document>
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Dialog>
      <Dialog fullWidth open={show} scroll='body' maxWidth='md' onClose={handleClose} onBackdropClick={handleClose}>
        <DialogContent>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Text Content
            </Typography>
          </Box>
          <div>
            <TextField
              id='outlined-basic'
              label='Sub Section Title'
              sx={{ width: '100%', mb: 5 }}
              value={sub}
              onChange={e => setSub(e.target.value)}
            ></TextField>
            <TextField
              id='outlined-basic'
              label='Content Title'
              sx={{ width: '100%', mb: 5 }}
              value={textt}
              onChange={e => setText(e.target.value)}
            ></TextField>
            <TextField
              fullWidth
              label='Content'
              value={textC}
              onChange={e => setTextC(e.target.value)}
              placeholder='Challenge Content'
              multiline
              rows={4}
              sx={{ width: '100%', mb: 5 }}
            />
            <TextField
              type='number'
              label='Points'
              value={textP}
              onChange={e => setTextP(e.target.value)}
              id='form-props-number'
              InputLabelProps={{ shrink: true }}
              sx={{ width: '100%', mb: 5 }}
            />
            <label htmlFor='course-video' style={{ display: 'inline-block' }}>
              <Button variant='contained' component='span'>
                Upload Pdf
              </Button>
            </label>

            <input
              required
              id='course-video'
              type='file'
              name='video'
              onChange={handleTextUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant='contained' onClick={handleEditText}>
              {' '}
              Save{' '}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={show1}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box bgcolor='error.main' style={{ backgroundColor: 'transparent' }} p={2}>
          <DialogContent>
            <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Delete Action
              </Typography>
            </Box>
            <Alert variant='outlined' color='error'>
              Do you really want to delete this text content?
            </Alert>
          </DialogContent>

          <DialogActions className='dialog-actions-dense'>
            <Button color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button color='error' onClick={handleDeleteText}>
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  )
}

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(4)} !important`
}))

const AccordionCustomized = ({ sectionId }) => {
  const [id, setId] = useState('')
  const [sec, setSec] = useState('')
  const [sub, setSub] = useState('')
  const [challenge, setChallenge] = useState('')
  const [challengeP, setChallengeP] = useState(null)
  const [challengeC, setChallengeC] = useState('')
  const [code, setCode] = useState(false)
  const [vr, setVr] = useState(false)
  const [quiz, setQuiz] = useState(false)
  const [sections, setSections] = useState([])
  const [details, setDetails] = useState([])
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
    setShow(false)
    setShow1(false)
  }
  const handleEditSub = async e => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', sub)
      formData.append('section_name', sec)
      const subsectionResponse = await fetch(`http://localhost:8000/gamifiedcourse-management/subsections/${id}/`, {
        method: 'PUT',
        body: formData
      })
      const subsectionData = await subsectionResponse.json()
      console.log(subsectionData)

      toast.success('Sub Section Updated!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }
  const handleDeleteSub = async e => {
    e.preventDefault()
    try {
      const subsectionResponse = await fetch(
        `http://localhost:8000/gamifiedcourse-management/subsections/${id}/delete/`,
        {
          method: 'Delete'
        }
      )

      setShow1(false)
      toast.success('Sub Section Deleted!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }
  const handleDeleteChallenge = async e => {
    e.preventDefault()
    try {
      const challengeResponse = await fetch(`http://localhost:8000/gamifiedcourse-management/challenge/${id}/delete/`, {
        method: 'Delete'
      })

      setOpen1(false)
      toast.success('Challenge Deleted!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }
  const handleEditChallenge = async e => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('subsection_name', sub)
      formData.append('title', challenge)
      formData.append('content', challengeC)
      formData.append('points', challengeP)
      formData.append('quiz', quiz)
      formData.append('editor', code)
      formData.append('vr', vr)
      const challengeResponse = await fetch(`http://localhost:8000/gamifiedcourse-management/challenge/${id}/`, {
        method: 'PUT',
        body: formData
      })
      const challengeData = await challengeResponse.json()
      console.log(challengeData)

      toast.success('Challenge Updated!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`http://localhost:8000/gamifiedcourse-management/courses/${createId}/sections/`)
      setSections(response.data)
    }
    fetchSections()
  }, [])

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
            expandIcon={null}
            aria-controls={`customized-panel-content-${index}`}
          >
            <Typography sx={{ mr: 20 }}>{section.subsection.title}</Typography>
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                color='primary'
                size='small'
                onClick={event => {
                  event.stopPropagation()
                  setId(section.subsection.id)
                  setSub(section.subsection.title)
                  setSec(section)
                  setExpanded(false) // Close the accordion
                  setShow(true) // Open the edit dialog
                }}
              >
                <EditIcon fontSize='small' />
              </IconButton>
              <IconButton
                color='error'
                size='small'
                onClick={event => {
                  event.stopPropagation()
                  setId(section.subsection.id)
                  setExpanded(false) // Close the accordion
                  setShow1(true) // Open the edit dialog
                }}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {section.texts.map(text => (
                <TextModal key={text.id} text={text} subsection={section.subsection.title} />
              ))}
              {section.videos.map(video => (
                <VideoModal key={video.id} video={video} subsection={section.subsection.title} />
              ))}

              {section.challenges.map(challenge => (
                <div key={challenge.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Icon icon='tabler:trophy' style={{ marginRight: '0.5rem' }} />
                  {challenge.title}
                  <span style={{ marginLeft: 'auto', fontWeight: 'bold', marginRight: '3px' }}>
                    {challenge.points} Eggs
                  </span>
                  <IconButton
                    color='primary'
                    size='small'
                    onClick={event => {
                      event.stopPropagation()
                      setId(challenge.id)
                      setSub(section.subsection.title)
                      setChallenge(challenge.title)
                      setChallengeC(challenge.content)
                      setChallengeP(challenge.points)
                      setQuiz(challenge.quiz)
                      setCode(challenge.editor)
                      setVr(challenge.vr)
                      setExpanded(false) // Close the accordion
                      setOpen(true) // Open the edit dialog
                    }}
                  >
                    <EditIcon fontSize='small' />
                  </IconButton>
                  <IconButton
                    color='error'
                    size='small'
                    onClick={event => {
                      event.stopPropagation()
                      setId(challenge.id)
                      setExpanded(false) // Close the accordion
                      setOpen1(true) // Open the edit dialog
                    }}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Dialog fullWidth open={show} scroll='body' maxWidth='md' onClose={handleClose} onBackdropClick={handleClose}>
        <DialogContent>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Sub Section
            </Typography>
          </Box>
          <div>
            <FormControl sx={{ width: '100%', mb: 5 }}>
              <InputLabel id='section'>Section</InputLabel>
              <Select
                label='Section'
                defaultValue=''
                id='section'
                labelId='Section'
                value={sec}
                onChange={e => setSec(e.target.value)}
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
            <TextField
              id='outlined-basic'
              label='Sub Section Title'
              sx={{ width: '100%', mb: 20 }}
              value={sub}
              onChange={e => setSub(e.target.value)}
            ></TextField>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant='contained' onClick={handleEditSub}>
              {' '}
              Save{' '}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog fullWidth open={open} scroll='body' maxWidth='md' onClose={handleClose} onBackdropClick={handleClose}>
        <DialogContent>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Challenge
            </Typography>
          </Box>
          <div>
            <TextField
              id='outlined-basic'
              label='Sub Section Title'
              sx={{ width: '100%', mb: 5 }}
              value={sub}
              onChange={e => setSub(e.target.value)}
            ></TextField>
            <TextField
              id='outlined-basic'
              label='Challenge Title'
              sx={{ width: '100%', mb: 5 }}
              value={challenge}
              onChange={e => setChallenge(e.target.value)}
            ></TextField>
            <TextField
              fullWidth
              label='Content'
              value={challengeC}
              onChange={e => setChallengeC(e.target.value)}
              placeholder='Challenge Content'
              multiline
              rows={4}
              sx={{ width: '100%', mb: 5 }}
            />
            <TextField
              type='number'
              label='Points'
              value={challengeP}
              onChange={e => setChallengeP(e.target.value)}
              id='form-props-number'
              InputLabelProps={{ shrink: true }}
              sx={{ width: '100%', mb: 5 }}
            />
            <FormControlLabel
              control={<Checkbox checked={quiz} onChange={e => setQuiz(e.target.checked)} color='primary' />}
              label='Quiz'
            />
            <FormControlLabel
              control={<Checkbox checked={code} onChange={e => setCode(e.target.checked)} color='primary' />}
              label='Code Editor'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={vr}
                  onChange={e => {
                    setVr(e.target.checked)
                  }}
                  color='primary'
                />
              }
              label='VR Experience'
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant='contained' onClick={handleEditChallenge}>
              {' '}
              Save{' '}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={show1}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box bgcolor='error.main' style={{ backgroundColor: 'transparent' }} p={2}>
          <DialogContent>
            <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Delete Action
              </Typography>
            </Box>
            <Alert variant='outlined' color='error'>
              Do you really want to delete this sub section?
            </Alert>
          </DialogContent>

          <DialogActions className='dialog-actions-dense'>
            <Button color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button color='error' onClick={handleDeleteSub}>
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box bgcolor='error.main' style={{ backgroundColor: 'transparent' }} p={2}>
          <DialogContent>
            <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='tabler:x' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Delete Action
              </Typography>
            </Box>
            <Alert variant='outlined' color='error'>
              Do you really want to delete this challenge?
            </Alert>
          </DialogContent>

          <DialogActions className='dialog-actions-dense'>
            <Button color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button color='error' onClick={handleDeleteChallenge}>
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
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

const Sections = () => {
  const router = useRouter()
  const [sections, setSections] = useState([])

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`http://localhost:8000/gamifiedcourse-management/courses/${createId}/sections/`)
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
            <Typography>No sections to show!</Typography>
            <Button size='small' sx={{ mt: 2 }} variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default Sections
