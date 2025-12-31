export function alertIfNotificationsDisabled() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const iosMessage = `Notifications on iPhone Safari are not available.
They are available in Safari on macOS.`;

  const unsupportedMessage = `This browser does not support notifications.`;

  const blockedMessage = `Notifications are blocked.
Please enable them in your browser settings to receive reminder popups.`;

  if (!("Notification" in window)) {
    if (isIOS) {
      alert(iosMessage);
    } else {
      alert(unsupportedMessage);
    }
    return;
  }

  const permission = Notification.permission;

  if (permission === "default") {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        console.log("Notifications enabled!");
      } else if (perm === "denied") {
        alert(blockedMessage);
      }
    });
  } else if (permission === "denied") {
    alert(blockedMessage);
  }
}