import React, { useState, useEffect } from 'react'
import axios from 'axios'
// ** MUI Imports

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { createId } from '../mine'
import Sections from './section'

const PreviewCard = () => {
  const [infos, setInfo] = useState({})

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await axios.get(
        `http://localhost:8000/gamifiedcourse-management/gamifiedcourses/details/${createId}/`
      )
      setInfo(response.data)
    }
    fetchInfo()
  }, [])
  // ** Hook
  const theme = useTheme()
  return (
    <Card>
      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item sm={12} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ color: '#9BA3AB', mb: 1 }}>
                <strong>
                  <span>G</span>
                  <span>&nbsp;</span>
                  <span>A</span>
                  <span>&nbsp;</span>
                  <span>M</span>
                  <span>&nbsp;</span>
                  <span>I</span>
                  <span>&nbsp;</span>
                  <span>F</span>
                  <span>&nbsp;</span>
                  <span>I</span>
                  <span>&nbsp;</span>
                  <span>E</span>
                  <span>&nbsp;</span>
                  <span>D</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>C</span>
                  <span>&nbsp;</span>
                  <span>O</span>
                  <span>&nbsp;</span>
                  <span>U</span>
                  <span>&nbsp;</span>
                  <span>R</span>
                  <span>&nbsp;</span>
                  <span>S</span>
                  <span>&nbsp;</span>
                  <span>E</span>
                </strong>
              </Typography>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 600,
                    lineHeight: '24px',
                    fontSize: '1.375rem !important'
                  }}
                >
                  {infos.name}
                </Typography>
              </Box>
              <div>
                <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                  <strong style={{ fontSize: '1.1rem' }}>Learning path related to :</strong> {infos.learningpath}
                </Typography>
                <Typography variant='body3' sx={{ mb: 2, color: 'text.secondary' }}>
                  <strong style={{ fontSize: '1.1rem' }}>Description : </strong>
                  {infos.description}
                </Typography>
                {/* <Typography sx={{ color: 'text.secondary' }}>{infos.description}</Typography> */}
              </div>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item sm={12} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ color: '#9BA3B1', mb: 1 }}>
                <strong>
                  <span>S</span>
                  <span>&nbsp;</span>
                  <span>E</span>
                  <span>&nbsp;</span>
                  <span>C</span>
                  <span>&nbsp;</span>
                  <span>T</span>
                  <span>&nbsp;</span>
                  <span>I</span>
                  <span>&nbsp;</span>
                  <span>O</span>
                  <span>&nbsp;</span>
                  <span>N</span>
                  <span>&nbsp;</span>
                  <span>S</span>
                </strong>
              </Typography>

              <div>
                <Sections></Sections>
              </div>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />
    </Card>
  )
}

export default PreviewCard
