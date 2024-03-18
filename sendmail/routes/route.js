const { send, test } = require('../controllers/send')
const photoUplaod = require('../midellware/photoUpLoad')

const router = require('express').Router()

router.route('/').post(photoUplaod.array("files"),send)
module.exports = router