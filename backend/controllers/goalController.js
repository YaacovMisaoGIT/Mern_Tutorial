const asyncHandler = require('express-async-handler')  
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


//desc Get goals
//route Get /api/goals
//access Private
const getGoals = asyncHandler( async (req, res) =>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})

//desc Set goal
//route POST /api/goals
//access Private
const setGoal = asyncHandler( async (req, res) =>{
    if(!req.body.text) {  //we search for a text, if there is none we throw an error
        res.status(400).json({message:'Please ass a text field'})
    }
    //if a text is there, we keep going on
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

//desc Update goal
//route PUT /api/goals/:id
//access Private
const updateGoal =  asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id) //get the goal we are trying to update

    if(!goal) { //if we don not find goal id
        res.status(400)
        throw new Error('The requested goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //will just create new data if it doesnot exist
    })
    res.status(200).json(updatedGoal)
})

//desc Delete goal
//route DELETE /api/goals/:id
//access Private
const deleteGoal = asyncHandler( async (req, res) =>{
    const goal = await Goal.findById(req.params.id) 

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
      }

      await goal.remove() //no need to assign variable becos there is no reason to save it
      
    res.status(200).json({id: req.params.id})
    // res.status(200).json({message: `Delete Goal ${req.params.id}`})
})
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}