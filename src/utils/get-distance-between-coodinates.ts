export interface Coordinate {
  latitude: number
  longitudade: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitudade === to.longitudade) {
    return 0
  }

  const fromRadion = (Math.PI * from.latitude) / 180
  const toRadion = (Math.PI * to.latitude) / 180

  const theta = from.longitudade - to.longitudade
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadion) * Math.sin(toRadion) +
    Math.cos(fromRadion) * Math.cos(toRadion) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}
