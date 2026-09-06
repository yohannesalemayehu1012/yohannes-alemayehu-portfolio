import { useState } from "react";

const ChatbotInput = ({ onSend, disabled = false }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const message = input.trim();

        if (!message || disabled) {
            return;
        }

        onSend(message);
        setInput("");
    };

    return (
        <form
            className="chatbot-input-container"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me something..."
                maxLength={1000}
                disabled={disabled}
                aria-label="Chatbot message"
            />

            <button
                type="submit"
                disabled={disabled || !input.trim()}
                aria-label="Send message"
            >
                ➤
            </button>
        </form>
    );
};

export default ChatbotInput;