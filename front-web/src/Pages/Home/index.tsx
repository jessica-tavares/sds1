import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import { ReactComponent as Gamer } from '../../assets/gamer.svg';
import './styles.css';

function Home() {
  return (
    <div>
      <div className="home-container">
        <div className="home-text">
          <h1 className="home-text-title">
            Quais jogos a galera gosta mais?
          </h1>
          <h3 className="home-text-subtitle">
            Clique no botão abaixo e saiba quais são os jogos que os gamers estão escolhendo!
          </h3>
          <Link to="/records">
            <div className="home-actions">
              <button className="home-btn">
                QUERO SABER QUAIS SÃO
              </button>
              <div className="home-btn-icon">
                <Arrow />
              </div>
            </div>
          </Link>
        </div>
        <div className="home-image">
          <Gamer />
        </div>
      </div>
    </div>
  )
}

export default Home;
