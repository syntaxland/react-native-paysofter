// DashboardStyles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  content: {
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  servicesContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  serviceButton: {
    backgroundColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default styles;
