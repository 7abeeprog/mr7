import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const DeleteAccountScreen = () => {
  const handleDelete = async () => {
    try {
      const token = 'your_jwt_token_here'; // استبدل بالتوكن الفعلي
      const response = await axios.delete(
        'http://localhost:5000/api/users/delete',
        { headers: { Authorization: token } }
      );
      Alert.alert('نجاح', response.data.message);
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء حذف الحساب.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>حذف الحساب</Text>
      <Button title="حذف الحساب" color="red" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, color: 'red' },
});

export default DeleteAccountScreen;
