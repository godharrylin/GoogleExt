
//這個文件會監控 Chrome 中的標籤頁，並確保在用戶訪問 Google 搜尋頁面時加載 content.js。
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("google.com/search")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        })
        // .catch(err => console.error("Script execution error:", err));
    }
});
