import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { saveUser } from "../storage/userStorage";
import { User } from "../types/User";
import styles from "../styles/global";
import { v4 as uuiv4 } from "uuid";
import { Picker } from "@react-native-picker/picker";

import avatar1 from "../assets/Rat_red.png";
import avatar2 from "../assets/Rat_yellow.png";
import avatar3 from "../assets/Rat_blue.png";

const avatars = [avatar1, avatar2, avatar3];

type Props = {
  onUserCreated?: () => void; // Navigator will use this
};

const CreateUser: React.FC<Props> = ({ onUserCreated }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("../assets/Red_rat");

  const handleCreate = async () => {
    if (!name.trim()) return alert("Please enter your name.");

    const newUser: User = {
      id: uuiv4(),
      username: name.trim(),
      avatarUri: undefined,
    };

    
    await saveUser(newUser);

    if (onUserCreated) onUserCreated();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardHeader}>Welcome!</Text>
      <Text style={styles.cardText}>Create your profile to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />

      <Picker
          selectedValue={url}
          style={styles.picker}
          onValueChange={setUrl}
        >
          <Picker.Item label="Red rat" value={avatar1} />
          <Picker.Item label="Yellow rat" value={avatar2} />
          <Picker.Item label="Blue rat" value={avatar3} />
        </Picker>

      <Image source={url}></Image>

      <TouchableOpacity style={styles.saveBtn} onPress={handleCreate}>
        <Text style={styles.saveText}>Create User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateUser;