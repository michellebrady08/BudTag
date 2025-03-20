import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import userService from '../../data/userService';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    console.log("?")
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
  }

  const result = await userService.registerUser(username, email, password);

  if (result.success) {
    console.log("9")
    Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
    navigation.navigate('LoginScreen'); // Redirigir a la pantalla de inicio de sesión
  } else {
    Alert.alert('Error', result.error || 'No se pudo registrar el usuario');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Icon name="wallet-outline" style={styles.icon}/>
          <Text style={styles.title}>Welcome to BudTag</Text>
          <Text style={styles.subtitle}>Enjoy the freedom some text to promote app bla bla bla.</Text>
        </View>

        <Input
          label="Email"
          placeholder="Input your email address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Public username"
          placeholder="Choose your username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          label="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Join BudTag</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.termsText}>By joining you agree to BudTag's </Text>
          <TouchableOpacity>
            <Text style={styles.termslink}>Tearms & Conditions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Input = ({ label, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholderTextColor={colors.GRAY}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG, 
  },
  icon: {
      color: colors.BLACK,
      fontSize: 100,
    },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.GRAY,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.PRIMARY,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 30,
    padding: 17,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 30,
    padding: 15,
    marginTop: 10,
  },
  signupButtonText: {
    color: colors.BG,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  termsText: {
    fontSize: 12,
    color: colors.GRAY,
    textAlign: 'center',
    marginVertical: 20,
  },
  termslink: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: colors.BLACK,
    fontWeight: 'bold'
  },
  loginLink: {
    color: colors.BLUE,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;