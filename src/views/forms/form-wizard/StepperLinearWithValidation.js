// ** React Imports
import { Fragment, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
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

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Styled Components
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
    title: 'Assign Gamification points',
    subtitle: 'Add points to each task'
  },
  {
    title: 'Challenge Solution',
    subtitle: 'Provide a solution to this challenge'
  }
]

const defaultGeneralInformations = {
  name: '',
  type: ['', ''],
  topic: '',
  'difficulty-level': 1,
  description: '',
  prizes: '',
  rules: '',
  'how-to-get-started': '',
  evaluated: false
}

const defaultTaskValues = {
  task: ''
}

const defaultSocialValues = {
  google: '',
  twitter: '',
  facebook: '',
  linkedIn: ''
}
const defaultSolutionValues = {
  solution: ''
}

const generalSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.array().of(yup.string()).min(2).max(2).required(),
  topic: yup.string().required(),
  'difficulty-level': yup.number().oneOf([1, 2, 3, 4, 5]).required(),
  description: yup.string().required(),
  prizes: yup.string().required(),
  rules: yup.string().required(),
  'how-to-get-started': yup.string().required(),
  evaluated: yup.boolean()
})

const taskSchema = yup.object().shape({
  task: yup.string().required()
})

const socialSchema = yup.object().shape({
  google: yup.string().required(),
  twitter: yup.string().required(),
  facebook: yup.string().required(),
  linkedIn: yup.string().required()
})

const solutionSchema = yup.object().shape({
  solution: yup.string().required()
})

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // ** Hooks
  const {
    reset: generalReset,
    control: generalControl,
    handleSubmit: handleGeneralSubmit,
    formState: { errors: generalErrors }
  } = useForm({
    defaultValues: defaultGeneralInformations,
    resolver: yupResolver(generalSchema)
  })

  const {
    reset: taskReset,
    control: taskControl,
    handleSubmit: handleTaskSubmit,
    formState: { errors: taskErrors }
  } = useForm({
    defaultValues: defaultTaskValues,
    resolver: yupResolver(taskSchema)
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  const {
    reset: solutionReset,
    control: solutionControl,
    handleSubmit: handleSolutionSubmit,
    formState: { errors: solutionErrors }
  } = useForm({
    defaultValues: defaultSolutionValues,
    resolver: yupResolver(solutionSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
    generalReset({
      name: '',
      type: ['', ''],
      topic: '',
      'difficulty-level': 1,
      description: '',
      prizes: '',
      rules: '',
      'how-to-get-started': '',
      evaluated: false
    })
    taskReset({ task: '' })
    solutionReset({ solution: '' })
  }

  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Challenge Created!')
    }
  }

  // Handle Password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 })
  }

  const [type, setType] = useState('')

  const handleTypeChange = event => {
    setType(event.target.value)
  }

  const [tasks, setTasks] = useState([])

  const handleAddTask = () => {
    const newTask = { id: uuidv4(), description: '' }
    setTasks([...tasks, newTask])
  }
  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }
  const handleTaskChange = (id, description) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, description } : task))
    setTasks(updatedTasks)
  }
  const [showTaskField, setShowTaskField] = useState(false)

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [rows, setRows] = useState([
    { task: 'Task 1', challenge: 'Challenge 1', difficulty: 'Easy', topic: 'Topic 1' },
    { task: 'Task 2', challenge: 'Challenge 2', difficulty: 'Medium', topic: 'Topic 2' },
    { task: 'Task 3', challenge: 'Challenge 3', difficulty: 'Hard', topic: 'Topic 3' }
  ])

  const handleDelete = index => {
    const newRows = [...rows]
    newRows.splice(index, 1)
    setRows(newRows)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleGeneralSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Name'
                        onChange={onChange}
                        placeholder='Challenge name'
                        error={Boolean(generalErrors.name)}
                        aria-describedby='stepper-linear-general-name'
                      />
                    )}
                  />
                  {generalErrors.name && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                  <Controller
                    name='type'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        onChange={handleTypeChange}
                        id='stepper-linear-general-type'
                        value={type}
                        error={Boolean(generalErrors.type)}
                        labelId='stepper-linear-general-type'
                        input={<OutlinedInput label='Type' id='stepper-linear-general-type' />}
                      >
                        <MenuItem value='Job_challenge'>Job challenge</MenuItem>
                        <MenuItem value='Normal_challenge'>Normal challenge</MenuItem>
                      </Select>
                    )}
                  />
                  {generalErrors.type && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-type'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='topic'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='topic'
                        value={value}
                        label='Topic'
                        onChange={onChange}
                        error={Boolean(generalErrors.topic)}
                        placeholder='Challenge Topic'
                        aria-describedby='stepper-linear-general-topic'
                      />
                    )}
                  />
                  {generalErrors.topic && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-topic'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='stepper-linear-general-difficulty-level'>Difficulty Level</InputLabel>
                  <Controller
                    name='difficulty-level'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        multiple
                        onChange={onChange}
                        id='stepper-linear-general-difficulty-level'
                        value={Array.isArray(value) ? value : []}
                        error={Boolean(generalErrors['difficulty-level'])}
                        labelId='stepper-linear-general-difficulty-level'
                        input={<OutlinedInput label='Difficulty Level' id='stepper-linear-general-difficulty-level' />}
                      >
                        <MenuItem value='1 star'>1 star</MenuItem>
                        <MenuItem value='2 stars'>2 stars</MenuItem>
                        <MenuItem value='3 stars'>3 stars</MenuItem>
                        <MenuItem value='4 stars'>4 stars</MenuItem>
                        <MenuItem value='5 stars'>5 stars</MenuItem>
                      </Select>
                    )}
                  />
                  {generalErrors['difficulty-level'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-difficulty-level'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Description'
                        onChange={onChange}
                        placeholder='Challenge description'
                        error={Boolean(generalErrors.description)}
                        multiline
                        rows={4}
                        aria-describedby='stepper-linear-general-description'
                      />
                    )}
                  />
                  {generalErrors.description && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-description'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='prizes'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Prizes'
                        onChange={onChange}
                        placeholder='Challenge prizes'
                        error={Boolean(generalErrors.prizes)}
                        multiline
                        rows={4}
                        aria-describedby='stepper-linear-general-prizes'
                      />
                    )}
                  />
                  {generalErrors.prizes && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-prizes'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='rules'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Rules'
                        onChange={onChange}
                        placeholder='Challenge rules'
                        error={Boolean(generalErrors.rules)}
                        multiline
                        rows={4}
                        aria-describedby='stepper-linear-general-rules'
                      />
                    )}
                  />
                  {generalErrors.rules && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-rules'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='how-to-get-started'
                    control={generalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='How to get started'
                        onChange={onChange}
                        placeholder='How to get started with the challenge'
                        error={Boolean(generalErrors['how-to-get-started'])}
                        multiline
                        rows={4}
                        aria-describedby='stepper-linear-general-how-to-get-started'
                      />
                    )}
                  />
                  {generalErrors['how-to-get-started'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-how-to-get-started'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Controller
                      name='evaluated'
                      control={generalControl}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />
                      )}
                    />
                  }
                  label='Evaluated'
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form onSubmit={onSubmit}>
            <Grid container spacing={5}>
              {tasks.map(task => (
                <Grid item xs={12} key={task.id}>
                  <FormControl fullWidth>
                    <Controller
                      name='task'
                      control={taskControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={task.description}
                          onChange={event => handleTaskChange(task.id, event.target.value)}
                          label='Task'
                          placeholder='Enter task description'
                          multiline
                          rows={4}
                          aria-describedby='stepper-linear-personal-task'
                        />
                      )}
                    />
                  </FormControl>
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleAddTask}>Add Task</Button>
                <Button onClick={handleOpen}>Upload from bank of questions</Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>BANK OF QUESTIONS</DialogTitle>
              <DialogContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tasks</TableCell>
                      <TableCell>Challenge</TableCell>
                      <TableCell>Difficulty</TableCell>
                      <TableCell>Topic</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.task}</TableCell>
                        <TableCell>{row.challenge}</TableCell>
                        <TableCell>{row.difficulty}</TableCell>
                        <TableCell>{row.topic}</TableCell>
                        <TableCell>
                          <Button variant='outlined' color='secondary' onClick={() => setTasks([...tasks, ''])}>
                            Add task
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='twitter'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Twitter'
                        onChange={onChange}
                        error={Boolean(socialErrors.twitter)}
                        placeholder='https://twitter.com/carterLeonard'
                        aria-describedby='stepper-linear-social-twitter'
                      />
                    )}
                  />
                  {socialErrors.twitter && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-twitter'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='facebook'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Facebook'
                        onChange={onChange}
                        error={Boolean(socialErrors.facebook)}
                        placeholder='https://facebook.com/carterLeonard'
                        aria-describedby='stepper-linear-social-facebook'
                      />
                    )}
                  />
                  {socialErrors.facebook && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-facebook'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='google'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Google+'
                        onChange={onChange}
                        error={Boolean(socialErrors.google)}
                        aria-describedby='stepper-linear-social-google'
                        placeholder='https://plus.google.com/carterLeonard'
                      />
                    )}
                  />
                  {socialErrors.google && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-google'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='linkedIn'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='LinkedIn'
                        onChange={onChange}
                        error={Boolean(socialErrors.linkedIn)}
                        placeholder='https://linkedin.com/carterLeonard'
                        aria-describedby='stepper-linear-social-linkedIn'
                      />
                    )}
                  />
                  {socialErrors.linkedIn && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-linkedIn'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 3:
        return (
          <form onSubmit={handleSolutionSubmit(onSubmit)}>
            <Grid container spacing={5}>
              {tasks.map(task => (
                <Grid item xs={12} key={task.id}>
                  <FormControl fullWidth>
                    <Controller
                      name='solution'
                      control={solutionControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Solution'
                          onChange={onChange}
                          placeholder='Challenge Solution'
                          error={Boolean(solutionErrors.solution)}
                          multiline
                          rows={30}
                          aria-describedby='stepper-linear-general-solution'
                        />
                      )}
                    />
                    {solutionErrors.solution && (
                      <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-general-solution'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
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
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (generalErrors.email ||
                    generalErrors.username ||
                    generalErrors.password ||
                    generalErrors['confirm-password']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (taskErrors.country || taskErrors.language || taskErrors['last-name'] || taskErrors['first-name']) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                } else if (
                  (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
                  labelProps.error = true
                } else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
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

export default StepperLinearWithValidation
