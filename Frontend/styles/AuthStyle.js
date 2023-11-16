import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const AuthStyle = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 100,
  },
  inputfield: {
    alignSelf: "center",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16,
    width: "70%",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 20, // Adjust the border radius for roundness
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center", // Center the button horizontally
    marginTop: 10, // Adjust the margin as needed
    width: "70%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
});

export default AuthStyle;
