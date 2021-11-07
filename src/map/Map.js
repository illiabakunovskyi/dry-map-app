import { useEffect, useState } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import mapGrid from './consts/map-grid.json'

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

  useEffect(() => {
    // setIsLoaging(true)
    const date = new Date()
    const today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    console.log(mapGrid.features)
    const points = mapGrid.features.map(item => (
      {
        ...item,
        properties: {
          center: [
            item.geometry.coordinates[0][0][0] + ((item.geometry.coordinates[0][2][0] - item.geometry.coordinates[0][0][0]) / 2),
            item.geometry.coordinates[0][0][1] + ((item.geometry.coordinates[0][2][1] - item.geometry.coordinates[0][0][1]) / 2)
          ],
        }
      }
    ))

    for (let i = 0; i < 3; i++) {
      fetch(`http://localhost:8000/weatherByLongLatAndDate?lat=${points[i].properties.center[0]}&lon=${points[i].properties.center[1]}&date=${today}`)
        .then(res => {
          if (res.status === 200) {
            console.log(res.json())
          }
        })
        .catch(error => {
          console.error(error)
          // setIsError(true)
        })
    }

    // return () => clearInterval()
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoiYXZlbHVkb3dpayIsImEiOiJja3ZvODAxdXYwcnZsMnBqcGFsdGFvYnpsIn0.GXnlJJJPUArw7jszNQJ0eQ'
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle='mapbox://styles/mapbox/light-v9'
    >
      {/* <Source type='geojson' data={data}>
        <Layer {...dataLayer} />
      </Source> */}
    </ReactMapGL>
  )
}
export default Map