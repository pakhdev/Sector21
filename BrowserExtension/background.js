import { interact } from './scripts/interaction.scripts.js'

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'interaction') {
        interact(message.payload).then(response => { sendResponse(response); });
        return true;
    }
});
