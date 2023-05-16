// ** React Imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

export let createId = null

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

const MyCourses = () => {
  const classes = useStyles()
  // ** States
  const [courses, setCourses] = useState([])
  const [expandedCourses, setExpandedCourses] = useState({})

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get('http://localhost:8000/gamifiedcourse-management/gamifiedcourses/')
      setCourses(response.data)
    }

    fetchCourses()
  }, [])

  const router = useRouter()

  const handleEdit = async (e, id) => {
    e.preventDefault()
    createId = id
    router.push('/gamifiedcourses/create_content')
  }

  const toggleExpand = courseId => {
    setExpandedCourses(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId]
    }))
  }

  const renderDescription = course => {
    const { id, description } = course
    const isExpanded = expandedCourses[id]

    if (description.length > 100) {
      const truncatedText = description.substring(0, 100) + '...'

      if (isExpanded) {
        return (
          <>
            <Typography variant='body2' sx={{ mb: 3 }}>
              {description}
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: 'success', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => toggleExpand(id)}
            >
              Collapse
            </Typography>
          </>
        )
      } else {
        return (
          <>
            <Typography variant='body2' sx={{ mb: 3 }}>
              {truncatedText}
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: 'primary', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => toggleExpand(id)}
            >
              Read More
            </Typography>
          </>
        )
      }
    } else {
      return (
        <Typography variant='body2' sx={{ mb: 3 }}>
          {description}
        </Typography>
      )
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>My Gamified Courses</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card} sx={{ border: 0, boxShadow: 60 }}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>Title</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Learning Path</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map(course => (
                  <TableRow key={course.id} className={classes.tableRow}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{renderDescription(course)}</TableCell>
                    <TableCell>{course.learningpath}</TableCell>
                    <TableCell>
                      <IconButton
                        color='primary'
                        onClick={() => handleEdit(event, course.id)}
                        className={classes.editButton}
                      >
                        <EditIcon />
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

export default MyCourses
