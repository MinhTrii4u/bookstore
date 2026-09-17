/* ============================================================
   GoldPage — Chatbox Module
   Floating chat widget with quick replies
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ========== Create Chatbox HTML ==========
  const chatboxHTML = `
    <!-- Chatbox Toggle Button -->
    <div id="chatbox-toggle" class="fixed bottom-6 right-6 z-[996] cursor-pointer group">
      <div class="pulse-ring"></div>
      <div class="pulse-ring" style="animation-delay: 0.5s;"></div>
      <button class="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110" style="background: linear-gradient(135deg, #F4E5A1, #D4AF37, #A67C00);">
        <i data-lucide="message-circle" class="w-6 h-6 text-gray-900 chatbox-icon-open"></i>
        <i data-lucide="x" class="w-6 h-6 text-gray-900 chatbox-icon-close hidden"></i>
      </button>
    </div>

    <!-- Chatbox Window -->
    <div id="chatbox-window" class="chatbox-window">
      <!-- Chat Header -->
      <div class="px-5 py-4 flex items-center gap-3" style="background: var(--navy);">
        <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, #F4E5A1, #D4AF37);">
          <i data-lucide="book-open" class="w-5 h-5 text-gray-900"></i>
        </div>
        <div>
          <h4 class="font-semibold text-sm" style="color: var(--gold);">Trợ lý Hành Tinh Chữ</h4>
          <p class="text-xs text-gray-400 flex items-center gap-1">
            <span class="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
            Đang trực tuyến
          </p>
        </div>
      </div>

      <!-- Chat Messages -->
      <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4" style="background: #fafaf5;">
        <!-- Bot greeting -->
        <div class="flex gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #F4E5A1, #D4AF37);">
            <i data-lucide="bot" class="w-4 h-4 text-gray-900"></i>
          </div>
          <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm border border-gray-100">
            <p class="text-sm text-gray-700">Xin chào! 📚 Tôi là trợ lý của <strong>Hành Tinh Chữ</strong>. Tôi có thể giúp bạn:</p>
            <ul class="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Tìm sách theo sở thích</li>
              <li>• Theo dõi đơn hàng</li>
              <li>• Tư vấn sách làm quà tặng</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Quick Replies -->
      <div id="chat-quick-replies" class="px-4 py-3 flex gap-2 flex-wrap border-t border-gray-100" style="background: #fafaf5;">
        <button class="quick-reply" onclick="sendQuickReply('Tìm sách theo thể loại')">📖 Tìm sách theo thể loại</button>
        <button class="quick-reply" onclick="sendQuickReply('Kiểm tra đơn hàng')">📦 Kiểm tra đơn hàng</button>
        <button class="quick-reply" onclick="sendQuickReply('Tư vấn quà tặng')">🎁 Tư vấn quà tặng</button>
      </div>

      <!-- Chat Input -->
      <div class="px-4 py-3 border-t border-gray-200 flex items-center gap-2 bg-white">
        <input
          type="text"
          id="chat-input"
          placeholder="Nhập tin nhắn..."
          class="flex-1 px-4 py-2.5 rounded-full text-sm input-gold"
        >
        <button id="chat-send" class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: linear-gradient(135deg, #F4E5A1, #D4AF37, #A67C00);">
          <i data-lucide="send" class="w-4 h-4 text-gray-900"></i>
        </button>
      </div>
    </div>
  `;

  // Inject chatbox into body
  const chatContainer = document.createElement('div');
  chatContainer.innerHTML = chatboxHTML;
  document.body.appendChild(chatContainer);

  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  // ========== Toggle Chatbox ==========
  const toggle = document.getElementById('chatbox-toggle');
  const chatWindow = document.getElementById('chatbox-window');
  const iconOpen = toggle?.querySelector('.chatbox-icon-open');
  const iconClose = toggle?.querySelector('.chatbox-icon-close');
  let isOpen = false;

  if (toggle) {
    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      chatWindow.classList.toggle('active', isOpen);

      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden', isOpen);
        iconClose.classList.toggle('hidden', !isOpen);
      }

      // Hide pulse rings when open
      const pulseRings = toggle.querySelectorAll('.pulse-ring');
      pulseRings.forEach(ring => {
        ring.style.display = isOpen ? 'none' : 'block';
      });
    });
  }

  // ========== Send Message ==========
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');

  function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = isUser ? 'flex gap-3 justify-end' : 'flex gap-3';

    if (isUser) {
      msgDiv.innerHTML = `
        <div class="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-sm text-white" style="background: linear-gradient(135deg, #D4AF37, #A67C00);">
          ${text}
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #F4E5A1, #D4AF37);">
          <i data-lucide="bot" class="w-4 h-4 text-gray-900"></i>
        </div>
        <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm border border-gray-100">
          <p class="text-sm text-gray-700">${text}</p>
        </div>
      `;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (window.lucide) lucide.createIcons();
  }

  function getBotReply(userMsg) {
    const msg = userMsg.toLowerCase();
    if (msg.includes('thể loại') || msg.includes('tìm sách')) {
      return 'Chúng tôi có các thể loại: <strong>Văn học, Kỹ năng sống, Kinh doanh, Thiếu nhi, Ngoại văn, Sách quý hiếm</strong>. Bạn quan tâm thể loại nào ạ? 📚';
    }
    if (msg.includes('đơn hàng') || msg.includes('kiểm tra')) {
      return 'Vui lòng cung cấp mã đơn hàng của bạn (VD: GP-2024-XXXXX), tôi sẽ kiểm tra trạng thái ngay ạ! 📦';
    }
    if (msg.includes('quà') || msg.includes('tặng')) {
      return 'Một vài gợi ý quà tặng sách tuyệt vời: <br>🎁 <strong>Nhà Giả Kim</strong> — cho người yêu văn học<br>🎁 <strong>Atomic Habits</strong> — cho người muốn phát triển bản thân<br>🎁 <strong>Bộ sưu tập bìa da mạ vàng</strong> — quà sang trọng đẳng cấp!';
    }
    if (msg.includes('giá') || msg.includes('khuyến mãi') || msg.includes('sale')) {
      return 'Hiện tại chúng tôi đang có chương trình <strong>giảm giá đến 30%</strong> cho nhiều đầu sách hot! Hãy ghé trang Sách bán chạy để xem nhé! ✨';
    }
    return 'Cảm ơn bạn đã liên hệ! Tôi sẽ chuyển câu hỏi đến nhân viên tư vấn. Trong lúc chờ đợi, bạn có thể khám phá <strong>Bộ sưu tập nổi bật</strong> của chúng tôi nhé! 😊';
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    chatInput.value = '';

    // Simulate bot typing
    setTimeout(() => {
      addMessage(getBotReply(text));
    }, 800);
  }

  if (chatSend) chatSend.addEventListener('click', sendMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // Quick reply handler
  window.sendQuickReply = function(text) {
    addMessage(text, true);
    setTimeout(() => addMessage(getBotReply(text)), 800);
  };
});
