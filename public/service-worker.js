/* Café Etrusca — service worker de avisos de promociones.
   Solo maneja el clic de la notificación; no dispara avisos por su cuenta. */
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var url =
    (event.notification &&
      event.notification.data &&
      event.notification.data.url) ||
    "https://promos-insumos.cafeetrusca.com/";
  event.waitUntil(self.clients.openWindow(url));
});
