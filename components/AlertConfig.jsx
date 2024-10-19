import React from 'react';

const AlertConfig = ({ config, setConfig }) => {
  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: parseFloat(e.target.value) });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Alert Configuration</h2>
      <label className="block">
        Temperature Threshold (°C):
        <input
          type="number"
          name="temperature"
          value={config.temperature}
          onChange={handleChange}
          className="ml-2 p-1 border rounded"
        />
      </label>
    </div>
  );
};

export default AlertConfig;
