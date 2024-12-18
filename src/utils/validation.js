export const validatePersonalInfo = (formData) => {
  const newErrors = {};

  // Проверка на наличие цифр в имени и фамилии
  if (!formData.firstName || /\d/.test(formData.firstName)) {
    newErrors.firstName = "Имя должно содержать только буквы";
  }
  if (!formData.lastName || /\d/.test(formData.lastName)) {
    newErrors.lastName = "Фамилия должна содержать только буквы";
  }

  if (!formData.dob) {
    newErrors.dob = "Дата рождения обязательна";
  }

  // Проверка email
  if (
    formData.email && 
    !formData.email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    )
  ) {
    newErrors.email = "Неверный формат email";
  }

  // Проверка номера телефона
  if (formData.phone && !formData.phone.match(/^\+77\s?\d{3}\s?\d{3}\s?\d{4}$/)) {
    newErrors.phone = "Номер телефона должен быть в формате +77XXXXXXXXX";
  }
  

  return newErrors;
};

export const validateAddressInfo = (formData) => {
  const newErrors = {};
  
  if (!formData.country) newErrors.country = "Страна обязательна";
  if (!formData.city) newErrors.city = "Город обязателен";
  if (!formData.street) newErrors.street = "Улица обязательна";
  
  // Проверка почтового индекса
  if (formData.postalCode && !formData.postalCode.match(/^\d{5,10}$/)) {
    newErrors.postalCode = "Неверный почтовый индекс";
  }

  return newErrors;
};

export const validateFinancialInfo = (formData) => {
  const newErrors = {};
  
  if (formData.monthlyIncome <= 0) {
    newErrors.monthlyIncome = "Ежемесячный доход должен быть больше 0";
  }

  if (
    formData.loanAmount <= 0 ||
    formData.loanAmount < 20000 ||
    formData.loanAmount > 1000000
  ) {
    newErrors.loanAmount = "Сумма кредита должна быть от 20,000 до 1,000,000";
  }

  if (formData.loanTerm <= 0) {
    newErrors.loanTerm = "Срок кредита должен быть больше 0";
  }

  return newErrors;
};
