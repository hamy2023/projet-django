// ** MUI Imports
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Icon from 'src/@core/components/icon'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardVerticalRatings = () => {
  return (
    <Card>
      <CardHeader title='Python Programming' />
      <CardContent>
        <Typography variant='body2' sx={{ mb: 3.25 }}>
          If you are looking for a new way to promote your business that won’t cost you more money, maybe printing is
          one of the options you won’t resist.
        </Typography>
        <Typography variant='body2'>
          Printing is a widely use process in making printed materials that are used for advertising. It become fast,
          easy and simple.
        </Typography>
      </CardContent>
      <CardActions className='card-action-dense'>
        <Button>See learning path details</Button>
      </CardActions>
    </Card>
  )
}

export default CardVerticalRatings
