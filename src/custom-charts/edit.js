import { useEffect, useRef } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker, SelectControl } from '@wordpress/components';
import Chart from 'chart.js/auto';

const Edit = ({ attributes, setAttributes }) => {
  const { values = '', barColors = [], chartType = 'bar' } = attributes;

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const parsedValues = values
    .split(',')
    .map(v => parseFloat(v.trim()))
    .filter(v => !isNaN(v));

  const syncedColors = [...barColors];
  while (syncedColors.length < parsedValues.length) {
    syncedColors.push('#36A2EB');
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    const labels = parsedValues.map((_, i) => `Value ${i + 1}`);

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [{
          label: 'Values',
          data: parsedValues,
          backgroundColor: syncedColors,
          borderColor: syncedColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: ['bar', 'line'].includes(chartType)
          ? { y: { beginAtZero: true } }
          : undefined
      }
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [values, chartType, syncedColors.join()]);

  const handleValuesChange = (val) => {
    const parsed = val.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    const newColors = [...barColors];

    while (newColors.length < parsed.length) newColors.push('#36A2EB');
    if (newColors.length > parsed.length) newColors.length = parsed.length;

    setAttributes({ values: val, barColors: newColors });
  };

  const handleColorChange = (index, newColor) => {
    const newColors = [...syncedColors];
    newColors[index] = newColor;
    setAttributes({ barColors: newColors });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Chart Settings">
          <TextControl
            label="Enter Values (comma-separated)"
            value={values}
            onChange={handleValuesChange}
          />
          <SelectControl
            label="Chart Type"
            value={chartType}
            options={[
              { label: 'Bar Chart', value: 'bar' },
              { label: 'Pie Chart', value: 'pie' },
              { label: 'Line Chart', value: 'line' }
            ]}
            onChange={(type) => setAttributes({ chartType: type })}
          />
          {parsedValues.map((_, i) => (
            <div key={i} style={{ marginBottom: '1em' }}>
              <p><strong>Color for Value {i + 1}</strong></p>
              <ColorPicker
                color={syncedColors[i] || '#36A2EB'}
                onChangeComplete={(value) => {
                  if (value && value.hex) handleColorChange(i, value.hex);
                }}
                disableAlpha
              />
            </div>
          ))}
        </PanelBody>
      </InspectorControls>
      <div style={{ height: '400px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
};

export default Edit;
