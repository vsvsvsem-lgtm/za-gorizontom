/* Кэшируется только оболочка приложения; камеры и видео всегда берутся из сети. */
var V='zg-v11',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){var c=res.clone();caches.open(V).then(function(ch){ch.put(r,c)});return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html')})}));
});
