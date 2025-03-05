// 確保按鈕只創建一次，但動畫可重複觸發
if (!window.hasNarutoScriptLoaded) {
  window.hasNarutoScriptLoaded = true; 
  createButtons();
  
}

// 創建按鈕
function createButtons() {
  //  開始動畫按鈕
  if (!document.getElementById("naruto-button")) {
      const button = document.createElement('button');
      button.innerText = "Trigger";

      button.style.display = 'flex';
      button.style.alignItems = 'center';  // 垂直居中
      button.style.justifyContent = 'center';  // 水平居中

      button.id = "naruto-button";
      button.style.position = 'absolute';
      button.style.top = '150px';
      button.style.left = '50%';
      button.style.width = '60px';
      button.style.height = '60px';
      button.style.transform = 'translateX(-50%)';
      button.style.padding = '10px';
      button.style.fontSize = '16px';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = 'orange';
      button.style.border = 'none';
      button.style.borderRadius = '50%';
      button.style.zIndex = '9999';

      document.body.appendChild(button);
      button.addEventListener('click', function() {
          startNarutoAnimation();
          startUsagiGIF();
      });
  }

  // 停止動畫按鈕
  if (!document.getElementById("stop-button")) {
      const stopBtn = document.createElement('button');
      stopBtn.id = "stop-button";
      stopBtn.style.position = 'absolute';
      stopBtn.style.top = '150px';
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


//  創建 Usagi GIF  (嵌入)
function startUsagiGIF(){
  if(!document.getElementById('usagiGIF')){
    const usagi = document.createElement('img');
    usagi.id = "usagiGIF";
    usagi.src = "https://media.tenor.com/8hHHxvAr1LIAAAAj/chiikawa-usagi.gif";
    usagi.width = 128;
    usagi.height = 128;
    usagi.style.border = "none";
    usagi.style.position = "absolute";
    usagi.style.top = "200px";
    usagi.style.left = "70%";
    usagi.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(usagi);
  }
}