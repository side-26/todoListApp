const installPrompt = document.getElementById('install_prompt')
let deferredPrompt;
const installApp = () => {
    installPrompt.classList.remove('hidden')
    // alert('hello')
}
const deleteInstallPrompt = () => {
    installPrompt.classList.add('hidden')
}
window.addEventListener('appinstalled', () => {
    // If visible, hide the install promotion
    installPrompt.classList.add('hidden')
    // Log install to analytics
    console.log('INSTALL: Success');
});
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevents the default mini-infobar or install dialog from appearing on mobile
    e.preventDefault();
    // Save the event because you'll need to trigger it later.
    deferredPrompt = e;
    // Show your customized install prompt for your PWA
    // Your own UI doesn't have to be a single element, you
    // can have buttons in different locations, or wait to prompt
    // as part of a critical journey.
    installApp();
});