const Distraction = require('../models/distraction')
const Task = require('../models/task')
const distractionsRouter = require('express').Router()
const mongoose = require('mongoose')
distractionsRouter.post('/api/tasks/:id/distractions', async (request, response) => {
  const body = request.body
  const distraction = Distraction({
    reason: body.reason,
    successful: body.successful,
    startTime: new Date(),
    task:request.params.id
  })
  const result = await distraction.save()
  const task = await Task.findById(request.params.id)
  task.distractions = task.distractions.concat(result._id)
  await task.save()
  response.status(201).json(result)
})
  
distractionsRouter.get('/api/tasks/:id/distractions', async (request, response) => {
  const result = await Distraction.find({task:request.params.id})
  response.json(result)
})
  
distractionsRouter.delete('/api/tasks/:taskid/distractions/:distractionid', async (request, response) => {
  await Distraction.findByIdAndRemove(request.params.distractionid)
  await Task.findByIdAndUpdate(request.params.taskid, 
    { $pull: { distractions: mongoose.Types.ObjectId(request.params.distractionid) } }, 
    { new: true }
  )
  response.status(204).end()
})
  
distractionsRouter.put('/api/tasks/:taskid/distractions/:distractionid', async (request, response) => {
  const body = request.body
  const distraction = {
    reason: body.reason,
    successful: body.successful
  }
  const updatedDistraction = await Distraction.findByIdAndUpdate(request.params.distractionid, distraction, { new: true })
  response.json(updatedDistraction)
})

distractionsRouter.get('/api/distractions/:id', async (request, response) => {
  const result = await Distraction.findById(request.params.id)
  response.json(result)
})

module.exports = distractionsRouter