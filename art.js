function openArt(url) {
    const appWindow = document.getElementById("app-window");
    const appFrame = document.getElementById("app-frame");
    
    appFrame.src = url;
    appWindow.style.top = "50%";
}

function closeArt() {
    const appWindow = document.getElementById("app-window");
    
    appWindow.style.top = "100%";
    setTimeout(() => {
        document.getElementById("app-frame").src = "";
    }, 500);
}
