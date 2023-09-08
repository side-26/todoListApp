

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

const setNotifactionPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      showNotife('یک متن ساده');
    }

    function showNotife(message) {
      navigator.serviceWorker.ready.then((registration) => {
        // registration.showNotification(message, {
        //   body: "فقط برای تست بود",
        // });
        registration.pushManager.subscribe({
          applicationServerKey: 'BNbqX8M5NJJfs_IcL_5Gfisx7FkOYHtYniD4QMJq1RB4DeQsOmGo3lO-zzurFEqTUwtrqQHKb62p_TzxPU552yI',
          userVisibleOnly: true
        }).then(sub => {
          fetchSubscribe(sub)
        })
      });
    }
    const fetchSubscribe=(sub)=>{
      fetch("https://pushnotif.azhadev.ir/api/push-subscribe", {
            method: "post",
            body: JSON.stringify(sub),
          }).then(res => {
            return res.json()
          }).then(response => {
            console.log(response);
            alert("این کد رو ذخیره کنید : " + response.user_code)
          })
    }
  });
}