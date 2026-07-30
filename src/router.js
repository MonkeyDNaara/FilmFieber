
const routes = new Map();

const router = {
  routes,
  register(path, handler) {
    return routes.set(path, handler);
  },
  navigate(url) {
    const path = url ? (url.split('#')[1] || '/').replace(/^\//, '') : '';
    const fn = routes.get(path);
    if (fn) {
      const app = document.getElementById('app');
      if (app) fn(app);
    }
    routes.get('') && routes.get('')(document.getElementById('app'));
  },
};

window.addEventListener('hashchange', () => router.navigate(location.hash || '/'));
router.navigate(location.hash || '/');
export default router;
