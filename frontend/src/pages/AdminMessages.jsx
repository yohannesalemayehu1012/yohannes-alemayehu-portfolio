import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaEye,
  FaTrash,
  FaTimes,
  FaCheck,
  FaUndo,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import DeleteConfirmation from "../components/DeleteConfirmation";

import {
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../services/messageService";

import "./AdminMessages.css";

const AdminMessages = () => {
  const { token } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadInitialMessages = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await getMessages(token);

        if (!cancelled) {
          setMessages(result.data || []);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error(
            error.response?.data?.message || "Failed to load messages",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialMessages();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleView = async (message) => {
    setSelectedMessage(message);

    // Automatically mark unread message as read
    if (message.status === "unread") {
      try {
        await updateMessageStatus(message.id, "read", token);

        setMessages((currentMessages) =>
          currentMessages.map((item) =>
            item.id === message.id
              ? {
                  ...item,
                  status: "read",
                }
              : item,
          ),
        );

        setSelectedMessage({
          ...message,
          status: "read",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "read" ? "unread" : "read";

    try {
      await updateMessageStatus(id, newStatus, token);

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? {
                ...message,
                status: newStatus,
              }
            : message,
        ),
      );

      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({
          ...selectedMessage,
          status: newStatus,
        });
      }

      toast.success(`Message marked as ${newStatus}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update message");
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await deleteMessage(id, token);

      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== id),
      );

      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }

      toast.success("Message deleted successfully");
      setMessageToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    } finally {
      setDeleting(false);
    }
  };

  const totalMessages = messages.length;

  const unreadMessages = messages.filter(
    (message) => message.status === "unread",
  ).length;

  const readMessages = messages.filter(
    (message) => message.status === "read",
  ).length;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin-messages-page">
        <div className="admin-messages-loading">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="admin-messages-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-eyebrow">ADMIN INBOX</span>

          <h1>Messages</h1>

          <p>Manage messages submitted through your portfolio contact form.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="message-stat-grid">
        <div className="message-stat-card">
          <div className="message-stat-icon">
            <FaEnvelope />
          </div>

          <div>
            <span>Total Messages</span>
            <strong>{totalMessages}</strong>
          </div>
        </div>

        <div className="message-stat-card">
          <div className="message-stat-icon">
            <FaEnvelope />
          </div>

          <div>
            <span>Unread</span>
            <strong>{unreadMessages}</strong>
          </div>
        </div>

        <div className="message-stat-card">
          <div className="message-stat-icon">
            <FaEnvelopeOpen />
          </div>

          <div>
            <span>Read</span>
            <strong>{readMessages}</strong>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="messages-empty">
            <FaEnvelope />

            <h2>No messages yet</h2>

            <p>Messages submitted from your contact form will appear here.</p>
          </div>
        ) : (
          <div className="messages-table-wrapper">
            <table className="messages-table">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((message) => (
                  <tr
                    key={message.id}
                    className={
                      message.status === "unread" ? "message-unread" : ""
                    }
                  >
                    <td>
                      <div className="message-sender">
                        <strong>{message.name}</strong>

                        <span>{message.email}</span>
                      </div>
                    </td>

                    <td>{message.subject || "No subject"}</td>

                    <td>{formatDate(message.created_at)}</td>

                    <td>
                      <span className={`message-status ${message.status}`}>
                        {message.status === "unread" ? (
                          <>
                            <FaEnvelope />
                            Unread
                          </>
                        ) : (
                          <>
                            <FaEnvelopeOpen />
                            Read
                          </>
                        )}
                      </span>
                    </td>

                    <td>
                      <div className="message-actions">
                        <button
                          className="message-view-btn"
                          onClick={() => handleView(message)}
                          title="View message"
                        >
                          <FaEye />
                        </button>

                        <button
                          className="message-status-btn"
                          onClick={() =>
                            handleStatusChange(message.id, message.status)
                          }
                          title={
                            message.status === "read"
                              ? "Mark unread"
                              : "Mark read"
                          }
                        >
                          {message.status === "read" ? <FaUndo /> : <FaCheck />}
                        </button>

                        <button
                          className="message-delete-btn"
                          onClick={() => setMessageToDelete(message)}
                          title="Delete message"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div
          className="message-modal-overlay"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="message-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="message-modal-header">
              <div>
                <span>MESSAGE</span>

                <h2>{selectedMessage.subject || "No subject"}</h2>
              </div>

              <button onClick={() => setSelectedMessage(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="message-modal-body">
              <div className="message-detail">
                <span>From</span>

                <strong>{selectedMessage.name}</strong>
              </div>

              <div className="message-detail">
                <span>Email</span>

                <a href={`mailto:${selectedMessage.email}`}>
                  {selectedMessage.email}
                </a>
              </div>

              <div className="message-detail">
                <span>Date</span>

                <strong>{formatDate(selectedMessage.created_at)}</strong>
              </div>

              <div className="message-detail">
                <span>Status</span>

                <strong>{selectedMessage.status}</strong>
              </div>

              <div className="message-content">
                <span>Message</span>

                <p>{selectedMessage.message}</p>
              </div>
            </div>

            <div className="message-modal-footer">
              <button
                className="message-modal-status"
                onClick={() =>
                  handleStatusChange(selectedMessage.id, selectedMessage.status)
                }
              >
                {selectedMessage.status === "read"
                  ? "Mark as Unread"
                  : "Mark as Read"}
              </button>

              <button
                className="message-modal-delete"
                onClick={() => setMessageToDelete(selectedMessage)}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmation
        open={Boolean(messageToDelete)}
        itemName={
          messageToDelete?.subject || messageToDelete?.name || "this message"
        }
        itemType="Message"
        deleting={deleting}
        onCancel={() => setMessageToDelete(null)}
        onConfirm={() => handleDelete(messageToDelete.id)}
      />
    </div>
  );
};

export default AdminMessages;
