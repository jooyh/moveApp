import React, { useEffect, useState } from "react"
import { API_URL, API_KEY, API_IMG_BASE_URL } from "../../Config"
import MainImage from "../LandingPage/Section/MainImage"
import MovieInfo from "./Section/MovieInfo"
import { Row } from "antd"
import GridCards from "../commons/GridCards"
import Favorit from "./Section/Favorit"

function MoiveDetail(props) {
  let movieId = props.match.params.movieId

  const [Movie, setMovie] = useState([])
  const [Casts, setCasts] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)

  useEffect(() => {
    let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
    let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

    fetch(endPointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response)
      })

    fetch(endPointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast)
      })
  }, [])

  const toggleActorView = () => {
    setActorToggle(!ActorToggle)
  }

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${API_IMG_BASE_URL}w1280/${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorit movieId={movieId} movie={Movie} />
        </div>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <button onClick={toggleActorView}> Toggle Actor View</button>
        </div>
        {/* Acters Grid */}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={cast.profile_path ? `${API_IMG_BASE_URL}w500${cast.profile_path}` : null}
                    charactorName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  )
}

export default MoiveDetail
