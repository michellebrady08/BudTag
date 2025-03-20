import { View, Text, StyleSheet, Button } from 'react-native'
import {Link, useRouter} from 'expo-router'
import React, { useEffect } from 'react'
import services from '../utils/services'

export default function Home() {

    const router = useRouter();

    useEffect (() => {
        checkUserAuth();
    }, [])

    const checkUserAuth = async() => {
        const result=await services.getData('login')
        if (result !== 'true'){
            router.replace('/start')
        }
        console.log("Result ", result);
    }
  return (
    <View style={{
       marginTop:20 
    }}>
        <Text style={styles.text}>Homeeee</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        fontSize:20
    }
})