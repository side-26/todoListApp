async function checkRegistration() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register("/sw.js");
    if (registration) {
      console.log("Service worker was registered on page load");
    } else {
      console.log("No service worker is currently registered");
    }
  } else {
    console.log("Service workers API not available");
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  checkRegistration();
});
