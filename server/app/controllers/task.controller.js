const db = require('../models')
const Task = db.tasks

exports.index = (req, res) => {
    Task.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error while retrieving posts."
            })
        })
}

exports.create = (req, res) => {
    const task = new Task()
    task.title = req.body.title
    task.description = req.body.description

    task.save(task)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some error while create task."
            })
        })
}

exports.show = (req, res) => {
    const id = req.params.id

    Task.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some error while show task."
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Task.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: "Task not found"
                })
            }
            res.send({
                message: "Task was updated"
            })
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some error while update task."
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Task.findByIdAndRemove(id)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: "Task not found"
                })
            }
            res.send({
                message: "Task was deleted"
            })
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some error while delete task."
            })
        })
}