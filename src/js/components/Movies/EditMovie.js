import React from 'react'


import MovieForm from './MovieForm';

var movieDetails = {
    id: 4,
    Name: "Under the dome",
    Generes: ["Genere1", "Genere2"],
    Image: "https://via.placeholder.com/600/771796",
    Premiered: new Date(Date.UTC(72, 4, 5))
}

export default function EditMovie() {
    return (
        <div>
            <h2>Edit Movie: {`${movieDetails.firstName} ${movieDetails.lastName}`}</h2>
            <MovieForm movieDetails={movieDetails} actionText="Update" onSubmit={onUpdateMovie} />

        </div>
    )

    function onUpdateMovie(event) {
        event.preventDefault();
        return 0;
    }
}



