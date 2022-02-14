module.exports = (app) => {
    const tasks = require('../controllers/task.controller')
    const router = require('express').Router()

    router.get('/', tasks.index)
    router.post('/', tasks.create)
    router.get('/:id', tasks.show)
    router.put('/:id', tasks.update)
    router.delete('/:id', tasks.delete)

    app.use('/api/tasks', router)
}