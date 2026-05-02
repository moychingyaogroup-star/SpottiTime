const STORY_TEMPLATES = [
  // 1. Retro Polaroid
  {
    id: "tpl_polaroid",
    html: `
      <div class="story-tpl-polaroid">
        <div class="polaroid-tape"></div>
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">📸</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Add a caption..."></div>
      </div>
    `
  },
  // 2. Win95 Error Popup
  {
    id: "tpl_win95",
    html: `
      <div class="story-tpl-win95">
        <div class="win95-header">
          <span>Error</span>
          <div class="win95-btn">X</div>
        </div>
        <div class="win95-content">
          <div class="story-edit-img-zone">
            <div class="placeholder-icon">⚠️</div>
          </div>
          <div class="story-edit-text-zone" contenteditable="true" data-placeholder="A fatal exception 0E has occurred..."></div>
          <div class="win95-ok-btn">OK</div>
        </div>
      </div>
    `
  },
  // 3. Torn Scrapbook Paper
  {
    id: "tpl_scrapbook",
    html: `
      <div class="story-tpl-scrapbook">
        <div class="scrapbook-paper">
          <div class="story-edit-img-zone">
            <div class="placeholder-icon">✂️</div>
          </div>
          <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Dear Diary..."></div>
        </div>
        <div class="scrapbook-tape"></div>
        <div class="scrapbook-tape t2"></div>
      </div>
    `
  },
  // 4. Y2K Sparkles
  {
    id: "tpl_y2k",
    html: `
      <div class="story-tpl-y2k">
        <div class="sparkle s1">✨</div>
        <div class="sparkle s2">💖</div>
        <div class="sparkle s3">✨</div>
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🦋</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="that's hot... "></div>
      </div>
    `
  },
  // 5. 8-Bit Retro
  {
    id: "tpl_8bit",
    html: `
      <div class="story-tpl-8bit">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">👾</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="INSERT COIN..."></div>
        <div class="pixel-hearts">❤️❤️❤️</div>
      </div>
    `
  },
  // 6. Vaporwave
  {
    id: "tpl_vaporwave",
    html: `
      <div class="story-tpl-vaporwave">
        <div class="vaporwave-grid"></div>
        <div class="vaporwave-sun"></div>
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🌴</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="a e s t h e t i c"></div>
      </div>
    `
  },
  // 7. Fake iOS Notification
  {
    id: "tpl_ios_notif",
    html: `
      <div class="story-tpl-ios-notif">
        <div class="story-edit-img-zone bg-img">
          <div class="placeholder-icon">📱</div>
        </div>
        <div class="ios-notif-bubble">
          <div class="ios-notif-header">
            <span class="app-icon">💬</span>
            <span class="app-name">MESSAGES</span>
            <span class="time">now</span>
          </div>
          <div class="story-edit-text-zone" contenteditable="true" data-placeholder="New message..."></div>
        </div>
      </div>
    `
  },
  // 8. VHS Glitch
  {
    id: "tpl_vhs",
    html: `
      <div class="story-tpl-vhs">
        <div class="vhs-overlay"></div>
        <div class="vhs-text-top">PLAY ►</div>
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">📼</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="12:00 AM"></div>
      </div>
    `
  },
  // 9. Film Strip
  {
    id: "tpl_filmstrip",
    html: `
      <div class="story-tpl-filmstrip">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🎞️</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Take 1..."></div>
      </div>
    `
  },
  // 10. Neon Sign
  {
    id: "tpl_neon",
    html: `
      <div class="story-tpl-neon">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🌃</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Open 24/7"></div>
      </div>
    `
  },
  // 11. Minimalist Magazine
  {
    id: "tpl_magazine",
    html: `
      <div class="story-tpl-magazine">
        <div class="mag-header">VOGUE</div>
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">📰</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Cover Story..."></div>
      </div>
    `
  },
  // 12. Receipt
  {
    id: "tpl_receipt",
    html: `
      <div class="story-tpl-receipt">
        <div class="receipt-header">THANK YOU</div>
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🧾</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Total: Priceless"></div>
        <div class="receipt-barcode">||| || ||| | ||</div>
      </div>
    `
  },
  // 13. Music Player
  {
    id: "tpl_music",
    html: `
      <div class="story-tpl-music">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🎵</div>
        </div>
        <div class="music-controls">
          <span>⏮</span> <span>▶️</span> <span>⏭</span>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Now playing..."></div>
      </div>
    `
  },
  // 14. Dreamy Cloud
  {
    id: "tpl_cloud",
    html: `
      <div class="story-tpl-cloud">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">☁️</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Head in the clouds..."></div>
      </div>
    `
  },
  // 15. Ransom Note
  {
    id: "tpl_ransom",
    html: `
      <div class="story-tpl-ransom">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">✂️</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="WE HAVE THE... "></div>
      </div>
    `
  },
  // 16. Cyberpunk
  {
    id: "tpl_cyberpunk",
    html: `
      <div class="story-tpl-cyberpunk">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🦾</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Night City..."></div>
      </div>
    `
  },
  // 17. Pastel Grid
  {
    id: "tpl_pastel",
    html: `
      <div class="story-tpl-pastel">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">🌸</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Soft vibes..."></div>
      </div>
    `
  },
  // 18. Holographic
  {
    id: "tpl_holo",
    html: `
      <div class="story-tpl-holo">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">💿</div>
        </div>
        <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Shiny..."></div>
      </div>
    `
  },
  // 19. Comic Book
  {
    id: "tpl_comic",
    html: `
      <div class="story-tpl-comic">
        <div class="story-edit-img-zone">
          <div class="placeholder-icon">💥</div>
        </div>
        <div class="comic-bubble">
          <div class="story-edit-text-zone" contenteditable="true" data-placeholder="POW!"></div>
        </div>
      </div>
    `
  },
  // 20. Gothic Frame
  {
    id: "tpl_gothic",
    html: `
      <div class="story-tpl-gothic">
        <div class="gothic-border">
          <div class="story-edit-img-zone">
            <div class="placeholder-icon">🦇</div>
          </div>
          <div class="story-edit-text-zone" contenteditable="true" data-placeholder="Darkness..."></div>
        </div>
      </div>
    `
  }
];

let currentStoryTemplate = null;

function renderStoryView() {
  const container = document.getElementById('stories-inner');
  if (!container) return;
  
  let feedWrap = document.getElementById('story-feed-wrap');
  if (!feedWrap) {
    feedWrap = document.createElement('div');
    feedWrap.id = 'story-feed-wrap';
    container.appendChild(feedWrap);
  }
  
  let galleryWrap = document.getElementById('story-gallery-wrap');
  if (!galleryWrap) {
    galleryWrap = document.createElement('div');
    galleryWrap.id = 'story-gallery-wrap';
    galleryWrap.innerHTML = '<div class="view-title" style="margin-top:20px;">Template Gallery</div><div class="story-gallery" id="story-gallery"></div>';
    container.appendChild(galleryWrap);
  }
  
  const gallery = document.getElementById('story-gallery');
  gallery.innerHTML = '';
  
  STORY_TEMPLATES.forEach((tpl, index) => {
    const card = document.createElement('div');
    card.className = 'story-gallery-card';
    card.innerHTML = `<div class="story-gallery-preview">${tpl.html}</div>`;
    card.onclick = () => openStoryPreview(index);
    gallery.appendChild(card);
  });
  
  renderStoryFeed();
}

function openStoryPreview(templateIndex) {
  currentStoryTemplate = STORY_TEMPLATES[templateIndex];
  
  const overlay = document.createElement('div');
  overlay.id = 'story-preview-overlay';
  
  const content = document.createElement('div');
  content.className = 'story-preview-content';
  content.innerHTML = currentStoryTemplate.html;
  
  // Set up image upload
  const imgZone = content.querySelector('.story-edit-img-zone');
  if (imgZone) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.onchange = (e) => {
      uploadStoryImage(e.target.files[0], imgZone);
    };
    
    imgZone.onclick = () => fileInput.click();
  }
  
  // Controls
  const controls = document.createElement('div');
  controls.className = 'story-preview-controls';
  
  const postBtn = document.createElement('button');
  postBtn.className = 'tf-btn';
  postBtn.textContent = 'Post Story';
  postBtn.onclick = () => {
    const textZone = content.querySelector('.story-edit-text-zone');
    const text = textZone ? textZone.innerText.trim() : '';
    let imgUrl = imgZone?.dataset?.cloudUrl || '';
    
    postStory(currentStoryTemplate.id, text, imgUrl);
    document.body.removeChild(overlay);
  };
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'tf-btn tf-btn-secondary';
  closeBtn.textContent = 'Cancel';
  closeBtn.onclick = () => {
    document.body.removeChild(overlay);
  };
  
  controls.appendChild(closeBtn);
  controls.appendChild(postBtn);
  
  overlay.appendChild(content);
  overlay.appendChild(controls);
  document.body.appendChild(overlay);
}

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas'); 
      const MAX_WIDTH = 1080; // Perfect width for 9:16 stories
      let scaleSize = 1;
      if (img.width > MAX_WIDTH) { scaleSize = MAX_WIDTH / img.width; }
      canvas.width = img.width * scaleSize; 
      canvas.height = img.height * scaleSize;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      // Compress to 80% JPEG to keep file sizes tiny
      canvas.toBlob(blob => callback(blob), 'image/jpeg', 0.8); 
    }; 
    img.src = e.target.result;
  }; 
  reader.readAsDataURL(file);
}

function uploadStoryImage(file, imgZone) {
  if (!file) return;
  if (typeof showToast === 'function') showToast('Compressing & Uploading...');
  
  compressImage(file, blob => {
    const formData = new FormData(); 
    formData.append('file', blob); 
    formData.append('upload_preset', 'spottitime_preset'); // Our unauthenticated upload preset
    
    fetch('https://api.cloudinary.com/v1_1/dqcx0wg2i/image/upload', { 
      method: 'POST', 
      body: formData 
    })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url) {
         // 1. Apply to the UI
         imgZone.style.backgroundImage = `url('${data.secure_url}')`;
         imgZone.style.backgroundSize = 'cover';
         imgZone.style.backgroundPosition = 'center';
         // 2. Store the URL safely on the element for the postStory payload
         imgZone.dataset.cloudUrl = data.secure_url; 
         if (typeof showToast === 'function') showToast('Image uploaded! 📸');
      }
    }).catch(err => {
      if (typeof showToast === 'function') showToast('Upload Error: ' + err.message);
    });
  });
}

async function postStory(templateId, text, imgUrl) {
  const uid = _uid();
  if (!uid) { showToast('Not logged in'); return; }
  
  const docData = {
    uid,
    authorName: window.TF_PROFILE?.displayName || 'Unknown',
    authorPhoto: window.TF_PROFILE?.photoURL || '🐱',
    templateId,
    text,
    imgUrl,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  try {
    await window.TF_DB.collection('stories').add(docData);
    showToast('Story Published! 🎉');
    renderStoryFeed();
  } catch (e) {
    showToast('Error posting story: ' + e.message);
  }
}

async function renderStoryFeed() {
  const feedWrap = document.getElementById('story-feed-wrap');
  if (!feedWrap) return;
  
  feedWrap.innerHTML = '<div class="view-title">Active Stories</div><div class="story-feed" id="story-feed"></div>';
  const feed = document.getElementById('story-feed');
  
  const uid = _uid();
  if (!uid) return;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  try {
    const snap = await window.TF_DB.collection('stories')
      .where('timestamp', '>', yesterday)
      .orderBy('timestamp', 'desc')
      .get();
      
    const friendUids = _friendsCache.map(f => f.uid);
    friendUids.push(uid);
    
    const stories = [];
    snap.forEach(doc => {
      const data = doc.data();
      if (friendUids.includes(data.uid)) {
        stories.push({ id: doc.id, ...data });
      }
    });
    
    if (stories.length === 0) {
      feed.innerHTML = '<div style="color:var(--muted);padding:10px;">No recent stories from friends.</div>';
      return;
    }
    
    stories.forEach(story => {
      const card = document.createElement('div');
      card.className = 'story-feed-card';
      
      const tpl = STORY_TEMPLATES.find(t => t.id === story.templateId) || STORY_TEMPLATES[0];
      card.innerHTML = `<div class="story-feed-preview">${tpl.html}</div>`;
      
      // Fill data
      const imgZone = card.querySelector('.story-edit-img-zone');
      if (imgZone && story.imgUrl) {
        imgZone.style.backgroundImage = `url('${story.imgUrl}')`;
        imgZone.style.backgroundSize = 'cover';
        imgZone.style.backgroundPosition = 'center';
        const icon = imgZone.querySelector('.placeholder-icon');
        if (icon) icon.style.display = 'none';
      }
      
      const textZone = card.querySelector('.story-edit-text-zone');
      if (textZone && story.text) {
        textZone.innerText = story.text;
        textZone.contentEditable = "false";
      }
      
      // Author info
      const authorInfo = document.createElement('div');
      authorInfo.className = 'story-feed-author';
      authorInfo.textContent = story.authorName;
      card.appendChild(authorInfo);
      
      feed.appendChild(card);
    });
  } catch (e) {
    console.error('Error fetching stories:', e);
    feed.innerHTML = '<div style="color:var(--muted);padding:10px;">Failed to load stories.</div>';
  }
}
