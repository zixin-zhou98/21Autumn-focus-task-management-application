import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import distractionService from '../services/distraction'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

const DistractionForm = ({ task }) => {
  const taskid = task.id
  const distractions = task.distractions
  const dispatch = useDispatch()
  const label = { inputProps: { 'aria-label': 'successful' } }
  const [checked,setChecked] = useState(false)
  const addDistraction = async (event) => {
    event.preventDefault()
    const reason = event.target.reason.value
    const successful = event.target.successful.checked
    const createdDistraction = await distractionService.createNew(taskid,reason,successful)
    event.target.reason.value = ''
    event.target.successful.value = false
    setChecked(false)
    let newDistractions = distractions.concat(createdDistraction.id)
    const newTask = {
      ...task,
      distractions:newDistractions
    }
    dispatch({
      type:'NEW_DISTRACTION',
      data:newTask
    })
  }
  const handleChange = () => {
    setChecked(!checked)
  }

  return (

    <form onSubmit={addDistraction}>
      <Container maxWidth="md" direction="row">
        <Grid container maxWidth="md" direction="row" justifyContent="center" alignItems="center"
          sx={{ py:4 }}>
          <Grid item xs={6} md={5} >
            <TextField
              hiddenLabel
              required
              id="outlined-required"
              label="reason"
              size="small"
              name="reason"
              sx={{ width:15/16 }}
            />
          </Grid>
          <Grid item xs={4} md={3} >
            <FormGroup>
              <FormControlLabel control={<Checkbox {...label} name='successful'
                checked={checked} onChange={handleChange}/>} label="Distractioned"/>
            </FormGroup>
          </Grid>
          <Grid item xs={4} md={4} >
            <Button variant="contained" startIcon={<AddIcon />} type="submit" sx={{ width:115,textTransform: 'none', fontSize:15 }}>
                Distraction
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>

  )
}

export default DistractionForm