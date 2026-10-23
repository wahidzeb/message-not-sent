/* Message Not Sent is offline for now. This worker replaces the old cached one:
   it deletes the game's caches, unregisters itself and reloads open tabs so they get the live "taking a break" page. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) { return Promise.all(ks.filter(function (k) { return k.indexOf("message-not-sent-") === 0; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: "window" }); })
      .then(function (cs) { cs.forEach(function (c) { try { c.navigate(c.url); } catch (_) {} }); })
      .catch(function () {})
  );
});
