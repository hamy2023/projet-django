import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import Edit from 'src/views/forms/form-wizard/edit'

const EditDraft = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Edit draft</Typography>
      </Grid>
      <Grid item xs={12}>
        <Edit />
      </Grid>
    </Grid>
  )
}

export default EditDraft
