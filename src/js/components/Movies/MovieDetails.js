import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MoviesManagementContext } from '../../Context/movies-management-context';
import { MainContext } from '../../Context/main-context';

export default function MovieDetails({ movie, match }) {
  const { moviesManagementUrl } = useContext(MoviesManagementContext)
  return (
    <div>
      <h3>{`${movie.Name}, ${movie.Premiered.getFullYear()} `}</h3>
      <p>{`Generes: ${movie.Generes.map(genere => genere)}`}</p>
      <div style={{ display: "flex" }}>
        <picture><img src={`${movie.Image}`} width={50} /></picture>
        <div>
          <p>Subscriptions watched</p>
        </div>
      </div>
      <Link to={`${match.url}/edit/${movie.id}`}>
        <input type="button" value="Edit" onClick={() => { }} />
      </Link>
      <input type="button" value="Delete" onClick={() => { }} />
    </div >
  )
}