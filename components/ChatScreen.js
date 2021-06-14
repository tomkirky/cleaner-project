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
  const [messages, setMessages] = useState([]);

  //   useEffect(() => {
  //     setMessages([
  //       {
  //         _id: 1,
  //         text: "Hello developer",
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //         },
  //       },
  //     ]);
  //   }, []);
  useLayoutEffect(() => {
    db.collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data().id,
            createdAt: doc.data().createdAt,
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
