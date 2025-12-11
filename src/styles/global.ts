import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F3F3F3",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  saveBtn: {
    backgroundColor: "#FFA726",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFE5B4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14
  },
  cardHeader: {
    fontSize: 18,
  },
});

export default styles;