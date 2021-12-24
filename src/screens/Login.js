import React, { useState, useEffect } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "../components/Button"
import { AuthSwitch } from "../components/AuthSwitch"
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(28).required(),
})

export const Login = ({ navigation }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>
          Log in and stay in touch{"\n"} with everyone!
        </Text>
        <Text style={styles.label}>e-mail address</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={value => onChange(value)}
              value={value}
              {...register("email")}
            />
          )}
          name="email"
        />
        <Text style={styles.error}>{errors.email?.message}</Text>
        <Text style={styles.label}>password</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry
              {...register("password")}
            />
          )}
          name="password"
        />
        <Text style={styles.error}>{errors.password?.message}</Text>
      </View>
      <View>
        <Button onPress={() => navigation.navigate("Rooms")}>Log in</Button>
        <AuthSwitch
          text="Dont have an account?"
          buttonText="Sign up"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B6DEFD",
    padding: 30,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    textAlign: "left",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: "Poppins-Regular",
  },
  label: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  error: {
    fontFamily: "Poppins-Regular",
    textAlign: "right",
    color: "#FF445A",
    fontSize: 12,
  },
})
