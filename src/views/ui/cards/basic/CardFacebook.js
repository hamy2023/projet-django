// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import logo from './logo.png'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CardFacebook = () => {
  return (
    <Card sx={{ border: 1, boxShadow: 20 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography variant='h6' sx={{ display: 'flex', mb: 2.75, alignItems: 'center', '& svg': { mr: 2.5 } }}>
          <Icon icon='tabler:brand-python' />
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
              <Icon icon='tabler:users' />
              <Typography variant='body2'>3.2k</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon icon='tabler:share' />
              <Typography variant='body2'>49</Typography>
            </Box>
          </Box>
        </Box>
      </CardActions>
    </Card>
  )
}

export default CardFacebook
