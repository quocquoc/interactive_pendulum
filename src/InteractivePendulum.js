import React, { useState, useEffect } from 'react';

const InteractivePendulum = () => {
  const [length, setLength] = useState(100);
  const [gravity, setGravity] = useState(9.81);
  const [angle, setAngle] = useState(Math.PI / 4);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const period = 2 * Math.PI * Math.sqrt(length / 100 / gravity);
    const newAngle = (Math.PI / 6) * Math.sin(2 * Math.PI * time / period);
    setAngle(newAngle);
  }, [time, length, gravity]);

  const bobX = 200 + length * Math.sin(angle);
  const bobY = 50 + length * Math.cos(angle);

  // Tính toán chu kỳ dao động
  const period = 2 * Math.PI * Math.sqrt(length / 100 / gravity);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Con lắc đơn tương tác</h2>
      <svg width="400" height="400" style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto' }}>
        <line x1="200" y1="50" x2={bobX} y2={bobY} stroke="black" strokeWidth="2" />
        <circle cx={bobX} cy={bobY} r="10" fill="red" />
      </svg>
      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Chiều dài (cm): 
          <input 
            type="range" 
            min="10" 
            max="300" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          {length}
        </label>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Gia tốc trọng trường (m/s²): 
          <input 
            type="range" 
            min="1" 
            max="20" 
            step="0.1" 
            value={gravity} 
            onChange={(e) => setGravity(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          {gravity.toFixed(2)}
        </label>
      </div>
      <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
        <h3>Công thức chu kỳ dao động:</h3>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>T = 2π * √(L/g)</p>
        <p>Trong đó:</p>
        <ul>
          <li>T: Chu kỳ dao động (giây)</li>
          <li>L: Chiều dài con lắc (m)</li>
          <li>g: Gia tốc trọng trường (m/s²)</li>
        </ul>
        <p>Chu kỳ dao động hiện tại: {period.toFixed(2)} giây</p>
      </div>
    </div>
  );
};

export default InteractivePendulum;
