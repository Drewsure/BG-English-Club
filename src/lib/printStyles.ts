export const printPageStyles = `
  @page { size: A4; margin: 12mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #ffffff; }
  body {
    font-family: Arial, sans-serif;
    color: #2f251e;
    line-height: 1.42;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .sheet { width: 100%; max-width: 186mm; margin: 0 auto; }
  h1 { color: #bd5c24; font-size: 26px; margin: 0 0 4px; line-height: 1.08; }
  h2 { color: #3d332b; font-size: 18px; margin: 0 0 8px; border-bottom: 1px solid #efc779; padding-bottom: 5px; }
  h3 { color: #3d332b; font-size: 15px; margin: 0 0 4px; }
  p { margin: 0 0 8px; }
  ul, ol { margin: 8px 0 0 18px; padding: 0; }
  li { margin: 4px 0; }
  .card {
    border: 1px solid #efc779;
    border-radius: 12px;
    padding: 12px;
    margin: 10px 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .selected {
    border: 2px solid #d87522;
    background: #fff3d7;
    box-shadow: inset 0 0 0 1px #ffffff;
  }
  li.selected {
    border-radius: 8px;
    padding: 4px 6px;
  }
  .label { color: #d87522; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .highlight-strip {
    border: 2px solid #d87522;
    border-radius: 14px;
    background: #fff3d7;
    padding: 12px;
    margin: 12px 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .small { color: #6b5e52; font-size: 12px; }
  .print-note { color: #7b6a59; font-size: 10px; margin-top: 10px; }
  @media print {
    body { padding: 0; }
    .sheet { max-width: none; }
  }
`;
