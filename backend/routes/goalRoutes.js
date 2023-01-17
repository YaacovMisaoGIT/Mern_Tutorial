const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

const {protect} = require('../middleWare/authMiddleware')

router.get('/', protect, getGoals) 
router.post('/', protect, setGoal) 
//router.route('/').get(protect setGoals).post(protect,setGoal) //in place of above two lines of code 

router.put('/:id', protect, updateGoal) 
router.delete('/:id', protect, deleteGoal)
//router.route('/"id').put(protect, deleteGoal).delete(protect, updateGoal) //in place of above two lines of code 



module.exports = router
