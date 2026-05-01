class FriendsButton {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.username = "GuestUser" + Math.floor(Math.random() * 1000);
        this.friendTag = "#" + Math.random().toString(16).substring(2, 10).toUpperCase();
        this.friends = [];
        this.render();
        this.createModal();
    }

    render() {
        this.container.innerHTML = `
            <a href="#" class="nav-item" id="open-friends-modal">
                <i class="fas fa-user-friends" style="color: var(--text-secondary);"></i>
                <span>Friends</span>
            </a>
        `;

        document.getElementById('open-friends-modal').addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal-overlay';
        this.modal.id = 'friends-modal';

        this.modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" id="close-friends-modal">&times;</button>
                <h2 class="modal-title">Friends</h2>

                <div class="user-profile-summary">
                    <div class="user-avatar-large"><i class="fas fa-user"></i></div>
                    <div class="user-info">
                        <h3>${this.username}</h3>
                        <span class="friend-tag">Tag: ${this.friendTag}</span>
                    </div>
                </div>

                <div class="friend-search-container">
                    <input type="text" class="friend-search-input" id="friend-search-input" placeholder="Enter FriendTag (e.g. #ADC13875)">
                    <button class="add-friend-btn" id="add-friend-btn">Add Friend</button>
                </div>

                <h3>Your Friends</h3>
                <ul class="friends-list" id="friends-list">
                    <li class="friend-item" style="color: var(--text-secondary); justify-content: center; border: none;">No friends added yet.</li>
                </ul>
            </div>
        `;

        document.body.appendChild(this.modal);

        document.getElementById('close-friends-modal').addEventListener('click', () => this.closeModal());

        document.getElementById('add-friend-btn').addEventListener('click', () => this.handleAddFriend());
    }

    handleAddFriend() {
        const input = document.getElementById('friend-search-input');
        const tag = input.value.trim();

        if (!tag) {
            alert("Please enter a FriendTag.");
            return;
        }

        if (tag === this.friendTag) {
            alert("You cannot add yourself.");
            return;
        }

        // Simulate adding a friend
        const newFriend = {
            name: "User_" + tag.substring(1, 5),
            tag: tag
        };

        this.friends.push(newFriend);
        this.renderFriendsList();
        input.value = '';
        alert(`Successfully added ${newFriend.name} (${newFriend.tag})!`);
    }

    renderFriendsList() {
        const list = document.getElementById('friends-list');
        list.innerHTML = '';

        if (this.friends.length === 0) {
            list.innerHTML = '<li class="friend-item" style="color: var(--text-secondary); justify-content: center; border: none;">No friends added yet.</li>';
            return;
        }

        this.friends.forEach(friend => {
            const li = document.createElement('li');
            li.className = 'friend-item';

            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'friend-avatar';
            avatarDiv.innerHTML = '<i class="fas fa-user" style="color: white;"></i>';

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'friend-details';

            const nameDiv = document.createElement('div');
            nameDiv.style.fontWeight = 'bold';
            nameDiv.textContent = friend.name;

            const tagDiv = document.createElement('div');
            tagDiv.style.fontSize = '12px';
            tagDiv.style.color = 'var(--text-secondary)';
            tagDiv.textContent = friend.tag;

            detailsDiv.appendChild(nameDiv);
            detailsDiv.appendChild(tagDiv);

            li.appendChild(avatarDiv);
            li.appendChild(detailsDiv);
            list.appendChild(li);
        });
    }

    openModal() {
        this.modal.style.display = 'flex';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FriendsButton('friends-button-container');
});
