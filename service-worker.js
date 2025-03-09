const CACHE_NAME = "cabinet-of-selves-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/daily-checkin.html",
    "/checkin-history.html",
    "/journal.html",
    "/journal-prompts.html",
    "/journal-history.html",
   "/journal.html",
     "/resources.html",
    "/parts.html",
    "/part-details.html",
    "/styles.css",
    "/app.js",
    "/manifest.json",
    "/service-worker.js",
    "/images/background.mp4",
    "/images/nature.mp4",
    "/images/girl.jpg"
];

// Install Service Worker and Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Service Worker and Remove Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Files from Cache When Offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
