export const loadFromLocalStorage = (key) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Ошибка при загрузке данных из localStorage", error);
    return null;
  }
};

// Функция для сохранения данных в localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Ошибка при сохранении данных в localStorage", error);
  }
};
