var ActivityArray = []

const FindActByID = function(act_id) {
  for (var i in ActivityArray) {
    if (ActivityArray[i].act_id == act_id) {
      return ActivityArray[i]
    }
  }
}

const setActivityArray = function(act_array) {
  ActivityArray = act_array
}

const getActivityArray = function() {
  return ActivityArray
}

module.exports = {
  setActivityArray: setActivityArray,
  getActivityArray: getActivityArray
}