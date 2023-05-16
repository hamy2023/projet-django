// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import PreviewCard from './CourseCard'
import PreviewActions from './CourseActions'

const InvoicePreview = () => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <PreviewCard />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <PreviewActions />
        </Grid>
      </Grid>
    </>
  )
}

export default InvoicePreview
