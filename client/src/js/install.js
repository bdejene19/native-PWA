const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // store events triggered for install
  window.deferredPrompt = event;

  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const installPrompt = window.deferredPrompt;

  if (!installPrompt) {
    console.log("could not install pwa app");
    return;
  }
  installPrompt.prompt();

  //   clear deferredPrompt to allow for later use (can only store 1 thing at a time)
  window.deferredPrompt = null;

  //   hide install button when installing
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // clear prompts
  window.deferredPrompt = null;
});
