// ** React Imports
import { useState, forwardRef, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// ** MUI Imports
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'
import { createId } from '../mine'
// ** Tab Content Imports
import DialogTabDetails from 'src/views/pages/dialog-examples/create-app-tabs/subsection'
import DialogTabBilling from 'src/views/pages/dialog-examples/create-app-tabs/challenge'
import DialogTabDatabase from 'src/views/pages/dialog-examples/create-app-tabs/text'
import DialogTabFramework from 'src/views/pages/dialog-examples/create-app-tabs/video'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = props => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            ...(active
              ? { color: 'common.white', backgroundColor: 'primary.main' }
              : { backgroundColor: 'action.selected' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography sx={{ textTransform: 'none' }}>{title}</Typography>
          <Typography variant='caption' sx={{ textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
const tabsArr = ['General', 'Video', 'Text & Pdf', 'Challenge']

const PreviewActions = () => {
  const [sec, setSec] = useState('')
  const [sub, setSub] = useState('')
  const [vid, setVid] = useState('')
  const [vidP, setVidP] = useState('')
  const [vidF, setVidF] = useState('')
  const [text, setText] = useState('')
  const [textP, setTextP] = useState('')
  const [textC, setTextC] = useState('')
  const [textF, setTextF] = useState('')
  const [challenge, setChallenge] = useState('')
  const [challengeP, setChallengeP] = useState('')
  const [challengeC, setChallengeC] = useState('')
  const [code, setCode] = useState(false)
  const [vr, setVr] = useState(false)
  const [quiz, setQuiz] = useState(false)
  const [sections, setSections] = useState([])
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('General')
  const router = useRouter()

  const handleVideoUpload = event => {
    setVidF(event.target.files[0])

    // Perform the API call or further processing using the formData
  }
  const handlePdfUpload = event => {
    setTextF(event.target.files[0])

    // Perform the API call or further processing using the formData
  }

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`http://localhost:8000/gamifiedcourse-management/courses/${createId}/sections/`)
      setSections(response.data)
    }
    fetchSections()
  }, [])

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // First API call to create the subsection

      const formData = new FormData()
      formData.append('title', sub)
      formData.append('section_name', sec)
      const subsectionResponse = await fetch('http://localhost:8000/gamifiedcourse-management/subsections/create/', {
        method: 'POST',
        body: formData
      })
      const subsectionData = await subsectionResponse.json()
      console.log(subsectionData)

      // Second API call to create the video
      const videoData = new FormData()
      videoData.append('subsection_name', sub)
      videoData.append('title', vid)
      videoData.append('points', vidP)
      videoData.append('video_file', vidF)
      const videoResponse = await fetch('http://localhost:8000/gamifiedcourse-management/videos/', {
        method: 'POST',
        body: videoData
      })
      const videooData = await videoResponse.json()
      console.log(videooData)

      // Third API call to create the text
      const textData = new FormData()
      textData.append('subsection_name', sub)
      textData.append('title', text)
      textData.append('content', textC)
      textData.append('points', textP)
      textData.append('pdf_file', textF)
      const textResponse = await fetch('http://localhost:8000/gamifiedcourse-management/text/', {
        method: 'POST',
        body: textData
      })
      const texttData = await textResponse.json()
      console.log(texttData)

      // Forth API call to create the challenge
      const challengeData = new FormData()
      challengeData.append('subsection_name', sub)
      challengeData.append('title', challenge)
      challengeData.append('content', challengeC)
      challengeData.append('points', challengeP)
      challengeData.append('quiz', quiz)
      challengeData.append('editor', code)
      challengeData.append('vr', vr)
      const challengeResponse = await fetch('http://localhost:8000/gamifiedcourse-management/challenge/', {
        method: 'POST',
        body: challengeData
      })
      const challengeeData = await challengeResponse.json()
      console.log(challengeeData)

      toast.success('Content Created!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }

  const handleClose = () => {
    setShow(false)
    setActiveTab('General')
  }
  const handleFinish = () => {
    router.push('/gamifiedcourses/mine')
  }

  const handleVrChange = event => {
    setVr(event.target.checked)
  }

  const nextArrow = direction === 'ltr' ? 'tabler:arrow-right' : 'tabler:arrow-left'
  const previousArrow = direction === 'ltr' ? 'tabler:arrow-left' : 'tabler:arrow-right'

  const renderTabFooter = () => {
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeTab === 'General'}
          onClick={() => setActiveTab(prevTab)}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={activeTab === 'Challenge' ? 'success' : 'primary'}
          endIcon={<Icon icon={activeTab === 'Challenge' ? 'tabler:check' : nextArrow} />}
          onClick={() => {
            if (activeTab !== 'Challenge') {
              setActiveTab(nextTab)
            } else {
              handleSubmit(event)
            }
          }}
        >
          {activeTab === 'Challenge' ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }
  return (
    <Card>
      <CardContent>
        <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }} onClick={() => setShow(true)}>
          <Icon fontSize='1.125rem' icon='tabler:playlist-add' />
          Create content
        </Button>
        <Button fullWidth color='secondary' variant='outlined' onClick={handleFinish}>
          Finish
        </Button>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='md'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pr: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pl: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Create Section Content
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <TabContext value={activeTab}>
              <TabList
                orientation='vertical'
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  border: 0,
                  minWidth: 200,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': {
                    alignItems: 'flex-start',
                    '& .MuiTab-root': {
                      width: '100%',
                      alignItems: 'flex-start'
                    }
                  }
                }}
              >
                <Tab
                  disableRipple
                  value='General'
                  label={
                    <TabLabel
                      title='General informations'
                      subtitle='Choose a section'
                      active={activeTab === 'General'}
                      icon={<Icon icon='tabler:text-plus' />}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='Video'
                  label={
                    <TabLabel
                      title='Video'
                      icon={<Icon icon='tabler:player-skip-forward' />}
                      subtitle='Add Video'
                      active={activeTab === 'Video'}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='Text & Pdf'
                  label={
                    <TabLabel
                      title='Text & Pdf'
                      active={activeTab === 'Text & Pdf'}
                      subtitle='Add Pdf or Text'
                      icon={<Icon icon='tabler:pdf' />}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='Challenge'
                  label={
                    <TabLabel
                      title='Challenge'
                      active={activeTab === 'Challenge'}
                      subtitle='Challenge'
                      icon={<Icon icon='tabler:trophy' />}
                    />
                  }
                />
              </TabList>
              <TabPanel value='General' sx={{ flexGrow: 1, p: '0 !important' }}>
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
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='Video' sx={{ flexGrow: 1, p: '0 !important' }}>
                <div>
                  <Typography variant='h6' sx={{ mb: 5 }}>
                    Fill in Video Informations
                  </Typography>
                  <TextField
                    id='video title'
                    label='Video Title'
                    sx={{ width: '100%', mb: 5 }}
                    value={vid}
                    onChange={e => setVid(e.target.value)}
                  ></TextField>
                  <TextField
                    type='number'
                    label='Points'
                    value={vidP}
                    id='form-props-number'
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: '100%', mb: 5 }}
                    onChange={e => setVidP(e.target.value)}
                  />
                  <div>
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
                </div>
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='Text & Pdf' sx={{ flexGrow: 1, p: '0 !important' }}>
                <div>
                  <Typography variant='h6' sx={{ mb: 5 }}>
                    Fill in Text Content Informations
                  </Typography>
                  <TextField
                    id='Text title'
                    label='Content Title'
                    sx={{ width: '100%', mb: 5 }}
                    value={text}
                    onChange={e => setText(e.target.value)}
                  ></TextField>
                  <TextField
                    type='number'
                    label='Points'
                    value={textP}
                    id='form-props-number'
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: '100%', mb: 5 }}
                    onChange={e => setTextP(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label='Content'
                    placeholder='Text Content'
                    multiline
                    rows={4}
                    value={textC}
                    sx={{ width: '100%', mb: 5 }}
                    onChange={e => setTextC(e.target.value)}
                  />
                  <label htmlFor='course-pdf' style={{ display: 'inline-block' }}>
                    <Button variant='contained' component='span'>
                      Upload Pdf
                    </Button>
                  </label>
                  <input
                    required
                    id='course-pdf'
                    type='file'
                    name='pdf'
                    style={{ display: 'none' }}
                    onChange={handlePdfUpload}
                  />
                </div>
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='Challenge' sx={{ flexGrow: 1, p: '0 !important' }}>
                <div>
                  <Typography variant='h6' sx={{ mb: 5 }}>
                    Fill in Challenge Informations
                  </Typography>
                  <TextField
                    id='Challenge title'
                    label='Challenge Title'
                    sx={{ width: '100%', mb: 5 }}
                    value={challenge}
                    onChange={e => setChallenge(e.target.value)}
                  ></TextField>
                  <TextField
                    type='number'
                    label='Points'
                    value={challengeP}
                    onChange={e => setChallengeP(e.target.value)}
                    id='form-props-number'
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: '100%', mb: 5 }}
                  />
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

                  <FormControlLabel
                    control={<Checkbox checked={code} onChange={e => setCode(e.target.checked)} color='primary' />}
                    label='Code Editor'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={quiz} onChange={e => setQuiz(e.target.checked)} color='primary' />}
                    label='Quiz'
                  />
                </div>
                {renderTabFooter()}
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PreviewActions
