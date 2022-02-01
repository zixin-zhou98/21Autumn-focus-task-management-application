

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import distractionService from '../services/distraction'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

export const Distraction = ({ distraction,task }) => {
  const dispatch = useDispatch()
  const [distractionObj,setDistractionObj] = useState()
  const handleDeleteDistraction = async () => {
    await distractionService.remove(distractionObj.task,distraction)

    let newDistractions = task.distractions.filter(i => i!==distraction)
    const newTask = {
      ...task,
      distractions:newDistractions
    }
    dispatch({
      type: 'DELETE_DISTRACTION',
      data: newTask
    })

  }
  useEffect(() => {
    async function fetchDistraction() {
      try {
        const obj = await distractionService.getDistractionById(distraction)
        setDistractionObj(obj)
      } catch (err) {
        console.error(err)
      }
    }
    fetchDistraction()
  }, [distraction,dispatch])
  if(distractionObj){
    return (
      <Grid container justify="flex-end" sx={{ pl:4 }}>
        <Grid item sx={{ width:'auto',pt:1 }}>
          {distractionObj.successful?<CheckIcon sx={{ fontSize: 18,my:'auto' }}/>:<ClearIcon sx={{ fontSize: 18,my:'auto' }}/>}
        </Grid>
        <Grid item sx={{ width:'auto',pt:0.4 }}>
          <Typography component="h2" variant="subtitle1">{distractionObj.reason}</Typography>
        </Grid>
        <Grid item xs={1} md={1} >
          <IconButton aria-label="Example" onClick={handleDeleteDistraction}>
            <DeleteOutlineIcon sx={{ fontSize: 18,my:'auto' }}/>
          </IconButton>
        </Grid>
      </Grid>
    )
  }
  return (<div></div>)
}

const Distractions = ({ distractions,task }) => {
  if(distractions)
    return (
      <>
        {distractions.map(distraction => <Distraction key={distraction} distraction={distraction} task={task}/>)}
      </>
    )
  return <div></div>
}
export default Distractions