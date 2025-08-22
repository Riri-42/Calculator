import { Ionicons } from "@expo/vector-icons"; // expo install @expo/vector-icons
import { evaluate } from "mathjs"; // npm install mathjs
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSci, setShowSci] = useState(false); // toggle normal/scientific

  const handlePress = (value: string) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        const result = evaluate(input).toString();
        setHistory([...history.slice(-9), `${input} = ${result}`]);
        setInput(result);
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const sciButtons = [
    ["sin(", "cos(", "tan(", "log("],
    ["ln(", "√(", "^", "%"],
    ["π", "e", "(", ")"],
    ["C", "/", "*", "⌫"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", ".", "%"],
  ];

  const buttons = [
    ["C", "/", "*", "⌫"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", ".", "%"],
  ];

  return (
    <View style={styles.container}>
      {/* Top Controls */}
      <View style={styles.topRow}>
        {/* Toggle History */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => setShowHistory(!showHistory)}
        >
          <Text style={styles.historyButtonText}>
            {showHistory ? "Hide History" : "History"}
          </Text>
        </TouchableOpacity>

        {/* Toggle Normal/Scientific */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowSci(!showSci)}
        >
          <Ionicons
            name={showSci ? "calculator" : "calculator-outline"}
            size={28}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>

      {/* History */}
      {showHistory && (
        <View style={styles.historyBox}>
          <ScrollView>
            {history.length === 0 ? (
              <Text style={styles.historyText}>No history yet</Text>
            ) : (
              history.map((item, i) => (
                <Text key={i} style={styles.historyText}>
                  {item}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
      )}

      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{input || "0"}</Text>
      </View>

      {/* Calculator Body */}
      <View style={styles.buttonsContainer}>
        {(showSci ? sciButtons : buttons).map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === "C" && styles.clearButton,
                  btn === "=" && styles.equalsButton,
                  showSci &&
                    ["sin(", "cos(", "tan(", "log(", "ln(", "√(", "^", "π", "e"].includes(btn) &&
                    styles.sciButton,
                ]}
                onPress={() =>
                  btn === "⌫" ? setInput(input.slice(0, -1)) : handlePress(btn)
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    (btn === "=" || btn === "C") && styles.specialText,
                    showSci &&
                      ["sin(", "cos(", "tan(", "log(", "ln(", "√(", "^", "π", "e"].includes(btn) &&
                      styles.sciText,
                  ]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 15,
    justifyContent: "flex-end",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  historyButton: {
    backgroundColor: "#2a2a2a",
    padding: 10,
    borderRadius: 10,
  },
  historyButtonText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "600",
  },

  iconButton: {
    backgroundColor: "#2a2a2a",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  historyBox: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    padding: 10,
    maxHeight: 120,
    marginBottom: 10,
  },
  historyText: {
    color: "#bbb",
    fontSize: 15,
    textAlign: "right",
  },

  displayContainer: {
    backgroundColor: "#1e1e1e",
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 6,
  },
  displayText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#00ff88",
    textAlign: "right",
  },

  buttonsContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },

  equalsButton: {
    backgroundColor: "#007AFF",
  },
  clearButton: {
    backgroundColor: "#ff3b30",
  },
  specialText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sciText: {
    color: "#FFD700",
    fontSize: 18,
  },
  sciButton: {
    backgroundColor: "#333",
  },
});
