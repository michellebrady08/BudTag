import db from './db';

// 🔹 Crear tabla de usuarios
const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
      );`
    );
  });
};

// 🔹 Insertar usuario
const insertUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// 🔹 Obtener usuario por email
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (_, { rows }) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error)
      );
    });
  });
};

// Ejecutar la creación de la tabla al cargar el módulo
createUserTable();

export default { insertUser, getUserByEmail };
