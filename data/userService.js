import bcrypt from 'react-native-bcrypt';
import userRepository from '../data/userRepository';

// Número de rondas para el hash
const saltRounds = 10;

// 🔹 Función para registrar un usuario
const registerUser = async (username, email, password) => {
  try {
    // Generar hash de la contraseña
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Insertar usuario en la base de datos
    await userRepository.insertUser(username, email, hashedPassword);
    console.log('Usuario registrado correctamente');
    return { success: true };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return { success: false, error: error.message };
  }
};

// 🔹 Función para verificar credenciales al iniciar sesión
const loginUser = async (email, password) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    // Comparar contraseña ingresada con la almacenada (hasheada)
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (passwordMatch) {
      return { success: true, user };
    } else {
      return { success: false, message: 'Contraseña incorrecta' };
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { success: false, error: error.message };
  }
};

export default { registerUser, loginUser };
