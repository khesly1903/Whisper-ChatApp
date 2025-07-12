import React, { useContext, useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { ThemeContext } from '../context/ThemeContext';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { MessageBubble } from "../components/MessageBubble";

function ChatContainer() {

    const theme = useContext(ThemeContext);
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
    const messagesEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id) //current messages
        subscribeToMessages()         //realtime functionality

        return () => unsubscribeFromMessages() //cleanup func
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

    // scroll bottom auto
    useEffect(() => {
        if (messagesEndRef.current && messages) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "1rem",
                overflow: "hidden"
            }}>
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        )
    }

    return (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "1rem",
            overflow: "hidden",
        }}>
            <ChatHeader />


            <div style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                
            }}>
                {messages.length === 0 ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        color: theme?.themeInfo?.colorText
                    }}>
                        No messages yet. Start a conversation!
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <MessageBubble
                                key={message._id}
                                side={message.senderID === selectedUser._id ? "left" : "right"}
                                image={message.image}
                                text={message.text}
                            />
                        ))}
                        {/* Scroll ref invisible element */}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>
            <MessageInput />
        </div>
    )
}

export default ChatContainer
