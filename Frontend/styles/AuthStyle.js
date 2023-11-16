import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const AuthStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center", // align the container itself in the center horizontally
    /*borderWidth: 3,
    borderColor: "#007bff",*/
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
  inputfield: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
  },
  buttonBig: {
    backgroundColor: "#007bff",
    borderRadius: 20, // Adjust the border radius for roundness
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10, // Adjust the margin as needed
    width: "100%",
    alignSelf: "center",
  },
  buttonSmall: {
    backgroundColor: "#007bff",
    borderRadius: 20, // Adjust the border radius for roundness
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10, // Adjust the margin as needed
    width: "45%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AuthStyle;
