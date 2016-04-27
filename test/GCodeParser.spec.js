import assert from 'assert'
import fs from 'fs'
import parse from '../src/index'

describe('GCode parser', function () {
  it('can parse gcode files', function (done) {
    this.timeout(5000)
    let data = fs.readFileSync('test/data/simple.gcode', 'binary')
    let obsResult = parse(data) // we get an observable back

    obsResult.forEach(function (parsed) {
      assert.equal(parsed[0].positions.length / 3, 7506) // we divide by three because each entry is 3 long (x,y,z)
      assert.equal(parsed[0].colors.length / 3, 10008)
      done()
    })
  })
})
