import { useLocation } from "react-router-dom";
import "../styles/Success.css"; // Импортируем файл стилей для страницы Success

const Success = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return <p>Данные не найдены.</p>;
  }

  return (
    <div className="success-container">
      <h2 className="success-title">Заявка успешно отправлена!</h2>
      <p className="success-message">
        Спасибо за заполнение формы. Мы свяжемся с вами в ближайшее время.
      </p>

      <div className="form-data">
        <h3 className="form-data-title">Ваши данные:</h3>
        <ul className="form-data-list">
          {Object.entries(formData).map(([key, value]) => (
            <li key={key} className="form-data-item">
              <strong className="form-data-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </strong>{" "}
              <span className="form-data-value">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Success;
