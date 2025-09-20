const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
app.use(express.json());

const {connection} = require("../config.db");

const getUsers = (request, response) => {
    connection.query(
        `SELECT 
            eCod_User, 
            t_NombreCompletoUsuario, 
            e_Matricula, 
            t_Genero, 
            t_CorreoInstitucional, 
            e_Telefonia, 
            t_Direccion 
        FROM 
            users`,

        (error, results) => {
            if (error) throw error;

            if (results.lenght === 0) {
                return response.status(404).json({mensaje: "No hay informacion registrada"})
            }
            response.status(200).json(results);
        });
};

const getUserById = (request, response) => {
    const id = request.params.id;
    connection.query(
        `SELECT 
            eCod_User, 
            t_NombreCompletoUsuario,
            e_Matricula, t_Genero, 
            t_CorreoInstitucional, 
            e_Telefonia,
            t_Direccion 
        FROM 
            users 
        WHERE 
            eCod_User = ?`, [id],

        (error, results) => {
            if (error) throw error;
            if (results.lenght === 0) {
                return response.status(404).json({mensaje: "Usuario No Encontrado"});
            }
            response.status(200).json(results[0]);
        }
    );
};

const postUser = async (request, response) => {
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
            `INSERT INTO
                users( 
                t_NombreCompletoUsuario,
                e_Matricula, 
                t_Contraseña,
                t_Genero,
                t_CorreoInstitucional, 
                e_Telefonia,
                t_Direccion,
                fkeCod_TypeUsers) 
            VALUES 
                (?,?,?,?,?,?,?,?)`,
                [ 
                t_NombreCompletoUsuario,
                e_Matricula, 
                hashedPasswords,
                t_Genero,
                t_CorreoInstitucional, 
                e_Telefonia,
                t_Direccion, 
                fkeCod_TypeUsers],
            (error, results) => {
                if (error) throw error;
                response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
            }
        )
    }
    catch (error){
        console.error("Error al insertar usuario", error);
    }
}

const updateUser = async (request, response) => {
    try {
        const eCod_User = request.params.id;
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
            `UPDATE 
                users
            SET
                t_NombreCompletoUsuario = ?,
                e_Matricula = ?,
                t_Contraseña = ?,
                t_Genero = ?,
                t_CorreoInstitucional = ?,
                e_Telefonia = ?,
                t_Direccion = ?,
                fkeCod_TypeUsers = ?
            WHERE eCod_User = ?`,
                [
                t_NombreCompletoUsuario,
                e_Matricula, 
                hashedPasswords,
                t_Genero,
                t_CorreoInstitucional, 
                e_Telefonia,
                t_Direccion, 
                fkeCod_TypeUsers,
                eCod_User,
            ],
            (error, results) => {
                if (error) throw error;
                response.status(200).json({"Usuario actualiado correctamente": results.affectedRows});
            }
        )
    }
    catch (error){
        console.error("Error al actualiar usuario", error);
    }
}

const deleteUser = async (request, response) => {
    try {
        const eCod_User = request.params.id;
        const b_StateUser = 0;
            
        connection.query(
            `UPDATE 
                users
            SET
                b_StateUser = ?
            WHERE eCod_User = ?`,
                [
                b_StateUser,
                eCod_User,
            ],
            (error, results) => {
                if (error) throw error;
                response.status(200).json({"Usuario eliminado correctamente": results.affectedRows});
            }
        )
    }
    catch (error){
        console.error("Error al eliminar al usuario", error);
    }
}

app.route("/users").get(getUsers);
app.route("/users/:id").get(getUserById);
app.route("/users").post(postUser);
app.route("/users/:id").put(updateUser);
app.route("/users/:id").delete(deleteUser);


module.exports = app;