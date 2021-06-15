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
	useLayoutEffect(() => {
		db.collection("chatsTwo")
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
		db.collection("chatsTwo").add({ _id, createdAt, text, user });
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			showUserAvatar={true}
			showAvatarForEveryMessage={true}
			user={{
				_id: auth.currentUser.email,
				avatar: auth.currentUser.photoURL,
			}}
		/>
	);
};

export default ChatScreen;
