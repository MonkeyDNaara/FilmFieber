const STORAGE_KEY = "journal";

const getData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const addItemToStorage = (item) => {
  const data = getData();
  data.push(item);
  saveData(data);
};

const removeItemFromStorage = (id) => {
  const data = getData();
  const updatedData = data.filter((item) => item.id !== id);
  saveData(updatedData);
};

export { getData, saveData, addItemToStorage, removeItemFromStorage };
