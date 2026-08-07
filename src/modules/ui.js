import { BASE_IMG_URL, IMG_SIZE } from "./config";
import placeholder from "../assets/placeholder.png";
import {
  addItemToStorage,
  isItemInStorage,
  removeItemFromStorage,
  addNoteToItem,
  getData,
} from "./storage";

const handleFavorite = (event, item) => {
  const button = event.target;
  let isFavorite = false;
  if (isItemInStorage(item.id)) {
    removeItemFromStorage(item.id);
    isFavorite = false;
  } else {
    addItemToStorage(item);
    isFavorite = true;
  }
  const favoriteEvent = new CustomEvent("favoriteChanged", {
    bubbles: true,
    detail: { isFavorite },
  });
  button.dispatchEvent(favoriteEvent);
};

const showNotes = (event, container) => {
  event.preventDefault();
  if (container.classList.contains("hidden")) {
    container.classList.remove("hidden");
  } else {
    container.classList.add("hidden");
  }
};

const saveNotes = (event, item, text) => {
  event.preventDefault();
  if (!isItemInStorage(item.id)) {
    addItemToStorage(item);
    addNoteToItem(item.id, text);
    const favoriteEvent = new CustomEvent("favoriteChanged", {
      bubbles: true,
      detail: { isFavorite: true },
    });
    event.target.dispatchEvent(favoriteEvent);
  } else {
    addNoteToItem(item.id, text);
  }
};

const createCard = (item, target) => {
  const card = document.createElement("div");
  const data = getData();
  card.className =
    "moviecard film-card flex mx-2 my-3 rounded shadow-md shadow-white";

  const btnContainer = document.createElement("div");
  btnContainer.className = "flex self-end";

  const btnN = document.createElement("button");
  btnN.className = "w-8 h-8 flex items-center justify-center text-sm";
  btnN.textContent = "📄";

  const btnStar = document.createElement("button");
  btnStar.className = "w-8 h-8 flex items-center justify-center text-sm";
  btnStar.textContent = "★";

  const isInStorage = isItemInStorage(item.id);
  btnStar.classList.toggle("favorited", isInStorage);

  btnStar.addEventListener("click", (event) => {
    handleFavorite(event, item);
  });

  btnContainer.appendChild(btnN);
  btnContainer.appendChild(btnStar);

  const imgContainer = document.createElement("div");
  imgContainer.className = "w-32";

  const img = document.createElement("img");
  img.src = item.poster_path
    ? BASE_IMG_URL + IMG_SIZE + item.poster_path
    : placeholder;

  imgContainer.appendChild(img);

  const content = document.createElement("div");
  content.id = "content";
  content.className = "flex-1 flex flex-col";

  const titel = document.createElement("div");
  titel.className = "px-2 text-md mx-1 my-1 text-lg font-sans font-bold";
  titel.textContent = item.title;

  const tagsContainer = document.createElement("div");
  tagsContainer.className =
    "flex items-center gap-2 mt-1 px-3 text-xs text-white/50 font-medium";

  const yearSpan = document.createElement("span");
  yearSpan.textContent = item.release_date.slice(0, 4);

  tagsContainer.appendChild(yearSpan);

  const beschreibung = document.createElement("div");
  beschreibung.className = "px-2 text-sm mx-1 my-2 font-sans font-extralight";
  beschreibung.textContent = item.overview;

  const form = document.createElement("form");
  form.className = "hidden";

  const notesContainer = document.createElement("div");
  notesContainer.className = "px-2 m-2 border border-yellow-400/50 rounded";

  const notesHeader = document.createElement("div");
  notesHeader.className = "flex justify-between py-2 my-2 items-center";

  const notesLabel = document.createElement("Label");
  notesLabel.textContent = "Notes";
  notesLabel.className = "block text-md font-bold ml-2";

  const notesBtn = document.createElement("button");
  notesBtn.className =
    "w-18 h-8 flex items-center justify-center text-sm border border-yellow-400/50 rounded cursor-pointer hover:bg-yellow-400/5 hover:scale-102 mr-1 p-1";
  notesBtn.textContent = "Save";

  const notesText = document.createElement("textarea");
  notesText.rows = "3";
  notesText.className =
    "border border-yellow-400/40 text-sm w-full rounded p-1";
  notesText.textContent = item.note ? item.note : "";
  const index = data.findIndex((element) => element.id === item.id);
  if (index !== -1) {
    notesText.textContent = data[index].note;
  }

  content.appendChild(btnContainer);

  content.appendChild(form);
  form.appendChild(notesContainer);
  notesContainer.appendChild(notesHeader);
  notesHeader.appendChild(notesLabel);
  notesHeader.appendChild(notesBtn);
  notesContainer.appendChild(notesText);
  content.appendChild(titel);
  content.appendChild(tagsContainer);
  content.appendChild(beschreibung);

  card.appendChild(imgContainer);
  card.appendChild(content);

  target.appendChild(card);

  btnN.addEventListener("click", (event) => {
    showNotes(event, form);
  });
  notesBtn.addEventListener("click", (event) => {
    saveNotes(event, item, notesText.value);
  });

  card.addEventListener("favoriteChanged", (event) => {
    const isFavorite = event.detail.isFavorite;
    btnStar.classList.toggle("favorited", isFavorite);
  });
};

export { createCard };
