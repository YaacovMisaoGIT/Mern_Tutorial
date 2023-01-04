const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

router.get('/',  getGoals) 

router.post('/', setGoal) 
//router.route('/').get(setGoals).post(setGoal) //in place of above two lines of code 

router.put('/:id', updateGoal) 

router.delete('/:id', deleteGoal)
//router.route('/"id').put(deleteGoal).delete(updateGoal) //in place of above two lines of code 



module.exports = router
