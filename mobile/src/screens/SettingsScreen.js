import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const SettingsScreen = () => {
  const [username, setUsername] = useState('');

  const handleUpdate = async () => {
    try {
      const token = 'your_jwt_token_here'; // استبدل بالتوكن الفعلي
      const response = await axios.put(
        'http://localhost:5000/api/users/update',
        { username },
        { headers: { Authorization: token } }
      );
      Alert.alert('نجاح', response.data.message);
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تحديث البيانات.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تحديث بيانات المستخدم</Text>
      <TextInput
        style={styles.input}
        placeholder="اسم المستخدم الجديد"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="تحديث" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
});

export default SettingsScreen;
