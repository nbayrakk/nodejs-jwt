const asyncErrorWrapper = require('express-async-handler');

const get = asyncErrorWrapper(async (req, res, next) => {
    
    res.json({
        a:"asda"
    })
})

module.exports = {
    get
}