document.addEventListener('DOMContentLoaded', () => {
    const colorBlocks = document.querySelectorAll('.color-block[draggable="true"]');
    const slotContents = document.querySelectorAll('.slot-content');
    let draggedColor = null;

    // Set up draggable color blocks
    colorBlocks.forEach(block => {
        block.addEventListener('dragstart', (e) => {
            draggedColor = block.style.backgroundColor;
            e.dataTransfer.setData('text/plain', draggedColor);
            e.dataTransfer.effectAllowed = 'copy';
        });
    });

    // Set up drop zones
    slotContents.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            slot.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });

        slot.addEventListener('dragleave', () => {
            slot.style.backgroundColor = 'transparent';
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.style.backgroundColor = 'transparent';

            const color = e.dataTransfer.getData('text/plain');
            if (color) {
                createScheduledBlock(slot, color);
            }
        });
    });

    function createScheduledBlock(parent, color) {
        const block = document.createElement('div');
        block.className = 'scheduled-block';
        block.style.backgroundColor = color;

        // Toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'scheduled-block-toolbar';

        const btnDecrease = document.createElement('button');
        btnDecrease.innerHTML = '<i class="fas fa-minus"></i>';
        btnDecrease.title = "Decrease Font Size";

        const btnIncrease = document.createElement('button');
        btnIncrease.innerHTML = '<i class="fas fa-plus"></i>';
        btnIncrease.title = "Increase Font Size";

        const btnEmoji = document.createElement('button');
        btnEmoji.innerHTML = '<i class="far fa-smile"></i>';
        btnEmoji.title = "Add Emoji";

        const btnComplete = document.createElement('button');
        btnComplete.innerHTML = '<i class="fas fa-check"></i>';
        btnComplete.title = "Complete Task";

        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = '<i class="fas fa-trash"></i>';
        btnDelete.title = "Delete Block";

        toolbar.appendChild(btnDecrease);
        toolbar.appendChild(btnIncrease);
        toolbar.appendChild(btnEmoji);
        toolbar.appendChild(btnComplete);
        toolbar.appendChild(btnDelete);

        // Editable Content
        const content = document.createElement('div');
        content.className = 'scheduled-block-content';
        content.contentEditable = true;
        content.textContent = "New Event";

        block.appendChild(toolbar);
        block.appendChild(content);
        parent.appendChild(block);

        // Actions
        let currentFontSize = 14;

        btnIncrease.addEventListener('click', () => {
            currentFontSize += 2;
            content.style.fontSize = currentFontSize + 'px';
        });

        btnDecrease.addEventListener('click', () => {
            if (currentFontSize > 8) {
                currentFontSize -= 2;
                content.style.fontSize = currentFontSize + 'px';
            }
        });

        btnComplete.addEventListener('click', () => {
            if (window.pointsSystem && !block.classList.contains('completed')) {
                window.pointsSystem.addPoints(50);
                block.classList.add('completed');
                content.style.textDecoration = 'line-through';
                content.style.opacity = '0.7';
                btnComplete.disabled = true;
            }
        });

        btnDelete.addEventListener('click', () => {
            block.remove();
        });

        btnEmoji.addEventListener('click', (e) => {
            e.stopPropagation();
            showEmojiPicker(btnEmoji, content);
        });
    }

    let currentPicker = null;

    function showEmojiPicker(button, contentElement) {
        if (currentPicker) {
            currentPicker.remove();
            currentPicker = null;
        }

        const emojis = ['😀', '😂', '🥰', '😎', '🤔', '😴', '💪', '🍽️', '🚗', '📚', '💼', '🎨', '🎮', '🏆', '🧹'];
        const picker = document.createElement('div');
        picker.className = 'emoji-picker-container';

        const rect = button.getBoundingClientRect();
        picker.style.top = (rect.bottom + window.scrollY + 5) + 'px';
        picker.style.left = (rect.left + window.scrollX) + 'px';

        emojis.forEach(emoji => {
            const span = document.createElement('span');
            span.textContent = emoji;
            span.addEventListener('click', () => {
                contentElement.textContent += emoji;
                picker.remove();
                currentPicker = null;
            });
            picker.appendChild(span);
        });

        document.body.appendChild(picker);
        currentPicker = picker;

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closePicker(e) {
                if (currentPicker && !currentPicker.contains(e.target)) {
                    currentPicker.remove();
                    currentPicker = null;
                    document.removeEventListener('click', closePicker);
                }
            });
        }, 0);
    }
});
