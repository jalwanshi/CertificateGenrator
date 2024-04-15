import React, { useState, useEffect, useRef } from 'react';
import './Style.css';
import template1 from './CertificateTemplate/template1.png';
import template2 from './CertificateTemplate/template2.png';
import template3 from './CertificateTemplate/template3.png';
import template4 from './CertificateTemplate/template4.png';
import template5 from './CertificateTemplate/template5.png'
const CertSelection = () => {
  const [fontFamilies, setFontFamilies] = useState([]);
  const [fontColor, setFontColor] = useState('#000000'); // Default font color
  const [fontStyle, setFontStyle] = useState('normal'); // Default font style
  const [fontSize, setFontSize] = useState(84); // Default font size
  const [selectedTemplate, setSelectedTemplate] = useState('template1'); // Default template
  const [inputValue, setInputValue] = useState('');
  const [height, setHeight] = useState(120); // Default height
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [fontFamily, setFontFamily] = useState('sans-serif'); // Default font family

  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDID_ZLQnPpqBPm-WZP46uUXvLGHfqbbYw');
        const data = await response.json();
        const fonts = data.items.map(font => font.family);
        setFontFamilies(fonts);
      } catch (error) {
        console.error('Error fetching fonts:', error);
      }
    };

    fetchFonts();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const templateImage = new Image();
    templateImage.src = getTemplateSource(selectedTemplate);
    templateImage.onload = () => {
      canvasRef.current.width = templateImage.width;
      canvasRef.current.height = templateImage.height;
      ctx.drawImage(templateImage, 0, 0);
      ctx.fillStyle = fontColor;
      ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const textX = canvasRef.current.width / 2;
      const textY = canvasRef.current.height / 2 + height / 2; // Adjust text position based on height
      ctx.fillText(inputValue, textX, textY);
      setCertificatePreview(canvasRef.current.toDataURL());
    };
  }, [selectedTemplate, fontColor, fontStyle, fontSize, inputValue, height, fontFamily]);

  const getTemplateSource = (template) => {
    switch (template) {
      case 'template1':
        return template1;
      case 'template2':
        return template2;
      case 'template3':
        return template3;
      case 'template4':
        return template4;
        case 'template5':
          return template5;
      default:
        return template1;
    }
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const handleFontStyleChange = (event) => {
    setFontStyle(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleHeightChange = (event) => {
    setHeight(parseInt(event.target.value));
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDownloadCertificate = () => {
    if (certificatePreview) {
      const link = document.createElement('a');
      link.download = 'Certificate.png';
      link.href = certificatePreview;
      link.click();
    } else {
      alert("Certificate preview is not available yet. Please wait for it to generate.");
    }
  };

  return (
    <div>
      <header className="navbar">
        <h1>Certificate Selection</h1>
        <nav>
          <ul>
            <li>
              <label htmlFor="template">Select Template:</label>
              <select id="template" value={selectedTemplate} onChange={handleTemplateChange}>
                <option value="template1">Template 1</option>
                <option value="template2">Template 2</option>
                <option value="template3">Template 3</option>
                <option value="template4">Template 4</option>
                <option value="template5">Template 5</option>
              </select>
            </li>
            <li>
              <label htmlFor="input-field">Input Field:</label>
              <input type="text" id="input-field" value={inputValue} onChange={handleInputChange} />
            </li>
            <li>
              <label htmlFor="font-family">Font Family:</label>
              <select id="font-family" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                {fontFamilies.map((font, index) => (
                  <option key={index} value={font}>{font}</option>
                ))}
              </select>
            </li>
            <li>
              <label htmlFor="color">Color:</label>
              <input type="color" id="color" value={fontColor} onChange={handleFontColorChange} />
            </li>
            <li>
              <label htmlFor="font-style">Font Style:</label>
              <select id="font-style" value={fontStyle} onChange={handleFontStyleChange}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="bold">Bold</option>
              </select>
            </li>
            <li>
              <label htmlFor="font-size">Font Size:</label>
              <input type="number" id="font-size" value={fontSize} onChange={handleFontSizeChange} />
            </li>
            <li>
              <label htmlFor="height">Height:</label>
              <input type="range" id="height" min="-100" max="500" value={height} onChange={handleHeightChange} />
            </li>
          </ul>
        </nav>
      </header>
      <div className="certificate-preview">
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        {certificatePreview && <img src={certificatePreview} alt="Certificate Preview" />}
      </div>
      <button className="button" onClick={handleDownloadCertificate}>Download Certificate</button>

    </div>
  );
};

export default CertSelection;
