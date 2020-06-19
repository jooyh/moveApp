import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Button } from "antd"

function Favorit(props) {
  const [FavoritCnt, setFavoritCnt] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  const variable = {
    userFrom: "admin",
    movId: props.movieId,
    movTitle: props.movie.title,
    movImg: props.movie.backdrop_path,
    movRuntime: props.movie.runtime,
  }

  useEffect(() => {
    Axios.post("/admin/favorit/favoritNumber", variable).then((response) => {
      if (response.data.code !== 0) {
        alert(response.data.msg)
      } else {
        setFavoritCnt(response.data.result)
      }
    })
    Axios.post("/admin/favorit/isFavorited", variable).then((response) => {
      if (response.data.code !== 0) {
        alert(response.data.msg)
      } else {
        setFavorited(response.data.result)
      }
    })
  }, [])

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/admin/favorit/removeFavorit", variable).then((response) => {
        if (response.data.code !== 0) {
          alert(response.data.msg)
        } else {
          setFavoritCnt(FavoritCnt - 1)
          setFavorited(!Favorited)
          console.log("removeFavorit", response.data.result)
        }
      })
    } else {
      Axios.post("/admin/favorit/addFavorit", variable).then((response) => {
        if (response.data.code !== 0) {
          alert(response.data.msg)
        } else {
          setFavoritCnt(FavoritCnt + 1)
          setFavorited(!Favorited)
          console.log("addFavorit", response.data.result)
        }
      })
    }
  }

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? "Not Favorite" : "Add to Favorite"} ({FavoritCnt})
      </Button>
    </div>
  )
}

export default Favorit
