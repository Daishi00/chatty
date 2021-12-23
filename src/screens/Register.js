import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().min(5).max(28).required(),
  passwordConfirm: yup.string().oneOf([yup.ref("password"), null]),
})

export const Register = ({ navigation }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = data => {
    console.log(data)
  }

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Rooms")}
          // onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up you agree with{"\n"} Terms and Conditions and Privacy
          Policy
        </Text>
      </View>
      <View style={styles.alreadyContainer}>
        <Text style={styles.alreadyText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login}>Log In</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    width: "100%",
    height: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5603AD",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
  termsContainer: {
    marginTop: 16,
  },
  termsText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff",
  },
  alreadyContainer: {
    marginTop: 16,
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 20,
  },
  alreadyText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff",
  },
  login: {
    fontFamily: "Poppins-SemiBold",
    color: "#5603AD",
  },
  error: {
    fontFamily: "Poppins-Regular",
    textAlign: "right",
    color: "#FF445A",
    fontSize: 12,
  },
})
