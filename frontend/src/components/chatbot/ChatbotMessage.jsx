const ChatbotMessage = ({ message }) => {
    const isUser = message.sender === "user";

    return (
        <div
            className={`chatbot-message-row ${
                isUser ? "user-message-row" : "bot-message-row"
            }`}
        >
            {!isUser && (
                <div className="chatbot-avatar">
                    🤖
                </div>
            )}

            <div
                className={`chatbot-message ${
                    isUser ? "user-message" : "bot-message"
                }`}
            >
                {message.text}
            </div>
        </div>
    );
};

export default ChatbotMessage;