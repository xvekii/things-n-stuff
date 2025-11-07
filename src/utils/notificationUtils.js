export function alertIfNotificationsDisabled() {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications");
    return;
  }
  const perm = Notification.permission;
  if (perm !== "granted") {
    setTimeout(() => {
      alert("Turn on notifications in your browser site settings to receive reminder popups.");
    }, 1000);
  }
}