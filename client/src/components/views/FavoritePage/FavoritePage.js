import React, { useEffect, useState } from "react"
import "./FavoritePage.css"
import { Popover } from "antd"
import Axios from "axios"
import { API_IMG_BASE_URL } from "../../Config"
function FavoritePage() {
  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavoredMovie()
  }, [])

  const fetchFavoredMovie = () => {
    Axios.post("/admin/favorit/getFavoritedMovies", { userFrom: "admin" }).then((response) => {
      if (response.data.code !== 0) {
        alert(response.data.msg)
      } else {
        console.log(response.data.result)
        setFavorites(response.data.result)
      }
    })
  }

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.movImg ? <img src={`${API_IMG_BASE_URL}w500${favorite.movImg}`} /> : "no image"}
      </div>
    )

    const onClickDelete = (movId, userFrom) => {
      const variable = {
        movId,
        userFrom,
      }

      Axios.post("admin/favorit/removeFavorit", variable).then((response) => {
        if (response.data && response.data.result) {
          fetchFavoredMovie()
        } else {
          alert(response.data.msg)
        }
      })
    }

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movTitle}`}>
          <td>{favorite.movTitle}</td>
        </Popover>
        <td>{favorite.movRuntime}</td>
        <td>
          <button onClick={() => onClickDelete(favorite.movId, favorite.userFrom)}>Remove</button>
        </td>
      </tr>
    )
  })

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Movie from Favorites</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  )
}

export default FavoritePage
