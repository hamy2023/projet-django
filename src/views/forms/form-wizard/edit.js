// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Editor from '@monaco-editor/react'
import * as monacoThemes from 'monaco-themes'

// ** MUI Imports
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import { draftId } from 'src/pages/challenges/mine/index'

import StepperCustomDot from './StepperCustomDot'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    title: 'General informations',
    subtitle: 'Enter challenge informations'
  },
  {
    title: 'Add tasks',
    subtitle: 'Add new or upload'
  },
  {
    title: 'Challenge Solution',
    subtitle: 'Provide a solution to this challenge'
  }
]

;('http://localhost:8000/challenge-management/drafts/2/solution/')

const Edit = () => {
  const [draft, setDraft] = useState({})
  const [draftQuestions, setDraftQuestions] = useState({})
  const [draftSolution, setDraftSolution] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [draftResponse, questionsResponse, solutionResponse] = await Promise.all([
          axios.get(`http://localhost:8000/challenge-management/drafts/${draftId}`),
          axios.get(`http://localhost:8000/challenge-management/drafts/${draftId}/questions/`),
          axios.get(`http://localhost:8000/challenge-management/drafts/${draftId}/solution/`)
        ])

        setDraft(draftResponse.data)
        setDraftQuestions(questionsResponse.data)
        setDraftSolution(solutionResponse.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  // ** States
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [challenge_team_type, setType] = useState('')
  const [topic, setTopic] = useState([])
  const [difficulty_level, setDifficulty] = useState('')
  const [description, setDescription] = useState('')
  const [prizes, setPrizes] = useState('')
  const [rules, setRules] = useState('')
  const [getStarted, setGetStarted] = useState('')
  const [haveGrader, setHaveGrader] = useState('')
  const [judging_criteria, setJudging] = useState('')
  const [solution, setSolution] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [error, setError] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [questionChallengeData, setQuestionChallengeData] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [taskVr, setTaskVr] = useState(false)
  const [taskEditor, setTaskEditor] = useState(false)
  const [image, setImage] = useState(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [banks, setBanks] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [selectedBank, setSelectedBank] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setName(draft.name)
    setCategory(draft.category)
    setType(draft.challenge_team_type)
    setTopic([draft.topic])
    setDifficulty(draft.difficulty_level)
    setDescription(draft.description)
    setPrizes(draft.prizes)
    setRules(draft.rules)
    setGetStarted(draft.getStarted)
    setHaveGrader(draft.haveGrader)
    setJudging(draft.judging_criteria)
  }, [draft])

  useEffect(() => {
    setTasks(draftQuestions)
  }, [draftQuestions])

  useEffect(() => {
    const fetchBanks = async () => {
      const response = await fetch('http://localhost:8000/challenge-management/bankofquestions/')
      const data = await response.json()
      setBanks(data)
    }
    fetchBanks()
  }, [])

  const handleBankChange = event => {
    setSelectedBank(event.target.value)
    // Load questions for the selected bank from API
    fetch(`http://localhost:8000/challenge-management/bankofquestions/${event.target.value}/questions/`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQuestions(data)
      })
      .catch(error => console.error(error))
  }

  const editorRef = useRef(null)

  const handleRunCode = () => {
    const code = editorRef.current.getValue()
    console.log(code)
    // do something with the code
  }
  const handleCompile = async e => {
    e.preventDefault()
    const payload = {
      language_id: 71, // Language ID for Python
      source_code: editorRef.current.getValue(),
      stdin: 'SnVkZ2Uw' // Your input, encoded in Base64
    }

    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '7452b76f1bmshe44398d774fc846p10222djsna04f113476be'
      },
      data: payload
    }

    try {
      const response = await axios(options)
      const submissionToken = response.data.token

      // Check the status of the submission every second
      const intervalId = setInterval(async () => {
        const submissionResponse = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`, {
          headers: {
            'X-RapidAPI-Key': '7452b76f1bmshe44398d774fc846p10222djsna04f113476be'
          }
        })

        const { status, stdout, stderr } = submissionResponse.data

        if (status.id <= 2) {
          // In progress or waiting
          return
        }

        // Submission complete, update the output
        clearInterval(intervalId)

        if (status.description == 'Accepted') {
          console.log(submissionResponse.data)
          setOutput(stdout)
        } else {
          console.log(submissionResponse.data)
          setOutput(stderr)
        }
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCodeChange = (editor, data, value) => {
    setCode(value)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDraft = async e => {
    e.preventDefault()
    try {
      // First API call to create the challenge

      const formData = new FormData()
      formData.append('name', name)
      formData.append('category', category)
      formData.append('challenge_team_type', challenge_team_type)
      formData.append('topic', topic)
      formData.append('difficulty_level', difficulty_level)
      formData.append('description', description)
      formData.append('prizes', prizes)
      formData.append('rules', rules)
      formData.append('getStarted', getStarted)
      formData.append('judging_criteria', judging_criteria)
      formData.append('haveGrader', haveGrader)
      formData.append('image', image)
      const draftResponse = await fetch(`http://localhost:8000/challenge-management/drafts/update/${draftId}/`, {
        method: 'PUT',
        body: formData
      })
      const draftData = await draftResponse.json()
      console.log(draftData)

      // Third API call to create the questions
      const draftquestionData = await Promise.all(
        tasks.map(async task => {
          const response = await fetch(`http://localhost:8000/challenge-management/draftquestions/update/${task.id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content: task.content,
              draft: draftId,
              points: task.points,
              vr: task.vr, // updated field name
              editor: task.editor
            })
          })
          return response.json()
        })
      )
      console.log(draftquestionData)
      const draftsolutionResponse = await fetch(
        `http://localhost:8000/challenge-management/draftsolutions/update/${draftId}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            draft: draftId,
            content: editorRef.current.getValue()
          })
        }
      )
      const draftsolutionData = await draftsolutionResponse.json()

      console.log(draftsolutionData)
      setFormSubmitted(true)
      setActiveStep(steps.length)
      toast.success('Draft Updated!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // First API call to create the challenge

      const formData = new FormData()
      formData.append('name', name)
      formData.append('category', category)
      formData.append('challenge_team_type', challenge_team_type)
      formData.append('topic', topic)
      formData.append('difficulty_level', difficulty_level)
      formData.append('description', description)
      formData.append('prizes', prizes)
      formData.append('rules', rules)
      formData.append('getStarted', getStarted)
      formData.append('judging_criteria', judging_criteria)
      formData.append('haveGrader', haveGrader)
      formData.append('image', image)
      const challengeResponse = await fetch('http://localhost:8000/challenge-management/challenges/create', {
        method: 'POST',
        body: formData
      })
      const challengeData = await challengeResponse.json()
      console.log(challengeData)

      // Second API call to get the challenge ID
      const challengeIdResponse = await fetch(`http://localhost:8000/challenge-management/challenges/${name}/get_id/`)
      const challengeIdData = await challengeIdResponse.json()
      console.log(challengeIdData)

      // Third API call to create the questions
      const questionData = await Promise.all(
        tasks.map(async task => {
          const response = await fetch('http://localhost:8000/challenge-management/questions/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content: task.description,
              challenge: challengeIdData.id,
              points: task.points,
              vr: task.vr, // updated field name
              editor: task.editor,
              bank: task.bank
            })
          })
          return response.json()
        })
      )
      console.log(questionData)
      const solutionResponse = await fetch('http://localhost:8000/challenge-management/solutions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          challenge: challengeIdData.id,
          content: editorRef.current.getValue()
        })
      })
      const solutionData = await solutionResponse.json()

      console.log(solutionData)
      setFormSubmitted(true)
      setActiveStep(steps.length)
      toast.success('Challenge Created!')
    } catch (error) {
      console.error(error)
      toast.error('Something is wrong!')
    }
  }

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleNext = event => {
    event.preventDefault()
    setActiveStep(prevActiveStep => {
      if (prevActiveStep === steps.length - 1) {
        toast.success('Challenge Created!')
      }
      return prevActiveStep + 1
    })
  }

  const handleReset = () => {
    setName('')
    setCategory('')
    setType('')
    setTopic([])
    setDifficulty('')
    setDescription('')
    setPrizes('')
    setRules('')
    setGetStarted('')
    setJudging('')
    setSolution('')
    setTasks([])
    setActiveStep(0)
  }
  // Handle Language
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  const [tasks, setTasks] = useState([])

  const handleAddTask = () => {
    const newTask = { id: uuidv4(), description: '', points: 0, vr: true, editor: true, bank: '' }
    setTasks([...tasks, newTask])
  }
  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleTaskChange = (id, content, points, vr, editor) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, content, points, vr, editor }
      }
      return task
    })
    setTasks(updatedTasks)
    setTaskVr(updatedTasks.find(task => task.id === id)?.vr || false)
    setTaskEditor(updatedTasks.find(task => task.id === id)?.editor || false)
  }

  const handleUploadFromBank = async () => {
    const response = await fetch('http://localhost:8000/challenge-management/question-challenge/')
    const data = await response.json()
    console.log(data)
    setQuestionChallengeData(data)
  }
  const handleUpload = () => {
    setOpen(false)
    if (selectedRows.length > 0) {
      const newTasks = selectedRows.map(id => {
        const row = questionChallengeData.find(data => data.id === id)
        return {
          id: uuidv4(),
          content: row.content,
          points: '',
          vr: false,
          editor: false,
          bank: ''
        }
      })
      setTasks([...tasks, ...newTasks])
      setSelectedRows([])
    }
  }
  const handleImageUpload = event => {
    const file = event.target.files[0]
    setImage(file)
  }

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  const names = [
    'Data types',
    'Lists',
    'Dictionaries',
    'Conditions',
    'Loops',
    'Operators',
    'Functions',
    'Django',
    'Flask',
    'Lambda Expressions',
    'Decorators',
    'Exception Handling',
    'Multithreading',
    'Machine Learning',
    'Data Visualization',
    'Data Science',
    'Web Scraping'
  ]
  const handleChangeTopic = event => {
    const {
      target: { value }
    } = event
    setTopic(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[0].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[0].subtitle}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Title'
                value={name}
                placeholder='Challenge title'
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-general-topic'>Topic</InputLabel>
                <Select
                  labelId='stepper-alternative-general-topic'
                  id='stepper-alternative-general-topic'
                  multiple
                  value={topic}
                  onChange={handleChangeTopic}
                  input={<OutlinedInput label='Topic' />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={topic.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-general-category'>Category</InputLabel>
                <Select
                  label='Category'
                  value={category}
                  id='stepper-alternative-general-category'
                  onChange={e => setCategory(e.target.value)}
                  labelId='stepper-alternative-general-category'
                >
                  <MenuItem value='Job Challenge'>Job Challenge</MenuItem>
                  <MenuItem value='Hackathon'>Hackathon</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-general-type'>Type</InputLabel>
                <Select
                  label='Type'
                  value={challenge_team_type}
                  id='stepper-alternative-general-type'
                  onChange={e => setType(e.target.value)}
                  labelId='stepper-alternative-general-type'
                >
                  <MenuItem value='Individual challenge'>Individual Challenge</MenuItem>
                  <MenuItem value='Team challenge'>Team Challenge</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-general-difficulty'>Difficulty Level</InputLabel>
                <Select
                  label='Difficulty'
                  value={difficulty_level}
                  id='stepper-alternative-general-difficulty'
                  onChange={e => setDifficulty(e.target.value)}
                  labelId='stepper-alternative-general-difficulty'
                >
                  <MenuItem value='1 star'>1 star</MenuItem>
                  <MenuItem value='2 star'>2 star</MenuItem>
                  <MenuItem value='3 star'>3 star</MenuItem>
                  <MenuItem value='4 star'>4 star</MenuItem>
                  <MenuItem value='5 star'>5 star</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Description'
                value={description}
                placeholder='Challenge Description'
                multiline
                rows={4}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Prizes'
                value={prizes}
                placeholder='Challenge Prizes'
                multiline
                rows={4}
                onChange={e => setPrizes(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Rules'
                value={rules}
                placeholder='Challenge rules'
                multiline
                rows={4}
                onChange={e => setRules(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='How To Get Started'
                value={getStarted}
                placeholder='How to get started'
                multiline
                rows={4}
                onChange={e => setGetStarted(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Judging Criteria'
                value={judging_criteria}
                placeholder='Judging Criteria'
                multiline
                rows={4}
                onChange={e => setJudging(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={haveGrader} onChange={e => setHaveGrader(e.target.checked)} />}
                label='Evaluated by grader'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <label htmlFor='challenge-image-uploader' style={{ display: 'inline-block' }}>
                <Button variant='contained' component='span'>
                  Upload Image
                </Button>
              </label>
              <input
                required
                accept='image/*'
                id='challenge-image-uploader'
                type='file'
                name='image'
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[1].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[1].subtitle}
              </Typography>
            </Grid>
            {tasks.map((task, index) => (
              <Grid container item spacing={2} key={task.id}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label={`Task ${index + 1}`}
                    value={task.content}
                    placeholder='Task content'
                    multiline
                    rows={10}
                    onChange={e => handleTaskChange(task.id, e.target.value, task.points, task.vr, task.editor)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Points'
                    value={task.points}
                    onChange={e => handleTaskChange(task.id, task.content, e.target.value, task.vr, task.editor)}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Bank of Questions</InputLabel>
                    <Select
                      value={task.bank}
                      onChange={e =>
                        handleTaskChange(task.id, task.content, task.points, task.vr, task.editor, e.target.value)
                      }
                    >
                      {banks.map(bank => (
                        <MenuItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task.vr}
                        onChange={e => {
                          handleTaskChange(task.id, task.content, task.points, e.target.checked, task.editor)
                        }}
                        color='primary'
                      />
                    }
                    label='VR Experience'
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task.editor}
                        onChange={e => {
                          handleTaskChange(task.id, task.content, task.points, task.vr, e.target.checked)
                        }}
                        color='primary'
                      />
                    }
                    label='Code Editor'
                  />
                </Grid>

                <Grid item xs={2}>
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Fragment>
        )
      case 2:
        return (
          <Fragment>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[2].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[2].subtitle}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  height: '70vh',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  background: '#222',
                  color: '#fff',
                  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* <h2 style={{ marginBottom: '1rem' }}>Challenge Solution</h2> */}
                <Editor
                  language='python'
                  theme='vs-dark'
                  defaultValue={draftSolution.content}
                  onMount={(editor, monaco) => {
                    editorRef.current = editor
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button size='large' type='button' onClick={handleCompile}>
                Compile
              </Button>
              <pre
                style={{
                  backgroundColor: '#1E1E1E',
                  color: '#D4D4D4',
                  padding: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  borderRadius: '5px'
                }}
              >
                {output}
              </pre>
            </Grid>
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (formSubmitted && activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Create another challenge
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <Grid container spacing={5}>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === 1 && <Button onClick={handleAddTask}>Add Task</Button>}
              {activeStep === 1 && (
                <Button
                  onClick={() => {
                    handleUploadFromBank()
                    setOpen(true)
                  }}
                >
                  Upload from bank
                </Button>
              )}
              <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
                <DialogTitle>Upload from Bank</DialogTitle>
                <DialogContent>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <InputLabel id='stepper-alternative-general-bankofquestions'>Select a bank</InputLabel>
                      <Select label='Select a bank' value={selectedBank} onChange={handleBankChange}>
                        {banks.map(bank => (
                          <MenuItem value={bank.name}>{bank.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Question ID</TableCell>
                          <TableCell>Question Content</TableCell>
                          <TableCell>Challenge Name</TableCell>
                          <TableCell>Add</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {questions.map(row => (
                          <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              <div style={{ width: '200px', overflowX: 'auto' }}>{row.content}</div>
                            </TableCell>
                            <TableCell>{row.challenge_name}</TableCell>
                            <TableCell>
                              <IconButton
                                disabled={selectedRows.includes(row.id)}
                                onClick={() => {
                                  setSelectedRows([...selectedRows, row.id])
                                  setSelectedRow(row)
                                }}
                              >
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    onClick={() => {
                      handleUpload()
                      setSelectedRows([])
                      setSelectedRow(null)
                    }}
                    disabled={!selectedRows.length}
                  >
                    Upload {selectedRows.length} Question(s)
                  </Button>
                </DialogActions>
              </Dialog>

              {activeStep === steps.length - 1 && <Button onClick={handleDraft}>Save as draft</Button>}
              {activeStep === steps.length - 1 ? (
                <Button size='large' variant='contained' type='submit'>
                  Submit
                </Button>
              ) : (
                <Button size='large' variant='contained' type='button' onClick={handleNext}>
                  Next
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default Edit
