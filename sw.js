const staticCacheName = 'site-static-v5.6';
const assets = [
    "index.html",
    "img/icons/icon-72x72.png",
    "img/ohno.png",
    "css/style.css",
    "CgpaToPercentage.html",
    "fallback.html",
    "discount-calc.html",
    "money-to-words.html"
];


// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});


// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key)) // deleting old caches
            );
        })
    );
});


// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        }).catch(() => caches.match('/fallback.html'))
    );
});