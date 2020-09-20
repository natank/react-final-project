import { fromPairs } from 'lodash';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { MoviesManagementContext } from '../../Context/movies-management-context'

export default function MoviesNav(props) {
  var { moviesManagementUrl } = useContext(MoviesManagementContext)
  return (
    <div>
      <Link to={`${moviesManagementUrl}`}>
        <input type="button" value="All Movies" />
      </Link>
      <Link to={`${moviesManagementUrl}/add`}>
        <input type="button" value="Add Movies" />
      </Link>
    </div>
  )
}
