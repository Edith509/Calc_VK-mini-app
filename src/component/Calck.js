import React, { useState, useEffect } from 'react';
import style from '../style/style.css';

function AgeCalculator() {
    const [date, setDate] = useState('');
    const [result, setResult] = useState('');
    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        setMaxDate(new Date().toISOString().split("T")[0]);
    }, []);

    const calculateAge = () => {
        if (!date) {
            setResult('Пожалуйста, выберите дату');
            return;
        }

        const birthDate = new Date(date);
        const today = new Date();
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        let hours = today.getHours() - birthDate.getHours();
        let minutes = today.getMinutes() - birthDate.getMinutes();
        let seconds = today.getSeconds() - birthDate.getSeconds();

        // дни
        if (days < 0) {
            months -= 1;
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += previousMonth;
        }

        // месяцы
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // часы
        if (hours < 0) {
            days -= 1;
            hours += 24;
        }

        // минуты
        if (minutes < 0) {
            hours -= 1;
            minutes += 60;
        }

        // секунды
        if (seconds < 0) {
            minutes -= 1;
            seconds += 60;
        }

        const yearEnding = getEnding(years, ['год', 'года', 'лет']);
        const monthEnding = getEnding(months, ['месяц', 'месяца', 'месяцев']);
        const dayEnding = getEnding(days, ['день', 'дня', 'дней']);
        const hourEnding = getEnding(hours, ['час', 'часа', 'часов']);
        const minuteEnding = getEnding(minutes, ['минута', 'минуты', 'минут']);
        const secondEnding = getEnding(seconds, ['секунда', 'секунды', 'секунд']);

        setResult(`Тебе <span>${years}</span> ${yearEnding}, <span>${months}</span> ${monthEnding}, <span>${days}</span> ${dayEnding}, <span>${hours}</span> ${hourEnding}, <span>${minutes}</span> ${minuteEnding} и <span>${seconds}</span> ${secondEnding}.`);
    };

    const getEnding = (number, endings) => {
        const cases = [2, 0, 1, 1, 1, 2];
        return endings[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
    };

    const shareAge = () => {
        const ageText = document.getElementById('result').innerText;
        navigator.clipboard.writeText(ageText).then(() => {
            alert('Возраст скопирован в буфер обмена');
        });
    };

    return (
        <div className="container">
            <div className="calculator">
                <h1>Калькулятор Возраста</h1>
                <div className="input-box">
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        max={maxDate}
                        className="input"
                    />
                    <button onClick={calculateAge} className="button">Узнать</button>
                </div>
                <p id="result" dangerouslySetInnerHTML={{ __html: result }}></p>
                <div className="settings">
                    <button onClick={toggleTheme} className="button">Темная тема</button>
                    <button onClick={shareAge} className="button">Поделиться</button>
                </div>
            </div>
        </div>
    );
}

export default AgeCalculator;
