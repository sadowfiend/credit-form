export const sendDataToAPI = async (formData) => {
  console.log('Отправка данных:', formData);

  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log('Ответ от мок API:', data);

      if (response.ok) {
          console.log('Данные успешно отправлены');
          return true;
      } else {
          console.error('Ошибка при отправке данных:', data);
          return false;
      }
  } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      return false;
  }
};
