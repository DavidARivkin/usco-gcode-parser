
export function parseSteps (data) {
  data = ensureBinary(data)
  const isBinary = isDataBinary(data)

  let result = null
  if (isBinary) {
    result = parseBinary(data)
  } else {
    result = parseASCII(ensureString(data))
  }
  return result
}

export function parseBinary (data) {
  var reader = new DataView(data)
  var faces = reader.getUint32(80, true)
  var dataOffset = 84
  var faceLength = 12 * 4 + 2
  var offset = 0

  var positions = new Float32Array( faces * 3 * 3 )
  var normals = new Float32Array( faces * 3 * 3 )

  for (var face = 0; face < faces; face++) {
    var start = dataOffset + face * faceLength

    for (var i = 1; i <= 3; i++) {
      var vertexstart = start + i * 12

      positions[ offset     ] = reader.getFloat32( vertexstart, true )
      positions[ offset + 1 ] = reader.getFloat32( vertexstart + 4, true )
      positions[ offset + 2 ] = reader.getFloat32( vertexstart + 8, true )

      normals[offset] = reader.getFloat32(start, true)
      normals[offset + 1] = reader.getFloat32(start + 4, true)
      normals[offset + 2] = reader.getFloat32(start + 8, true)
      offset += 3
    }
  }
  return {positions, normals}
}
