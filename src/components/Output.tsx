import React from 'react';

type OutputProps = {
  outputData: { [key: string]: string } | null;
};

const Output: React.FC<OutputProps> = ({ outputData }) => {
  if (!outputData) {
    return null;
  }

  const outputKey = Object.keys(outputData)[0];
  const outputValue = outputData[outputKey];

  if (outputKey === 'Generated Image') {
    return (
      <div className="output-section">
        <img src={outputValue} alt="Generated output" className="rounded-lg max-w-full" />
      </div>
    );
  }

  return (
    <div className="output-section">
      <p className="text-gray-700">{outputValue}</p>
    </div>
  );
};

export default Output;
