import React from 'react';

const AuthLoader = ({className}) => {
  return (
    <div className={`${className} border-4 border-t-blue-500 border-gray-400 rounded-full animate-spin`} />
  );
}

export default AuthLoader;
