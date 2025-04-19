import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContent';
import { blue } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { sendChatRequest } from '../helpers/api-communicator';

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 🆕 state
  const [error, setError] = useState(""); // optional: show rate limit error

  const chatId = "1234567890abcdef"; // replace later with real ID

  const handleSubmit = async () => {
    const userInputMessage = inputRef.current?.value?.trim() || "";
    if (!userInputMessage || isLoading) return;

    setIsLoading(true);
    setError(""); // reset any old error

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content: userInputMessage };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(chatId, "user", userInputMessage);
      setChatMessages([...chatData.chats]);
    } catch (error: any) {
      console.error("Error sending chat:", error);
      if (error.response?.status === 429) {
        setError("Too many requests. Please wait and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
      {/* Sidebar */}
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{
          display: "flex", width: "100%", height: "60vh", bgcolor: "rgb(17,29,39)", borderRadius: 5,
          flexDirection: 'column', mx: 3,
        }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: 'white', color: 'black', fontWeight: 700 }}>
            {auth?.user?.name[0]}
            {auth?.user?.name?.split(" ")[1]?.[0] ?? ''}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            YOU ARE TALKING TO A CHATBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask any questions related to Knowledge, Business, Advice,
            Education, etc. But avoid personal information!!
          </Typography>
          <Button
            sx={{
              width: "200px", my: "auto", color: "white", fontWeight: "700",
              borderRadius: 3, mx: "auto", bgcolor: blue[300],
              ":hover": { bgcolor: blue.A400 },
            }}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3 }}>
        <Typography sx={{ fontSize: "40px", color: "white", mb: 2, mx: "auto" }}>
          MERN-GPT
        </Typography>

        <Box sx={{
          width: "100%", height: "60vh", borderRadius: 3, mx: "auto",
          display: "flex", flexDirection: "column", overflowY: "auto", scrollBehavior: "smooth",
        }}>
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 1, mx: "auto" }}>
            {error}
          </Typography>
        )}

        {/* Chat Input Box */}
        <div style={{
          width: "100%", padding: "20px", borderRadius: 8, backgroundColor: "rgb(17,27,39)",
          display: "flex", margin: "auto"
        }}>
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            style={{
              width: "100%", backgroundColor: "transparent", padding: "10px",
              border: "none", outline: "none", color: "white", fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} disabled={isLoading} sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
