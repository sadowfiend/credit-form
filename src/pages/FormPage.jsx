import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../services/storage";
import {
    validatePersonalInfo,
    validateAddressInfo,
    validateFinancialInfo,
} from "../utils/validation";
import InputField from "../components/InputField";
import "../styles/FormPage.css";
import { sendDataToAPI } from "../services/api";

const FormPage = () => {
    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem("currentStep");
        return savedStep ? parseInt(savedStep, 10) : 1;
    });
    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem("formData");
        return savedFormData
            ? JSON.parse(savedFormData)
            : {
                  firstName: "",
                  lastName: "",
                  dob: "",
                  phone: "",
                  email: "",
                  country: "",
                  city: "",
                  street: "",
                  postalCode: "",
                  monthlyIncome: 0,
                  loanAmount: 20000,
                  loanTerm: 12,
              };
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // Добавляем состояние для отслеживания отправки
    const navigate = useNavigate();
    const countries = ["США", "Россия", "Германия", "Франция", "Италия"];

    useEffect(() => {
        console.log("Form data:", formData);
        console.log("Current step:", step);
    }, [formData, step]);

    useEffect(() => {
        if (formData) {
            localStorage.setItem("formData", JSON.stringify(formData));
        }
        if (step) {
            localStorage.setItem("currentStep", step.toString());
        }
    }, [formData, step]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Отправляем данные:", formData);
        const errors = {
            ...validatePersonalInfo(formData),
            ...validateAddressInfo(formData),
            ...validateFinancialInfo(formData),
        };

        if (Object.keys(errors).length === 0) {
            if (step === 3) {
                setIsSubmitting(true); // Начинаем отправку данных
                saveToLocalStorage("formData", formData);
                const result = await sendDataToAPI(formData);
                console.log("Результат отправки:", result); // Лог результат отправки
                if (result) {
                    setTimeout(() => {
                        navigate("/success", { state: { formData } });
                    }, 2000); // 2 секунды задержки
                }
            } else {
                setStep(step + 1);
            }
        } else {
            setErrors(errors);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    // Рассчитываем процент завершенности формы
    const progress = isSubmitting ? 100 : (step - 1) * (100 / 3); // Если отправляем, то прогресс 100%

    return (
        <div className="form-container">
            <h2>Шаг {step}</h2>

            {/* Прогресс-бар */}
            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <form>
                {step === 1 && (
                    <>
                        <InputField
                            label="Имя"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                })
                            }
                            error={errors.firstName}
                        />
                        <InputField
                            label="Фамилия"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                })
                            }
                            error={errors.lastName}
                        />
                        <InputField
                            label="Дата рождения"
                            type="date"
                            value={formData.dob}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dob: e.target.value,
                                })
                            }
                            error={errors.dob}
                        />
                        <InputField
                            label="Телефон"
                            mask="+77 999 999 9999"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                            error={errors.phone}
                        />
                        <InputField
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            error={errors.email}
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        <InputField
                            label="Страна"
                            type="select"
                            value={formData.country}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    country: e.target.value,
                                })
                            }
                            error={errors.country}
                            options={countries}
                        />
                        <InputField
                            label="Город"
                            type="text"
                            value={formData.city}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    city: e.target.value,
                                })
                            }
                            error={errors.city}
                        />
                        <InputField
                            label="Улица"
                            type="text"
                            value={formData.street}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    street: e.target.value,
                                })
                            }
                            error={errors.street}
                        />
                        <InputField
                            label="Почтовый индекс"
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    postalCode: e.target.value,
                                })
                            }
                            error={errors.postalCode}
                        />
                    </>
                )}
                {step === 3 && (
                    <>
                        <InputField
                            label="Ежемесячный доход"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    monthlyIncome: e.target.value,
                                })
                            }
                            error={errors.monthlyIncome}
                        />
                        <div>
                            <p>Cумма кредита: {formData.loanAmount} ₽</p>
                            <input
                                type="range"
                                label="Monthly"
                                value={formData.loanAmount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        loanAmount: Number(e.target.value),
                                    })
                                }
                                min={20000}
                                max={1000000}
                                step={1000}
                            />
                        </div>
                        <InputField
                            label="Срок кредита"
                            type="number"
                            value={formData.loanTerm}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    loanTerm: e.target.value,
                                })
                            }
                            error={errors.loanTerm}
                        />
                    </>
                )}
                <div className="form-buttons">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="prev-step-btn"
                        >
                            Назад
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="next-step-btn"
                    >
                        {step === 3 ? "Отправить" : "Далее"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormPage;
