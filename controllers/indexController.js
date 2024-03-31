const { catchAsynchErrors } = require("../middlewares/catchAsynchErrors")

exports.homepage = catchAsynchErrors( async (req, res, next) => {
    res.json({
        "name" : "Shadab",
        "age" : 20,
        "branch" : "CSE"
    })
})