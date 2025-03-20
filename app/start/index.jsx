import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import { useRouter } from 'expo-router';
import Button from '../../assets/ui/button'

export default function LoginScreen() {

    const router = useRouter();
    const handleSignIn = async () => {
      router.push('/signup');
    };


  return (
    <>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Icon name="wallet-outline" style={styles.icon} />
        </View>
      
        <View style={styles.bottomSection}>
          <Text style={styles.title}>Say Hello to BudTag</Text>
          <Text style={styles.subTitle}>Enjoy the freedom some text to promote app bla bla bla.</Text>
          <TouchableOpacity style={styles.button}>
            <Button onPress={handleSignIn}/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG, 
  },
  topSection: {
    flex: 2.5, 
    backgroundColor: colors.PRIMARY,
    borderBottomLeftRadius: 50,  // Ajusta según tu diseño
    borderBottomRightRadius: 50, // Ajusta según tu diseño
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.BG,
    fontSize: 130,
    marginTop: 200,
  },
  bottomSection: {
    flex: 2,
    backgroundColor: colors.BG,
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.BLACK,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: colors.GRAY,
    textAlign: 'center',
    marginVertical: 10,
    maxWidth: '80%',
  },
  button: {
    height: 70,
    marginTop: 60,
  }
});