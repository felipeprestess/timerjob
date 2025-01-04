import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';

interface TimeInputProps {
  hour: string;
  minute: string;
  onHourChange: (value: string) => void;
  onMinuteChange: (value: string) => void;
  placeholderHour: string;
  placeholderMinute: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  hour,
  minute,
  onHourChange,
  onMinuteChange,
  placeholderHour,
  placeholderMinute,
}) => {
  return (
    <View style={styles.container}>
        
      <TextInput
        style={styles.input}
        value={hour}
        onChangeText={onHourChange}
        placeholder={placeholderHour}
        keyboardType="numeric"
        maxLength={2}
      />
      <Text style={styles.separator}>:</Text>
      <TextInput
        style={styles.input}
        value={minute}
        onChangeText={onMinuteChange}
        placeholder={placeholderMinute}
        keyboardType="numeric"
        maxLength={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    textAlign: 'center',
    width: '40%',
    fontSize: 18,
  },
  separator: {
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimeInput;