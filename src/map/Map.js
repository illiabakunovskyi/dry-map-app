import { useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    width: window.innerWidth,
    height: window.innerHeight
  })
  // const [data, setData] = useState(null)
  // const [isLoding, setIsLoaging] = useState(false)
  // const [isError, setIsError] = useState(false)

  // useEffect(() => {
  //   setIsLoaging(true)
  //   fetch('api')
  //     .then(res => {
  //       if (res.status === 200) {
  //         setData(res.body.data)
  //       }
  //     })
  //     .catch(error => {
  //       setIsError(true)
  //     })

  //     return () => clearInterval()
  // }, [])

  return (
    <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiYXZlbHVkb3dpayIsImEiOiJja3ZvODAxdXYwcnZsMnBqcGFsdGFvYnpsIn0.GXnlJJJPUArw7jszNQJ0eQ'
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle='mapbox://styles/mapbox/light-v9'
      />
  )
}
export default Map