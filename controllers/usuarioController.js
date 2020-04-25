var db = require('../db');

module.exports = {
    // Retrieve all todos 
    getUsers (req, res) {
        db.query('SELECT * FROM users', function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Todos list.' });
        });
    },

    getUsuario(req, res) {
        var id = (req.params.id);
        console.log(id);
        db.query('SELECT * FROM users where id = ?',[id], function (error, results, fields) {
            console.log(results[0]);
            if (error) throw error;
            return res.send({ error: false, data: results[0], message: 'Todos list.' });
        });
    },
    addUser(req,res){
        let usr = req.body;
        if (!usr) {
            return res.status(400).send({ error:true, message: 'Please provide task' });
        }
    
        db.query("INSERT INTO users (Nombre,Codigo,username,Rol,password,RUC,Direccion, Email,Creacion,Empresa) values (?,?,?,?,?,?,?,?,?,?) ", [usr.Nombre,usr.Codigo,usr.Username,usr.Rol,"Peru2020",usr.RUC,usr.Direccion,usr.Email,new Date(),usr.Empresa], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Nuevo registro agregado.' });
        });
    },

    searchUser(req, res){
        var cadena = (req.params.keyword);
        
        var aux =cadena.split("-");
        let keyword = aux[0];
        let keyword2 = aux[1];
        console.log(keyword);
        console.log(keyword2);
        db.query("SELECT * FROM users WHERE Nombre LIKE ? or Rol LIKE ? or Codigo like ?", ['%' + keyword + '%','%' + keyword2 + '%', '%' + keyword + '%'], function (error, results, fields) {
            console.log(results);
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Todos search list.' });
        });
    },

    updateUser(req, res){
        let usuario_id = req.params.id;
        let user = req.body;
        console.log(1);
        console.log(req.body);
        if (!usuario_id || !user) {
            return res.status(400).send({ error: task, message: 'Please provide datos and usuario_id' });
        }
     
        db.query("UPDATE users SET Nombre = ? , Rol = ? , RUC = ? , Direccion = ? WHERE id = ?", [req.body.user.Nombre,req.body.user.Rol,req.body.user.RUC,req.body.user.Direccion, usuario_id], function (error, results, fields) {
            console.log("UPDATE users SET Nombre = ? , Rol = ? , RUC = ? , Direccion = ? WHERE id = ?", [req.body.user.Nombre,req.body.user.Rol,req.body.user.RUC,req.body.user.Direccion, usuario_id]);
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Registro actualizado.' });
        });
    },

    deleteUser(req, res){
        let user_id = req.params.id;
 
        db.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Registro borrado.' });
        });
    }

    
}