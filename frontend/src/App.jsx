import React, { useState, useEffect } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Mendapatkan riwayat percakapan dari local storage saat komponen pertama kali dimuat
    const storedChatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setChatHistory(storedChatHistory);

    // Membuat elemen pesan dari riwayat percakapan
    const messageElements = storedChatHistory.map((item, index) => {
      const role = item.role === 'user' ? 'send' : 'start';
      if (item.role === 'user') {
        return (
          <div className={`d-flex justify-content-end mb-4`} key={index + 1}>
            <div className="msg_cotainer_send">
              {item.message}
              <span className="msg_time_send">{item.time}</span>
            </div>
            <div className="img_cont_msg">
              <img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" className="rounded-circle user_img_msg" alt="user" />
            </div>
          </div>
        );
      } else {
        return (
          <div className={`d-flex justify-content-start mb-4`} key={index + 1}>
            <div className="img_cont_msg">
              <img src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png" className="rounded-circle user_img_msg" alt="bot" />
            </div>
            <div className="msg_cotainer">
              {item.message}
              <span className="msg_time">{item.time}</span>
            </div>
          </div>
        );
      }
    });

    // Menetapkan elemen pesan ke state messages
    setMessages(messageElements);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const strTime = `${hour}:${minute}`;
    const rawText = inputText;

    const userHtml = (
      <div className="d-flex justify-content-end mb-4" key={chatHistory.length + 1}>
        <div className="msg_cotainer_send">
          {rawText}
          <span className="msg_time_send">{strTime}</span>
        </div>
        <div className="img_cont_msg">
          <img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" className="rounded-circle user_img_msg" alt="user" />
        </div>
      </div>
    );

    const updatedChatHistory = [...chatHistory, { role: 'user', message: rawText, time: strTime }];
    setChatHistory(updatedChatHistory);

    setMessages([...messages, userHtml]);
    setInputText('');

    // Simulasi permintaan ke server (gantilah dengan implementasi yang sesuai)
    try {
      const response = await fetch('http://127.0.0.1:5000/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `msg=${encodeURIComponent(rawText)}`,
      });

      // Check the content type of the response
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it as JSON
        const data = await response.json();

        const botHtml = (
          <div className="d-flex justify-content-start mb-4" key={chatHistory.length + 2}>
            <div className="img_cont_msg">
              <img src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png" className="rounded-circle user_img_msg" alt="bot" />
            </div>
            <div className="msg_cotainer">
              {data.message} {/* Adjust this based on the actual structure of your response */}
              <span className="msg_time">{strTime}</span>
            </div>
          </div>
        );

        const updatedChatHistoryBot = [...updatedChatHistory, { role: 'bot', message: data.message, time: strTime }];
        setChatHistory(updatedChatHistoryBot);

        setMessages([...messages, userHtml, botHtml]); // Include userHtml and botHtml in the updated state

        // Menyimpan riwayat percakapan ke local storage setelah mendapatkan respons dari server
        localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistoryBot));
      } else {
        // If the response is not JSON, parse it as text
        const data = await response.text();

        // Handle the non-JSON response (adjust this based on your server's response format)
        const botHtml = (
          <div className="d-flex justify-content-start mb-4" key={chatHistory.length + 2}>
            <div className="img_cont_msg">
              <img src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png" className="rounded-circle user_img_msg" alt="bot" />
            </div>
            <div className="msg_cotainer">
              {data} {/* Adjust this based on the actual structure of your response */}
              <span className="msg_time">{strTime}</span>
            </div>
          </div>
        );

        const updatedChatHistoryBot = [...updatedChatHistory, { role: 'bot', message: data, time: strTime }];
        setChatHistory(updatedChatHistoryBot);

        setMessages([...messages, userHtml, botHtml]); // Include userHtml and botHtml in the updated state

        // Menyimpan riwayat percakapan ke local storage setelah mendapatkan respons dari server
        localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistoryBot));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png" className="rounded-circle user_img" alt="bot" />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>Alvabot</span>
                  <p>Ask me anything!</p>
                </div>
              </div>
            </div>
            <div id="messageFormeight" className="card-body msg_card_body">
              {messages}
            </div>
            <div className="card-footer">
              <form id="messageArea" className="input-group" onSubmit={handleSubmit}>
                <input type="text" id="text" name="msg" placeholder="Type your message..." autoComplete="off" className="form-control type_msg" value={inputText} onChange={(e) => setInputText(e.target.value)} required />
                <div className="input-group-append">
                  <button type="submit" id="send" className="input-group-text send_btn">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
