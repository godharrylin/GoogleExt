// 確保按鈕只創建一次，但動畫可重複觸發
if (!window.hasNarutoScriptLoaded) {
  window.hasNarutoScriptLoaded = true; 
  createButtons();
  
}

// 創建按鈕
function createButtons() {
  // 創建一個容器來包含按鈕
  if(!document.getElementById("buttonContainer")){
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.bottom = '5vh';  // 你可以調整這裡來改變容器的垂直位置
    buttonContainer.style.right = '20px';
    buttonContainer.style.transform = 'translateX(-50%)';
    
    
    buttonContainer.style.display = 'flex';  // 使用 Flexbox 排列按鈕
    buttonContainer.style.flexDirection = 'column';  // 垂直排列
    buttonContainer.style.justifyContent = 'flex-start';
    buttonContainer.style.alignItems = 'center';  // 將按鈕在容器內水平居中
    buttonContainer.style.gap = '15px';  // 設置按鈕之間的固定間距

    
    
    // size
    buttonContainer.style.width = '70px';
    buttonContainer.style.height = '220px';
    buttonContainer.style.padding = 0;
    // buttonContainer.style.backgroundColor = 'black';

    document.body.appendChild(buttonContainer);
  }




  //  Usagi走路按鈕
  if(!document.getElementById("usagi-button")){
    const walkBtn = document.createElement('button');
    walkBtn.id = 'usagi-button';
    walkBtn.style.cursor = 'pointer';
    //  size
    walkBtn.style.width = '60px';
    walkBtn.style.height = '60px';
    //  shape
    walkBtn.style.border = 'none';
    walkBtn.style.borderRadius = '50%';

    walkBtn.style.zIndex = '9999';
    walkBtn.style.backgroundColor = 'orange';

    let iconUrl = chrome.runtime.getURL('icons/start-button.png');
    walkBtn.style.backgroundImage = `url("${iconUrl}")`;
    walkBtn.style.backgroundSize = '50%';
    walkBtn.style.backgroundRepeat = 'no-repeat';
    walkBtn.style.backgroundPosition = 'center';

    buttonContainer.appendChild(walkBtn);

    walkBtn.addEventListener('click',
      function(){
        startUsagiWalk();
      }
    );
  } 
  
  // 開始動畫按鈕
  if (!document.getElementById("gif-button")) {
      const button = document.createElement('button');
      button.id = "gif-button";
      button.innerText = "Trigger";
      //  size
      button.style.width = '60px';
      button.style.height = '60px';
      //  shape 
      button.style.border = 'none';
      button.style.borderRadius = '50%';

      button.style.fontSize = '16px';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = 'orange';
      button.style.zIndex = '9999';
      button.style.textAlign = 'center';
      
      buttonContainer.appendChild(button);
      button.addEventListener('click', function() {
          startUsagiGIF();
      });
  }

  //  停止動畫按鈕
  if (!document.getElementById("stop-button")) {
      const stopBtn = document.createElement('button');
      stopBtn.id = "stop-button";
      stopBtn.style.cursor = 'pointer';
      //  shape & size
      stopBtn.style.width = '60px';
      stopBtn.style.height = '60px';
      stopBtn.style.border = 'none';
      stopBtn.style.borderRadius = '50%';

      stopBtn.style.zIndex = '9999';
      stopBtn.style.backgroundColor = 'orange';

      const iconUrl = chrome.runtime.getURL('icons/stop-button.png');
      stopBtn.style.backgroundImage = `url("${iconUrl}")`;
      stopBtn.style.backgroundSize = '50%';
      stopBtn.style.backgroundRepeat = 'no-repeat';
      stopBtn.style.backgroundPosition = 'center';

      buttonContainer.appendChild(stopBtn);

      // 移除所有動畫
      stopBtn.addEventListener("click", function() {
          document.querySelectorAll(".usagi-animation-w").forEach(img => { clearInterval(img.walkinterval); img.remove();});
      });
  }

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


//  創建Usagi走路動畫
function startUsagiWalk(){
  try{
    const usagi = document.createElement('img');
    usagi.className = 'usagi-animation-w';
    usagi.src = chrome.runtime.getURL('icons/usagi/shime34.png');
    usagi.width = 64;
    usagi.height = 64;
    usagi.style.border = "none";
    usagi.style.position = "fixed";
    usagi.style.top = "210px";
    usagi.style.left = "80%";     //從右邊開始
    usagi.style.transform = "translateX(0%)"; //讓他移動
    usagi.style.zIndex = '9999';  //確保物件在最上層
    usagi.style.animation = 'usagi-walk 6s infinite linear';
    
    //  定義走路圖片組，用來交替顯示
    let walkImages = [
      chrome.runtime.getURL('icons/usagi/shime34.png'),
      chrome.runtime.getURL('icons/usagi/shime35.png')
    ];

    let currentImageIndex = 0;

    //  設定計時器切換圖片
    let walkinterval = setInterval(()=>{
      usagi.src = walkImages[currentImageIndex];
      currentImageIndex = (currentImageIndex +1)% walkImages.length;  //循環切換圖片
    },50);

    // 把計時器 ID 變數儲存到 usagi 元素上
    usagi.walkinterval = walkinterval;

    //  動畫結束時移除元素
    usagi.addEventListener('animationend', () => {
      usagi.remove();
      clearInterval(walkinterval);  //  停止計時器
    });
    document.body.appendChild(usagi);
  }catch(error){
    console.log("Error in startUsagiWalk:", error);
  }

}

//  usagi walk 的css
if(!document.getElementById('usagi-style')){
  const w_style = document.createElement('style');
  w_style.id = 'usagi-style';
  w_style.innerHTML =`
    @keyframes usagi-walk {
      0% {
        left: 100%;
        right:0%;
      }
      
      100% {
        left: 0%;
        right: 100%;
      }
    }
    .usagi-animation-w{
      z-index:9999;
    }    
  `;

  document.head.appendChild(w_style);

}