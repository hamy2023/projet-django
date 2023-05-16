// ** React Imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const DraftRating = ({ level }) => {
  let numStars = 0

  if (level === '1 star') {
    numStars = 1
  } else if (level === '2 star') {
    numStars = 2
  } else if (level === '3 star') {
    numStars = 3
  } else if (level === '4 star') {
    numStars = 4
  } else if (level === '5 star') {
    numStars = 5
  }

  return (
    <Rating
      name='draft-rating'
      value={numStars}
      max={5}
      readOnly
      emptyIcon={<StarBorderIcon fontSize='inherit' color='inherit' />}
      sx={{
        '& .MuiRating-iconFilled': {
          color: 'success'
        },
        '& .MuiRating-iconEmpty': {
          color: 'grey'
        },
        fontSize: '1.2rem'
      }}
    />
  )
}

export let draftId = null

const DraftCategoryChip = ({ category }) => {
  let color
  switch (category) {
    case 'Hackathon':
      color = 'success'
      break
    case 'Job Challenge':
      color = 'error'
      break
    default:
      color = 'default'
  }

  return <CustomChip label={category} skin='light' color={color} />
}

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  cardHeader: {
    color: theme.palette.common.white,
    padding: theme.spacing(2)
  },
  tableContainer: {
    maxWidth: '100%',
    overflow: 'auto'
  },
  table: {
    minWidth: 650
  },
  tableHeaderCell: {
    fontWeight: 'bold'
  },
  tableRow: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  },
  deleteButton: {
    color: theme.palette.error.main
  },
  editButton: {
    color: theme.palette.success.main
  }
}))

const MyDrafts = () => {
  const classes = useStyles()
  // ** States
  const [drafts, setDrafts] = useState([])

  useEffect(() => {
    const fetchDrafts = async () => {
      const accessToken = localStorage.getItem(authConfig.storageTokenKeyName)

      if (accessToken) {
        try {
          const response = await axios.get('http://localhost:8000/challenge-management/drafts/', {
            headers: {
              Authorization: `JWT ${accessToken}`
            }
          })
          setDrafts(response.data)
        } catch (error) {
          // Handle error
        }
      } else {
        // Access token not found in local storage, handle accordingly
      }
    }

    fetchDrafts()
  }, [])
  const handleDelete = async id => {
    console.log('Deleting draft with id ', id)

    try {
      const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      await axios.delete(`http://localhost:8000/challenge-management/drafts/delete/${id}`, {
        headers: {
          Authorization: `JWT ${accessToken}`
        }
      })

      toast.success('Draft Deleted!')
      window.location.reload()
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }

  const router = useRouter()
  const handleEdit = async (e, id) => {
    e.preventDefault()
    draftId = id
    router.push('/challenges/mine/edit')
  }
  const handleCreate = async (e, id) => {
    e.preventDefault()
    router.push('/challenges/create_challenge')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>My Drafts</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card} sx={{ border: 0, boxShadow: 60 }}>
          <CardHeader
            title='Draft list'
            action={
              <div>
                <Button size='small' variant='outlined' onClick={handleCreate}>
                  Create New Challenge
                </Button>
              </div>
            }
            className={classes.cardHeader}
          />

          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>Title</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Topic</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Category</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Difficulty Level</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drafts.map(draft => (
                  <TableRow key={draft.id} className={classes.tableRow}>
                    <TableCell>{draft.name}</TableCell>
                    <TableCell>{draft.topic}</TableCell>
                    <TableCell>
                      <DraftCategoryChip category={draft.category} />
                    </TableCell>
                    <TableCell>
                      <DraftRating level={draft.difficulty_level} />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color='primary'
                        onClick={() => handleEdit(event, draft.id)}
                        className={classes.editButton}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color='error' onClick={() => handleDelete(draft.id)} className={classes.deleteButton}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MyDrafts
