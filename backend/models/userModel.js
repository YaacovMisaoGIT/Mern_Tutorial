const mongoose = require('mongoose') //mongoose ODM to interact with Database

const carSchema = mongoose.Schema(
  {
    name: String,
      
    type: {
      model_type: String,
      gear_type: String,
      oil_type: String,
      engine: Number
    },
    year:  Number,
    hands: Number,
    cc: Number,
    area: String,
    description: String,
    additional_info:{
      kilometer: Number,
      test_upto: Date,
      oil_type: String,
      owner: String,
      gear_type: String,
      previous_owner: String,
      color: String,
      disable_access
     },
     armature: {
      air_conditioner: {
        "type": Checkbox,
        "default": false
      },
      abs: {
        "type": Checkbox,
        "default": false
      },
      four_automatic_doors: {
        "type": Checkbox,
        "default": false
      },
      power_steering: {
        "type": Checkbox,
        "default": false
      },
      six_airbags: {
        "type": Checkbox,
        "default": false
      },
      _4x2_drive: {
        "type": Checkbox,
        "default": false
      },
      magnesium_wheels: {
        "type": Checkbox,
        "default": false
      },
      cruise_control: {
        "type": Checkbox,
        "default": false
      },
      tire_pressure: {
        "type": Checkbox,
        "default": false
      },
      pedestrian_sensor: {
        "type": Checkbox,
        "default": false
      },
      belt_sensors: {
        "type": Checkbox,
        "default": false
      }
     }


  }
)
module.exports = mongoose.model('Car', userSchema)