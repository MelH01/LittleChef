import { StyleSheet } from "react-native";

// Shared design tokens
const COLORS = {
  background: "#fff",
  input: "#F3F3F3",
  card: "#FFE5B4",
  primary: "#FFA726",
  textLight: "#fff",
};

const SIZES = {
  padding: 12,
  radius: 10,
  rowHeight: 50,
  fontRegular: 16,
  fontSmall: 14,
  fontHeader: 26,
  radiusBtn: 50,
};

const styles = StyleSheet.create({
  // --- Layout ---
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },

  header: {
    fontSize: SIZES.fontHeader,
    fontWeight: "bold",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  // --- Generic Inputs ---
  input: {
    backgroundColor: COLORS.input,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: 15,
    fontSize: SIZES.fontRegular,
  },

  textArea: {
    height: 100,
  },

  // --- Buttons ---
  saveBtn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radiusBtn,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    fontSize: 18,
    color: COLORS.textLight,
    fontWeight: "600",
  },

  // --- Recipe Cards ---
  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: SIZES.padding,
    borderRadius: SIZES.radius + 2,
    marginBottom: 15,
  },

  cardText: {
    fontSize: SIZES.fontSmall,
  },

  cardHeader: {
    fontSize: SIZES.fontRegular + 2,
  },

  // --- Ingredient Row ---
  ingredientInput: {
    flex: 1,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
    fontSize: SIZES.fontRegular,
    marginRight: 10,
    height: SIZES.rowHeight,
  },

  qtyInput: {
    fontSize: SIZES.fontRegular,
  },

  qtyBox: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    height: SIZES.rowHeight,
    marginRight: 10,
  },

  qtyArrows: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginLeft: 40,
  },

  arrow: {
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.8,
    paddingVertical: 2,
  },

  picker: {
    flex: 0.6,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    height: SIZES.rowHeight,
    justifyContent: "center",
  },
});

export default styles;
