import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { dataRecord } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import Filters from '../../components/Filters';
import Loading from '../../components/Loading';

const BASE_URL = 'https://sds1-jessica.herokuapp.com';

function Records() {
  const [data, setData] = useState<dataRecord>();
  const [activePage, setActivePage] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
    .then((response) => setData(response.data))
    setIsLoading(false)
  }, [activePage])

  if (isLoading) return (
    <div>
      <Loading />
    </div>
  )
  else {
  return (
    <div className="page-container">
      <Filters link="/charts" linkText="VER GRÁFICO" />
      <table className="records-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>INSTANTE</th>
            <th>NOME</th>
            <th>IDADE</th>
            <th>PLATAFORMA</th>
            <th>GÊNERO</th>
            <th>TÍTULO DO GAME</th>
          </tr>
        </thead>
        <tbody>
          {data?.content.map((record, index) => (
            <tr key={index}>
              <td>{formatDate(record.moment)}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td className="text-secondary">{record.gamePlatform}</td>
              <td>{record.genreName}</td>
              <td className="text-primary">{record.gameTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        activePage={activePage}
        totalPages={data?.totalPages}
        goToPage={(index: number) => setActivePage(index)}
      />
    </div>
  )}
}

export default Records;
