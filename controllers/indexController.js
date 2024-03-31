exports.homepage = (req, res, next) => {
    res.json({
        "name" : "Shadab",
        "age" : 20,
        "branch" : "CSE"
    })
}