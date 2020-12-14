// const CACHE_NAME = 'cache_1';

const CACHE_STATIC_NAME = 'static_v1';
const CACHE_DYNAMIC_NAME = 'dynamic_v1';
const CACHE_INMUTABLE_NAME = 'inmutable_v1';

const CACHE_DYNAMIC_LIMIT = 20;

function limpiarCache(cacheName, numeroItems) {

    caches.open(cacheName)
        .then(cache => {

            return cache.keys()
                .then(keys => {
                    if (keys.length > numeroItems) {

                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems))

                    }
                });

        });

}


self.addEventListener('install', e => {
    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/index.html',
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
            ]);
        });

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,600|Montserrat:200,300,400',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'
            ]);
        });



    e.waitUntil(Promise.all([
        cacheProm,
        cacheInmutable
    ]));



});
self.addEventListener('fetch', e => {

    // 5-Cache & Network Race

    const respuesta_5 = new Promise((resolve, reject) => {

        let rechazada = false;

        const falloUnaVez = () => {
            if (rechazada) {

                if (/\.(png|jpg)$/i.test(e.request.url)) {

                    resolve(caches.match('/img/no-img.jpg'));

                } else {
                    reject('No se encontro respuesta');
                }

            } else {
                rechazada = true;
            }
        };

        fetch(e.request).then(res => {
            if (res.ok) {
                resolve(res);
            } else {
                falloUnaVez();
            }
        }).catch(falloUnaVez)

        caches.match(e.request).then(res => {
            if (res) {
                resolve(res);
            } else {
                falloUnaVez();
            }
        }).catch(falloUnaVez)

    });

    e.respondWith(respuesta_5);

    // 4-Cache with Network update
    // Rendimiento es crítico
    // Siempre estarán un paso atrás

    // if (e.request.url.includes('bootstrap')) {

    //     return e.respondWith(caches.match(e.request));

    // }

    // const respuesta = caches.open(CACHE_STATIC_NAME).then(cache => {
    //     fetch(e.request).then(newRes => {
    //         cache.put(e.request, newRes)
    //     });

    //     return cache.match(e.request);

    // });

    // e.respondWith(respuesta);


    // 3-Network with cache fallback

    // const respuestaNetwork = fetch(e.request).then(res => {

    //     if (!res) return caches.match(e.request);

    //     // console.log('Fetch', res);

    //     caches.open(CACHE_DYNAMIC_NAME)
    //         .then(cache => {
    //             cache.put(e.request, res);
    //             limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    //         })

    //     return res.clone();

    // }).catch(err => {
    //     return caches.match(e.request);
    // });


    // e.respondWith(respuestaNetwork);


    // 2 - Cache with Network Fallback
    // const respuesta = caches.match(e.request)
    //     .then(res => {
    //         if (res) return res;
    //         // No esxiste el archivo
    //         // tengo que ir a la web
    //         console.log('No existe', e.request.url);
    //         return fetch(e.request).then(newResp => {

    //             caches.open(CACHE_DYNAMIC_NAME)
    //                 .then(cache => {
    //                     cache.put(e.request, newResp);
    //                     limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    //                 });

    //             return newResp.clone();
    //         });
    //     });
    // e.respondWith(respuesta);
    // 1-Cache Only
    // e.respondWith(caches.match(e.request));
    // 1-Cache Only
    // e.respondWith(caches.match(e.request));
});