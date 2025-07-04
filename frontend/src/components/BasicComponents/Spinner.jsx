import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
    </div>
  );
};

export default Spinner;
