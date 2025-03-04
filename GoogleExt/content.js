// 確保按鈕只創建一次，但動畫可重複觸發
if (!window.hasNarutoScriptLoaded) {
  window.hasNarutoScriptLoaded = true; 
  createNarutoButtons();
}

// 創建按鈕
function createNarutoButtons() {
  if (!document.getElementById("naruto-button")) {
      const button = document.createElement('button');
      button.innerText = "Trigger";
      button.id = "naruto-button";
      button.style.position = 'absolute';
      button.style.top = '150px';
      button.style.left = '50%';
      button.style.transform = 'translateX(-50%)';
      button.style.padding = '10px';
      button.style.fontSize = '16px';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = 'orange';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.zIndex = '9999';

      document.body.appendChild(button);
      button.addEventListener('click', function() {
          startNarutoAnimation();
      });
  }

  // 停止動畫按鈕
  if (!document.getElementById("stop-button")) {
      const stopBtn = document.createElement('button');
      stopBtn.id = "stop-button";
      stopBtn.style.position = 'absolute';
      stopBtn.style.top = '200px';
      stopBtn.style.left = '60%';
      stopBtn.style.transform = 'translateX(-50%)';
      stopBtn.style.width = '60px';
      stopBtn.style.height = '60px';
      stopBtn.style.border = 'none';
      stopBtn.style.borderRadius = '50%';
      stopBtn.style.cursor = 'pointer';
      stopBtn.style.zIndex = '9999';
      stopBtn.style.backgroundColor = 'orange';

      const iconUrl = chrome.runtime.getURL('icons/stop-button.png');
      stopBtn.style.backgroundImage = `url("${iconUrl}")`;
      stopBtn.style.backgroundSize = '50%';
      stopBtn.style.backgroundRepeat = 'no-repeat';
      stopBtn.style.backgroundPosition = 'center';

      document.body.appendChild(stopBtn);

      // 移除所有動畫
      stopBtn.addEventListener("click", function() {
          document.querySelectorAll(".naruto-animation").forEach(img => img.remove());
      });
  }
}

// 創建火影忍者動畫
function startNarutoAnimation() {
  const naruto = document.createElement('img');
  naruto.className = "naruto-animation";  // 改用 class，允許多個動畫
  naruto.src = chrome.runtime.getURL('icons/sharingan.png');
  naruto.style.position = 'absolute';
  naruto.style.top = '200px';
  naruto.style.left = '50%';
  naruto.style.transform = 'translateX(-50%)';
  naruto.style.width = '50px';
  naruto.style.height = '50px';
  naruto.style.animation = 'naruto-run 2s infinite linear';

  document.body.appendChild(naruto);
}

// 確保 <style> 只被插入一次
if (!document.getElementById("naruto-style")) {
  const style = document.createElement('style');
  style.id = "naruto-style";  
  style.innerHTML = `
      @keyframes naruto-run {
          0% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(100px) rotate(10deg); }
          100% { transform: translateX(0) rotate(0deg); }
      }
  `;
  document.head.appendChild(style);
}