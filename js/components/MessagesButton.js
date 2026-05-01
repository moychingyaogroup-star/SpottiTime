class MessagesButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.createModal();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item" id="open-messages-modal" style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <i class="far fa-comment-dots" style="color: var(--text-secondary);"></i>
                    <span>Messages</span>
                </div>
                <div style="width: 16px; height: 16px; background-color: var(--accent-color); border-radius: 50%;"></div>
            </a>
        `;

        document.getElementById('open-messages-modal').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal-overlay';
        this.modal.id = 'messages-modal';

        // WhatsApp style UI
        this.modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; padding: 0;">
                <button class="modal-close" id="close-messages-modal" style="z-index: 10; top: 10px; right: 10px;">&times;</button>

                <div class="messages-container">
                    <!-- Contacts Sidebar -->
                    <div class="contacts-sidebar">
                        <div style="padding: 15px; background-color: #f0f2f5; border-bottom: 1px solid #d1d7db; font-weight: bold; color: #333;">
                            Chats
                        </div>
                        <div class="contact-item active">
                            <div class="friend-avatar" style="background-color: #4a90e2; color: white;">J</div>
                            <div>
                                <div style="font-weight: bold;">Jordan Lee</div>
                                <div style="font-size: 12px; color: #666;">Are we still on for tomorrow?</div>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="friend-avatar" style="background-color: #e24a4a; color: white;">A</div>
                            <div>
                                <div style="font-weight: bold;">Alex Chen</div>
                                <div style="font-size: 12px; color: #666;">Sounds good!</div>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Area -->
                    <div class="chat-area">
                        <div class="chat-header">
                            <div class="friend-avatar" style="background-color: #4a90e2; color: white; width: 35px; height: 35px;">J</div>
                            <div style="font-weight: bold;">Jordan Lee</div>
                        </div>

                        <div class="chat-messages" id="chat-messages">
                            <div class="message-bubble message-received" style="color: #333;">
                                Hey! How is the new app coming along?
                            </div>
                            <div class="message-bubble message-sent" style="color: #333;">
                                It's going great! Just added the messaging feature.
                            </div>
                            <div class="message-bubble message-received" style="color: #333;">
                                That's awesome. Are we still on for tomorrow?
                            </div>
                        </div>

                        <div class="chat-input-area">
                            <i class="far fa-smile" style="font-size: 24px; color: #54656f; cursor: pointer;"></i>
                            <i class="fas fa-paperclip" style="font-size: 24px; color: #54656f; cursor: pointer;"></i>
                            <input type="text" class="chat-input" id="chat-input-field" placeholder="Type a message">
                            <button class="send-btn" id="send-msg-btn">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);

        document.getElementById('close-messages-modal').addEventListener('click', () => this.closeModal());

        const bgPicker = document.getElementById('chat-bg-picker');
        if (bgPicker) {
            bgPicker.addEventListener('input', (e) => {
                const chatArea = document.getElementById('chat-area-container');
                if (chatArea) {
                    chatArea.style.backgroundColor = e.target.value;
                }
            });
        }

        const sendBtn = document.getElementById('send-msg-btn');
        const inputField = document.getElementById('chat-input-field');

        const sendMessage = () => {
            const text = inputField.value.trim();
            if (text) {
                const messagesContainer = document.getElementById('chat-messages');
                const newMsg = document.createElement('div');
                newMsg.className = 'message-bubble message-sent';
                newMsg.style.color = '#333';
                newMsg.textContent = text;
                messagesContainer.appendChild(newMsg);
                inputField.value = '';
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    openModal() {
        this.modal.style.display = 'flex';
        // Auto scroll to bottom of chat
        const msgs = document.getElementById('chat-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MessagesButton('messages-button-container');
});
