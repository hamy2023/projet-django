// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import StepperLinearWithValidation from 'src/views/forms/form-wizard/StepperLinearWithValidation'
import StepperAlternativeLabel from 'src/views/forms/form-wizard/create-challenge'

const FormWizard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Create a challenge</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperAlternativeLabel />
      </Grid>
    </Grid>
  )
}

export default FormWizard
