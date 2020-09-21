import React from 'react';
import load from '../assets/loading.jpg';

function Loading() {
  return (
    <div>
      <img src={load} alt="Imagem carregando" />
    </div>
  )
}

export default Loading;
