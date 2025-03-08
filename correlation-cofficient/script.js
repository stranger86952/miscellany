document.addEventListener('DOMContentLoaded', () => {
    populateCorrelationSelector();
    document.getElementById('generate-button').addEventListener('click', generateScatterPlot);
  });
  
  function populateCorrelationSelector() {
    const selector = document.getElementById('correlation-selector');
    const options = ['random'];

    for (let i = -1.0; i <= 1.0; i += 0.1) {
      options.push(i.toFixed(1));
    }

    options.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value === 'random' ? 'ランダム' : value;
      selector.appendChild(option);
    });
  }
  
  function generateScatterPlot() {
    const pointCount = parseInt(document.getElementById('point-count').value, 10);
    const correlationOption = document.getElementById('correlation-selector').value;
  
    const correlation = correlationOption === 'random'
      ? Math.random() * 2 - 1
      : parseFloat(correlationOption);
  
    document.getElementById('correlation-coefficient').textContent = correlation.toFixed(2);
  
    const points = generateCorrelatedPoints(pointCount, correlation);
    drawScatterPlot(points);
  }
  
  function generateCorrelatedPoints(count, correlation) {
    const points = [];
    const randomNormal = () => Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
  
    for (let i = 0; i < count; i++) {
      const x = randomNormal();
      const y = correlation * x + Math.sqrt(1 - correlation ** 2) * randomNormal();
      points.push({ x, y });
    }
    return points;
  }
  
  function drawScatterPlot(points) {
    const canvas = document.getElementById('scatter-plot');
    const ctx = canvas.getContext('2d');
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
  
    const margin = 20;
    const width = canvas.width - margin * 2;
    const height = canvas.height - margin * 2;
  
    const xValues = points.map(p => p.x);
    const yValues = points.map(p => p.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
  
    points.forEach(point => {
      const x = margin + ((point.x - xMin) / (xMax - xMin)) * width;
      const y = margin + height - ((point.y - yMin) / (yMax - yMin)) * height;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  