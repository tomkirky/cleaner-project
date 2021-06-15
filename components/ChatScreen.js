import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text } from "react-native";
import { auth, db } from "../firebase";

const ChatScreen = () => {
  console.log(auth.currentUser);
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    db.collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    db.collection("chats").add({ _id, createdAt, text, user });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.email,
      }}
    />
  );
};

export default ChatScreen;