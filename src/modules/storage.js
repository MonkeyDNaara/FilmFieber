
const store = {
  state: { films: [], favorites: new Set() },
  init(films) { this.state.films = films; this.restoreFavorites(); },
  restoreFavorites() {
    try { const ids = JSON.parse(localStorage.getItem('favorites') || '[]'); this.state.favorites = new Set(ids); } catch { this.state.favorites = new Set(); }
  },
  saveFavorites() { localStorage.setItem('favorites', JSON.stringify([...this.state.favorites])); },
  toggleFavorite(id) { if (this.state.favorites.has(id)) this.state.favorites.delete(id); else this.state.favorites.add(id); this.saveFavorites(); return this.favorite(id); },
  favorite(id) { return this.state.favorites.has(id); },
  get filmList() { return this.state.films; },
};

export default store;
export { store };
