//這個腳本會注入到 Google 搜尋頁面中，並根據搜尋內容（例如搜尋「火影忍者」）顯示自定義按鈕。

// 檢查當前頁面是否為 Google 搜尋頁面
if (window.location.hostname === "www.google.com") {
    // 取得搜尋框的內容
    const searchQuery = new URLSearchParams(window.location.search).get('q');
    
    // 如果搜尋內容包含「火影忍者」或其他關鍵字
    if (searchQuery && (searchQuery.includes("火影忍者") || searchQuery.includes("NARUTO"))) {
      // 創建一個新的按鈕
      const button = document.createElement('button');
      button.innerText = "點擊觸發火影忍者動畫";
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
  
      // 按鈕點擊事件
      button.addEventListener('click', function() {
        alert('開始火影忍者動畫！');
        startNarutoAnimation();
      });
    }
  }


  // 創建火影忍者動畫
function startNarutoAnimation() {
    const naruto = document.createElement('img');
    naruto.src = chrome.runtime.getURL('icons/sharingan.png');  // 鳴人的圖片
    naruto.style.position = 'absolute';
    naruto.style.top = '200px';
    naruto.style.left = '50%';
    naruto.style.transform = 'translateX(-50%)';

    //  圖片顯示大小
    naruto.style.width = '50px';
    naruto.style.height = '50px';


    //  設定動畫
    naruto.style.animation = 'naruto-run 2s infinite linear';
  
    document.body.appendChild(naruto);
  }
  
  // 火影忍者動畫的CSS
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes naruto-run {
      0% { transform: translateX(0) rotate(0deg); }
      50% { transform: translateX(100px) rotate(10deg); }
      100% { transform: translateX(0) rotate(0deg); }
    }
  `;
  document.head.appendChild(style);