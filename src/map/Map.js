import React from 'react';
import { useEffect, useState } from 'react'
import MapGL, { Source, Layer } from 'react-map-gl'
import mapGrid from './consts/map-grid.json'
import { dataLayer } from './utils/data-layer'

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [data, setData] = useState(null)

  useEffect(() => {
    const date = new Date()
    const today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    let tempData = []
    let points = mapGrid.features.map(item => (
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

    for (let i = 0; i < 50; i++) {
      fetch(`http://localhost:8000/weatherByLongLatAndDate/?lat=${points[i].properties.center[1]}&lon=${points[i].properties.center[0]}&date=${today}`)
        .then(res => res.json().then(resData => {
          tempData = [...tempData, { ...points[i], properties: { ...points[i].properties, ...resData, percentile: Math.floor(Math.random() * 10) } }]
          setData({ type: 'FeatureCollection', features: tempData })
        }))
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  console.log(data)

  return (
    <MapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoiYXZlbHVkb3dpayIsImEiOiJja3ZvODAxdXYwcnZsMnBqcGFsdGFvYnpsIn0.GXnlJJJPUArw7jszNQJ0eQ'
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle='mapbox://styles/mapbox/light-v9'
    >
      <Source id='test' type='geojson' data={data}>
        <Layer {...dataLayer} type='fill' />
      </Source>
    </MapGL>
  )
}
export default Map