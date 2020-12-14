
const STATIC_CACHE = 'static-v1';
const INMUTABLE_CACHE = 'inmutable-v1';



const APP_SHELL = [
    'index.html',
    'assets/css/bootstrap/bootstrap.css',
    'assets/fonts/ionicons/css/ionicons.css',
    'assets/fonts/law-icons/font/flaticon.css',
    'assets/css/slick.css',
    'assets/css/helpers.css',
    'assets/css/style.css',
    'assets/css/redes-sociales.css',
    'assets/js/jquery.min.js',
    'assets/js/popper.min.js',
    'assets/js/bootstrap.min.js',
    'assets/js/slick.min.js',
    'assets/js/jquery.waypoints.min.js',
    'assets/js/jquery.easing.1.3.js',
    'assets/js/main.js',
    'assets/js/app.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,600|Montserrat:200,300,400',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'
];


self.addEventListener('install', e => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL)
    });

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE)
    });

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== INMUTABLE_CACHE && key.includes('inmutable')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});
