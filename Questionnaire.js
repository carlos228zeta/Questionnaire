import React, { useState } from 'react';
import './Questionnaire.css';

// Array berisi 100 pertanyaan
const questionsArray = Array.from({ length: 100 }, (_, index) => `Pertanyaan ${index + 1}`);

// Opsi pilihan ganda
const options = [
  { label: 'Skor 1', score: 1 },
  { label: 'Skor 2', score: 2 },
  { label: 'Skor 3', score: 3 },
  { label: 'Skor 4', score: 4 },
  { label: 'Skor 5', score: 5 }
];

const Questionnaire = ({ onLogin }) => { // Tambahkan onLogin sebagai prop
  const [answers, setAnswers] = useState(Array(100).fill(null));
  const [showAlert, setShowAlert] = useState(false); // State untuk menampilkan notifikasi


  // Fungsi untuk menangani perubahan radio button
  const handleChange = (index, score) => {
    const newAnswers = [...answers];
    newAnswers[index] = score;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Jawaban:', answers);
    alert('Terima kasih atas jawabannya!');
  };

  // Fungsi untuk menangani klik tombol keluar
  const handleExit = () => {

      // Panggil onLogin dengan false untuk mengubah status login
      onLogin(false);

    // Menghapus token dari localStorage
localStorage.removeItem('userId');
    
      // Logika untuk keluar jika semua pertanyaan sudah dijawab
      alert('Anda telah keluar dari kuesioner.');
    }

  return (
    <div className="questionnaire-container">
      {showAlert && <div className="alert">Masih ada pertanyaan yang belum terjawab</div>}
      <form className="questionnaire-form" onSubmit={handleSubmit}>
        <h2>Formulir Kuesioner</h2>
        <div className="table-container">
          {questionsArray.map((question, index) => (
            <div key={index} className="question-row">
              <div className="question-text">
                <label>{question}</label>
              </div>
              <div className="question-options">
                {options.map((option) => (
                  <label key={option.score} className="option-label">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.score}
                      checked={answers[index] === option.score}
                      onChange={() => handleChange(index, option.score)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button type="submit">Kirim</button>
        <button type="button" onClick={handleExit}>Keluar</button>
      </form>
    </div>
  );
};

export default Questionnaire;
