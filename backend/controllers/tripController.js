const Trip = require('../models/tripModel')
const mongoose = require('mongoose')

// get all trips
const getTrips = async (req, res) => {
  const user_id = req.user._id

  const trips = await Trip.find({user_id}).sort({createdAt: -1})

  res.status(200).json(trips)
}

// get a single trip
const getTrip = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such trip'})
  }

  const trip = await Trip.findById(id)

  if (!trip) {
    return res.status(404).json({error: 'No such trip'})
  }
  
  res.status(200).json(trip)
}


// create new trip
const createTrip = async (req, res) => {
  const {title, period, details} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!period) {
    emptyFields.push('period')
  }
  if(!details) {
    emptyFields.push('details')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const trip = await Trip.create({title, period, details, user_id})
    res.status(200).json(trip)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a trip
const deleteTrip = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such trip'})
  }

  const trip = await Trip.findOneAndDelete({_id: id})

  if (!trip) {
    return res.status(400).json({error: 'No such trip'})
  }

  res.status(200).json(trip)
}

// update a trip
const updateTrip = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such trip'})
  }

  const trip = await Trip.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!trip) {
    return res.status(400).json({error: 'No such trip'})
  }

  res.status(200).json(trip)
}


module.exports = {
  getTrips,
  getTrip,
  createTrip,
  deleteTrip,
  updateTrip
}