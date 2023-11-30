import Carousel from 'react-bootstrap/Carousel';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import LazyLoad from 'react-lazy-load';

// function CarouselFadeExample() {
//   const [movieData, setMovieData] = useState([]);

//   const fetchUpcomingAndRunningMovies = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/admin_panel/movielist/`);
//       if (response.status === 200) {
//         setMovieData(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching movie data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUpcomingAndRunningMovies();
//   }, []);

//   const baseUrl = `${import.meta.env.VITE_URL_SERVER}/media/`;

//   return (
//     <Carousel fade>
//       {movieData.map((movie) => (
//         <Carousel.Item key={movie.id}>
//           <LazyLoad height={200} offset={100}>
//             <img
//               className="d-block w-100"
//               src={baseUrl + movie.poster}
//               alt={movie.movie_name}
//             />
//           </LazyLoad>
//           <Carousel.Caption>
//             <h3>{movie.movie_name}</h3>
//             <p>{movie.description}</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }

// export default CarouselFadeExample;
