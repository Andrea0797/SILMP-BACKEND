var db = require('../db');

module.exports = {
    // Retrieve all todos 
    allTodos (req, res) {
        db.query('select * from Medicamentos_TB A inner join DIGEMID_DATA B on A.id_digemid = B.id', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Todos list.' });
        });
    },
    allTodosCombo (req, res) {
        db.query('select * from DIGEMID_DATA', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Todos list.' });
        });
    },
    getMedicamentoDetalle(req, res){
        let codigo = req.params.codigo;
        db.query('SELECT * FROM Medicamentos where Nro_Registro=?', codigo, function (error, results, fields) {
            
            if (error) throw error;
            return res.send({ error: false,count: results.length, data: results[0], message: 'Listado.' });
        });
    },
 
    guardarMedicamento(req, res){
        let med = req.body.med;
        
        if (!med) {
            return res.status(400).send({ error:true, message: 'Please provide med' });
        }
    
        db.query("INSERT INTO Medicamentos_TB SET ? ", { task: task }, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Nuevo registro agregado.' });
        });
    },
    addMed(req,res){
        let med = req.body;
        console.log(med);
        if (!med) {
            return res.status(400).send({ error:true, message: 'Please provide task' });
        }
        console.log(med);
        db.query("INSERT INTO Medicamentos_TB (id_digemid,Lote,FechaVencimiento,IMG_URL) values (?,?,?,?) ", [med.id_digemid,med.Lote,med.FechaVencimiento,med.IMG_URL], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Nuevo registro agregado.' });
        });
    },

    searchMedicamento(req, res){
        var filter = req.body;
        db.query("select * from Medicamentos_TB A inner join DIGEMID_DATA B on A.id_digemid = B.id WHERE Nombre_Comercial LIKE ? or Nro_Registro like ? or Lote LIKE ? or FechaVencimiento like ?", ['%' + filter.nombre + '%','%' + filter.nro + '%', '%' + filter.lote + '%','%' + filter.fecha + '%'], function (error, results, fields) {
            console.log(results);
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