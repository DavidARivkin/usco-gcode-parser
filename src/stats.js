
var gcode
var firstReport
var z_heights = {}
var model = []
var gCodeOptions = {
  sortLayers: false,
  purgeEmptyLayers: true,
  analyzeModel: false
}
var max = {x: undefined, y: undefined, z: undefined}
var min = {x: undefined, y: undefined, z: undefined}
var modelSize = {x: undefined, y: undefined, z: undefined}
var filamentByLayer = {}
var filamentByExtruder = {}
var totalFilament = 0
var printTime = 0
var printTimeByLayer = {}
var layerHeight = 0
var layerCnt = 0
var speeds = {extrude: [], retract: [], move: []}
var speedsByLayer = {extrude: {}, retract: {}, move: {}}
var volSpeeds = []
var volSpeedsByLayer = {}
var extrusionSpeeds = []
var extrusionSpeedsByLayer = {}
