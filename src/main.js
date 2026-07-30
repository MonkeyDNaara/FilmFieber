
const app = document.getElementById('app');
if (app) {
  import('./modules/home.js').then((m) => m.default(app));
}
