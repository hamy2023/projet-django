import { Card, CardContent, CardActions, Button, Box, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

const ConsultLearningPath = () => {
  return (
    <Card sx={{ border: 1, boxShadow: 20 }}>
      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          p: theme => `${theme.spacing(3.25)} ${theme.spacing(5)} ${theme.spacing(4.5)} !important`,
          '& .first-icon': { position: 'absolute', top: 0, right: 0, opacity: 0.09, fontSize: '20rem' }
        }}
      >
        <Icon icon='tabler:brand-python' className='first-icon' />

        <Typography variant='h6' sx={{ display: 'flex', mb: 2.75, alignItems: 'center', '& svg': { mr: 2.5 } }}>
          <Icon icon='tabler:brand-python' color='#00e676' sx={{}} />
          Python Programming
        </Typography>
        <Typography variant='body2' sx={{ mb: 3 }}>
          You’ve read about the importance of being courageous, rebellious and imaginative. These are all vital
          ingredients in an effective.
        </Typography>
      </CardContent>
      <CardActions className='card-action-dense'>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Button>See learning path details</Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
              <Icon icon='tabler:users' />
              <Typography variant='body2'>3.2k</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
              <Icon icon='tabler:device-gamepad' />
              <Typography variant='body2'>3 Gamified Courses</Typography>
            </Box>
          </Box>
        </Box>
      </CardActions>
    </Card>
  )
}

export default ConsultLearningPath
