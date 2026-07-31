import { BASE_IMG_URL, IMG_SIZE } from "./config";
import {
  addItemToStorage,
  isItemInStorage,
  removeItemFromStorage,
} from "./storage";

const handleFavorite = (event, item) => {
  const button = event.target;
  if (isItemInStorage(item.id)) {
    removeItemFromStorage(item.id);
    button.classList.remove("bg-red-500");
    button.classList.add("bg-green-500");
  } else {
    addItemToStorage(item);
    button.classList.remove("bg-green-500");
    button.classList.add("bg-red-500");
  }
};

const showNotes = (event, container) => {
  event.preventDefault();
  if (container.classList.contains("hidden")) {
    container.classList.remove("hidden");
  } else {
    container.classList.add("hidden");
  }
};

const createCard = (item, target) => {
  const card = document.createElement("div");
  card.className = "w-100 border flex";

  const btnContainer = document.createElement("div");
  btnContainer.className = "flex self-end";

  const btnN = document.createElement("button");
  btnN.className = "w-8 h-8 border flex items-center justify-center text-sm";
  btnN.textContent = "📄";

  const btnStar = document.createElement("button");
  btnStar.className = "w-8 h-8 border flex items-center justify-center text-sm";
  btnStar.textContent = "★";

  const isInStorage = isItemInStorage(item.id);
  btnStar.classList.toggle("bg-red-500", isInStorage);
  btnStar.classList.toggle("bg-green-500", !isInStorage);

  btnStar.addEventListener("click", (event) => {
    handleFavorite(event, item);
  });

  btnContainer.appendChild(btnN);
  btnContainer.appendChild(btnStar);

  const imgContainer = document.createElement("div");
  imgContainer.className = "w-32 border";

  const img = document.createElement("img");
  img.src = BASE_IMG_URL + IMG_SIZE + item.poster_path;

  imgContainer.appendChild(img);

  const content = document.createElement("div");
  content.id = "content";
  content.className = "flex-1 flex flex-col";

  const titel = document.createElement("div");
  titel.className = "border px-2 text-md font-bold";
  titel.textContent = item.title;

  const beschreibung = document.createElement("div");
  beschreibung.className = "border px-2 text-sm";
  beschreibung.textContent = item.overview;

  const form = document.createElement("form");
  form.className = "hidden";

  const notesContainer = document.createElement("div");
  notesContainer.className = "px-2 m-2";

  const notesHeader = document.createElement("div");
  notesHeader.className = "flex justify-between py-2 my-2";

  const notesLabel = document.createElement("Label");
  notesLabel.textContent = "Notes";
  notesLabel.className = "block text-md font-bold";

  const notesBtn = document.createElement("button");
  notesBtn.className =
    "w-20 h-8 border flex items-center justify-center text-sm";
  notesBtn.textContent = "Save";

  const notesText = document.createElement("textarea");
  notesText.rows = "3";
  notesText.className = "border text-sm w-full";

  content.appendChild(btnContainer);
  content.appendChild(titel);
  content.appendChild(beschreibung);

  card.appendChild(imgContainer);
  card.appendChild(content);

  content.appendChild(form);
  form.appendChild(notesContainer);
  notesContainer.appendChild(notesHeader);
  notesHeader.appendChild(notesLabel);
  notesHeader.appendChild(notesBtn);
  notesContainer.appendChild(notesText);

  target.appendChild(card);

  btnN.addEventListener("click", (event) => {
    showNotes(event, form);
  });
};

export { createCard };
