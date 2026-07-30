import { BASE_IMG_URL, IMG_SIZE } from "./config";
import {
  addItemToStorage,
  isItemInStorage,
  removeItemFromStorage,
} from "./storage";

const createCard = (item, target) => {
  const card = document.createElement("div");
  card.className = "w-100 border flex";

  const btnContainer = document.createElement("div");
  btnContainer.className = "flex self-end";

  const btnN = document.createElement("button");
  btnN.className = "w-8 h-8 border flex items-center justify-center text-sm";
  btnN.textContent = "N";

  const btnStar = document.createElement("button");
  btnStar.className = "w-8 h-8 border flex items-center justify-center text-sm";
  btnStar.textContent = "★";

  const handleFavorite = (event) => {
    if (isItemInStorage(item.id)) {
      removeItemFromStorage(item.id);
      btnStar.classList.remove("bg-red-500");
      btnStar.classList.add("bg-green-500");
    } else {
      addItemToStorage(item);
      btnStar.classList.remove("bg-green-500");
      btnStar.classList.add("bg-red-500");
    }
  };

  if (isItemInStorage(item.id)) {
    btnStar.classList.add("bg-red-500");
  } else {
    btnStar.classList.add("bg-green-500");
  }

  btnStar.addEventListener("click", handleFavorite);

  btnContainer.appendChild(btnN);
  btnContainer.appendChild(btnStar);

  const imgContainer = document.createElement("div");
  imgContainer.className = "w-32 border";

  const img = document.createElement("img");
  img.src = BASE_IMG_URL + IMG_SIZE + item.poster_path;

  imgContainer.appendChild(img);

  const content = document.createElement("div");
  content.className = "flex-1 flex flex-col";

  const titel = document.createElement("div");
  titel.className = "border px-2 text-md font-bold";
  titel.textContent = item.title;

  const beschreibung = document.createElement("div");
  beschreibung.className = "border px-2 text-sm";
  beschreibung.textContent = item.overview;

  content.appendChild(btnContainer);
  content.appendChild(titel);
  content.appendChild(beschreibung);

  card.appendChild(imgContainer);
  card.appendChild(content);

  target.appendChild(card);
};

export { createCard };
