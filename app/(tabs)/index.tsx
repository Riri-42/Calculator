import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Calculator(){
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);


  const handlePress = (value: string) => {
    if(value === "C") {
      setInput("");
    }else if(value === "=") {
      try{
        const result = eval(input).toString();
        setHistory([...history.slice(0, 10), `${input} = ${result}`]); 
        setInput(result);
      }catch{
        setInput("Error");
      }
    } else {
        setInput(input + value);
    }
  };

  const buttons = [
    ["C", "/", "*", "⌫"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", ".", "%"]
  ];

  return (
    <View style={styles.container}>
      {/* History Toggle Button */}
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => setShowHistory(!showHistory)}
      >
        <Text style={styles.historyButtonText}>
          {showHistory ? "Hide History" : "View History"}
        </Text>
      </TouchableOpacity>

      {/* History Section (only if toggled on) */}
      {showHistory && (
        <ScrollView style={styles.historyContainer}>
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
      )}

      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{input || "0"}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === "C" ? styles.clearButton : null,
                  btn === "=" ? styles.equalsButton : null,
                ]}
                onPress={() =>
                  btn === "⌫" ? setInput(input.slice(0, -1)) : handlePress(btn)
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    (btn === "=" || btn === "C") && styles.specialText,
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
  historyContainer: {
    maxHeight: 100,
    marginBottom: 10,
    paddingHorizontal: 5,
  },

  historyText: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "right",
  },

  historyButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },

  historyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 20,
    justifyContent: "flex-end",
  },

  displayContainer: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },

  displayText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#0f0",
    textAlign: "right",
  },

  buttonsContainer: {
    flexDirection: "column",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  button: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  buttonText: {
    fontSize: 24,
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
});