
self.addEventListener('install', (e) => {
  console.log('app installed')
  // e.waitUntil(async () => {
  caches.open('assets').then(cach => {
    const assests = ['/assets/css/commonStyle.css', '/assets/css/style.css', '/assets/css/todoStyle.css',]
    return cach.addAll(assests)
  })
  caches.open('imgs').then(cach => {
    const images = ['/assets/img/side26 logo.png']
    return cach.addAll(images)
  })
  // });
  // e.waitUntil(async () => {
  caches.open('pages').then(res => {
    const firstRoutes = ['/', '/index.html', '/offline.html']
    return res.addAll(firstRoutes)
  })

})
// })
self.addEventListener('active', () => {
  console.log('app active')
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // It can update the cache to serve updated content on the next request
        return cachedResponse || fetch(event.request).then(fetchedData => {
          caches.open('cached_data').then(cach => {
            cach.put(event.request, fetchedData.clone())
            return fetchedData
          })
        }).catch(err => {
          return caches.open('pages').then(cach => {
            return cach.match('/offline.html')
          })
        })
      }
      )
  )
});
const selfBind=self
self.addEventListener('push', pushEvt => {
  let data = pushEvt.data.json()||''
  selfBind.registration.showNotification(`hello ${data.title}`)
})
// BNbqX8M5NJJfs_IcL_5Gfisx7FkOYHtYniD4QMJq1RB4DeQsOmGo3lO-zzurFEqTUwtrqQHKb62p_TzxPU552yI