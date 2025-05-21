// src/Chat.tsx
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Avatar, Box, Button, IconButton, Typography, CircularProgress } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../context/AuthContent";
import { sendChatRequest, getUserChats, deleteUserChats } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import "../pages/Chat.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const chatMessagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setMessages([...data.chats]);
          toast.success("Successfully Loaded Chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Loading Failed", { id: "loadchats" });
          setMessages([{ role: 'assistant', content: "Hello! How can I help you today?" }]);
        });
    }
  }, [auth]);

  const handleSend = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const chatData = await sendChatRequest(newMessage.content);
      setMessages([...chatData.chats]);
    } catch (error: any) {
      console.error("Error sending chat:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      if (error.response?.status === 429) {
        setError(errorMessage);
        toast.error("Too many requests! Please slow down.", { id: "chat_error" });
      } else {
        setError(errorMessage);
        toast.error(errorMessage, { id: "chat_error" });
      }
      setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClear = async () => {
    try {
      toast.loading("Deleting chats", { id: "deletechats" });
      await deleteUserChats();
      setMessages([{ role: 'assistant', content: "All chats cleared! How can I assist you now?" }]);
      toast.success("Chats Deleted Successfully", { id: "deletechats" });
    } catch (error) {
      console.error(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <Box className="chat-container">
      <Box className="chat-main">
        {/* Sidebar with chatbot info */}
        <Box className="chat-sidebar">
          <Avatar className="sidebar-avatar">
            {auth?.user?.name[0]}
            {auth?.user?.name?.split(" ")[1]?.[0] ?? ""}
          </Avatar>
          <Typography component="h2" className="sidebar-heading">
            YOU ARE TALKING TO A CHATBOT
          </Typography>
          <Typography className="sidebar-description">
            You can ask any questions related to Knowledge, Business, Advice, Education, etc. But avoid personal
            information!!
          </Typography>
          <Button onClick={handleClear} className="clear-chat-button">
            Clear Chat
          </Button>
          
        </Box>

        {/* Chat area */}
        <Box className="chat-window">
          <Box ref={chatMessagesContainerRef} className="chat-messages">
            {messages.map((msg, idx) => (
              <Box key={idx} className={`message ${msg.role}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => <Typography component="p" sx={{ color: 'inherit', mb: 1.5 }} {...props} />,
                    li: ({ node, ...props }) => <li style={{ marginBottom: '0.5em', marginLeft: '1.2em' }} {...props} />,
                    ol: ({ node, ...props }) => <ol style={{ marginBottom: '0.5em' }} {...props} />,
                    ul: ({ node, ...props }) => <ul style={{ marginBottom: '0.5em' }} {...props} />,
                    a: ({ node, ...props }) => <a style={{ color: '#8be9fd' }} target="_blank" rel="noopener noreferrer" {...props} />,
                    h1: ({node, ...props}) => <Typography variant="h6" component="h3" sx={{mt:2, mb:1, color: '#8be9fd'}} {...props} />,
                    h2: ({node, ...props}) => <Typography variant="subtitle1" component="h4" sx={{mt:1.5, mb:0.5, color: '#8be9fd'}} {...props} />,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </Box>
            ))}
            {isLoading && (
              <Box className="message assistant loading">
                <div className="dot-flashing"></div>
                <div className="dot-flashing dot-flashing-delay1"></div>
                <div className="dot-flashing dot-flashing-delay2"></div>
              </Box>
            )}
          </Box>

          {error && (
            <Typography className="chat-error-message">
              {error}
            </Typography>
          )}

          {/* Input box */}
          <Box component="form" onSubmit={handleSend} className="chat-input-form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              placeholder="Type your message..."
              className="chat-input"
            />
            <IconButton type="submit" disabled={isLoading || !input.trim()} className="chat-send-button">
              {isLoading ? <CircularProgress size={24} color="inherit" /> : <IoMdSend />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
