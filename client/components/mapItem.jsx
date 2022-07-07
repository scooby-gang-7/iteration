import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

function mapItem(props) {
  return (
    <div>
      <Marker position={props.position}/> 
    </div>
  )
}

export default mapItem
