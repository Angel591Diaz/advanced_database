const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
app.use(express.json());

const {connection} = require("../config.db");


const getAllUsersSP = (request, response) => {
    connection.query("CALL getAllUsers()", (error, results) =>{
        if(error) throw error;
        response.status(200).json(results[0]);
    });
};

const getUsersByIdSP = (request, response) => {
    const id = request.params.id;
    connection.query(`CALL getUserById(${id})`, (error, results) => {
        if (error) throw error;
        response.status(200).json(results[0])
    })
}

const postUserSP = async (request, response) => {
    try {
       const {
            t_NombreCompletoUsuario,
            e_Matricula, 
            t_Contraseña,
            t_Genero,
            t_CorreoInstitucional, 
            e_Telefonia,
            t_Direccion,
            fkeCod_TypeUsers
        } = request.body

        const saltRounds = 10;
        const hashedPasswords = await bcrypt.hash(t_Contraseña, saltRounds);

        connection.query(
            `CALL postUser(
                "${t_NombreCompletoUsuario}",
                ${e_Matricula},
                "${hashedPasswords}",
                "${t_Genero}",
                "${t_CorreoInstitucional}",
                "${e_Telefonia}",
                "${t_Direccion}",
                ${fkeCod_TypeUsers}
                )`, 
            (error, results) => {
                if (error) throw error;
                response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
        })
    } catch (error){
        console.error("Error al insertar el usuario", error)
    }
}

app.route("/sp/users").get(getAllUsersSP)
app.route("/sp/users/:id").get(getUsersByIdSP)
app.route("/sp/users").post(postUserSP)

module.exports = app;