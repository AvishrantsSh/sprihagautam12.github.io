const CACHE = 'cache_port';
const filestoCache = [
                      '/assets/img/SG2.png',
                      '/assets/vendor/bootstrap/css/bootstrap.min.css',
                      '/assets/vendor/icofont/icofont.min.css',
                      '/assets/vendor/boxicons/css/boxicons.min.css',
                      '/assets/vendor/venobox/venobox.css',
                      '/assets/vendor/owl.carousel/assets/owl.carousel.min.css',
                      '/assets/vendor/jquery/jquery.min.js',
                      '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
                      '/assets/vendor/jquery.easing/jquery.easing.min.js',
                      '/assets/vendor/waypoints/jquery.waypoints.min.js',
                      '/assets/vendor/counterup/counterup.min.js',
                      '/assets/vendor/isotope-layout/isotope.pkgd.min.js',
                      '/assets/vendor/venobox/venobox.min.js',
                      '/assets/vendor/owl.carousel/owl.carousel.min.js',
                      '/assets/vendor/typed.js/typed.min.js',
                      '/assets/vendor/aos/aos.js'

                      ]

self.addEventListener('install', function(event) {
  console.log('The service worker is being installed.');
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      
      return cache.addAll(filestoCache);
    })
  );
});


self.addEventListener('activate', (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(key !== CACHE) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {

     event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)

      }).catch(function(err) {
        // Fallback to cache
        console.log("Oh Snap :" + err);
    })
    );
});

