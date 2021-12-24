import React from "react"
import { View, Text, TextInput, StyleSheet, Linking } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "../components/Button"
import { AuthSwitch } from "../components/AuthSwitch"
import { REGISTER_USER } from "../graphql/Mutations"
import { useMutation } from "@apollo/client"
import { Loading } from "../components/Loading"
import AsyncStorageLib from "@react-native-async-storage/async-storage"

import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().min(8).max(28).required(),
  passwordConfirm: yup.string().oneOf([yup.ref("password"), null]),
})

export const Register = ({ navigation }) => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    onCompleted() {
      AsyncStorageLib.setItem("id", data.id)
      navigation.navigate("Rooms")
    },
    onError(error) {
      console.log(error.message)
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = data => {
    console.log(data.email)
    console.log(data.firstName)
    console.log(data.lastName)
    console.log(data.password)
    console.log(data.passwordConfirm)

    registerUser({
      variables: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        passwordConfirmation: data.passwordConfirm,
      },
    })
  }

  if (loading) return <Text>Submitting..</Text>
  if (error) return <Text>`Submission error! ${error.message}`</Text>

  return (
    <View style={styles.container}>
      <View style={styles.form}>
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
        <Text style={styles.label}>first name</Text>
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
              {...register("firstName")}
            />
          )}
          name="firstName"
        />
        <Text style={styles.error}>{errors.firstName?.message}</Text>

        <Text style={styles.label}>last name</Text>
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
              {...register("lastName")}
            />
          )}
          name="lastName"
        />
        <Text style={styles.error}>{errors.lastName?.message}</Text>

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

        <Text style={styles.label}>password confirmation</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              name="email"
              style={styles.input}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry
              {...register("passwordConfirm")}
            />
          )}
          name="passwordConfirm"
        />
        <Text style={styles.error}>{errors.passwordConfirm?.message}</Text>
        <Button onPress={handleSubmit(onSubmit)}>Sign up</Button>
      </View>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up you agree with{"\n"}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://policies.google.com/terms?hl=en-US")
            }
          >
            Terms and Conditions
          </Text>{" "}
          and{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://policies.google.com/terms?hl=en-US")
            }
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
      <AuthSwitch
        text="Already have an account?"
        buttonText="Log In"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B6DEFD",
    flex: 1,
    padding: 15,
    justifyContent: "space-around",
  },
  form: {
    padding: 15,
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
  termsContainer: {
    marginTop: 16,
  },
  termsText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff",
  },
  error: {
    fontFamily: "Poppins-Regular",
    textAlign: "right",
    color: "#FF445A",
    fontSize: 12,
  },
  link: {
    color: "#4DBDFC",
    textDecorationLine: "underline",
  },
})
