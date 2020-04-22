var db = require('../db');

module.exports = {
    // Retrieve all todos 
    allTodos (req, res) {
        db.query('SELECT * FROM Medicamentos', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Todos list.' });
        });
    },

    getMedicamentoDetalle(req, res){
        let codigo = req.params.codigo;
        db.query('SELECT * FROM Medicamentos where Nro_Registro=?', codigo, function (error, results, fields) {
            
            if (error) throw error;
            return res.send({ error: false, data: results[0], message: 'Listado.' });
        });
    },
 
    addTask(req,res){
        let task = req.body.task;
        
        if (!task) {
            return res.status(400).send({ error:true, message: 'Please provide task' });
        }
    
        db.query("INSERT INTO tasks SET ? ", { task: task }, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Nuevo registro agregado.' });
        });
    },

    searchTask(req, res){
        let keyword = req.params.keyword;
        db.query("SELECT * FROM Medicamentos WHERE task LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Todos search list.' });
        });
    },

    updateTask(req, res){
        let task_id = req.params.id;
        let task = req.body.task;
     
        if (!task_id || !task) {
            return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
        }
     
        db.query("UPDATE Medicamentos SET task = ? WHERE id = ?", [task, task_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Registro actualizado.' });
        });
    },

    deleteTask(req, res){
        let task_id = req.params.id;
 
        db.query('DELETE FROM Medicamentos WHERE id = ?', [task_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Registro borrado.' });
        });
    }

    
}