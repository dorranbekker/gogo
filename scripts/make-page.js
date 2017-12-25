const { toUpper, toLower } = require('ramda')
const fs = require('fs')

const upperFirst = word => {
  return toUpper(word[0]) + word.slice(1)
}

const argvs     = JSON.parse(process.env.npm_config_argv).remain
const pageName  = argvs[0]
const nameSplit = pageName.split('-')
const name      = nameSplit.map(upperFirst).join('')
const route     = pageName.split('-').map(toUpper).join('_')
const routePath = pageName.split('-').map(toLower).join('/')

const pageFolderPath     = `./src/pages/${pageName}`
const indexFilePath      = `./src/pages/${pageName}/index.js`
const indexTestFilePath  = `./src/pages/${pageName}/index.test.js`
const componentFilePath  = `./src/pages/${pageName}/${pageName}.js`
const pagesIndexFile     = `./src/pages/index.js`
const routeFile          = `./src/pages/routes.js`

const indexFile = 
`import React, { Component } from 'react'
import ${name}Component from './${pageName}'  
  
export const ${name} = () => 
  class Wrapper extends Component {      
    render = () => (
      <${name}Component {...this.props} />
    )
  }

export default ${name}()`

const indexTestFile = 
`import React from 'react'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { ${name} } from './index'

describe('${pageName}/index.test.js', () => {

  it('renders ok', () => {
    const TestComponent = ${name}({})
    const wrapper = shallow(<TestComponent />)
    assert.equal(wrapper.length, 1)
  })

})`

const componentFile = 
`import React from 'react'

const ${name}Component = () => (
  <div>
    ${name}Component
  </div>
)

export default ${name}Component`

const insertImport = () => {
  const pagesIndexContent   = fs.readFileSync(pagesIndexFile, 'utf8').split('\n')
  const routesContent       = fs.readFileSync(routeFile, 'utf8').split('\n')
  const importIndex         = pagesIndexContent.indexOf('// [new pages import]')
  const routeIndex          = pagesIndexContent.indexOf('    {/* [new pages route] */}')
  const routeFileIndex      = routesContent.indexOf('  // new routes')
  pagesIndexContent.splice(importIndex, 0, `import ${name} from './${pageName}'`)
  pagesIndexContent.splice(routeIndex + 1, 0, `    <Route exact path={ROUTES.${route}} component={${name}} />`)
  routesContent.splice(routeFileIndex, 0, `  ${route}: '/${routePath}',`)
  fs.writeFileSync(pagesIndexFile, pagesIndexContent.join('\n'))
  fs.writeFileSync(routeFile, routesContent.join('\n'))
}

if (!fs.existsSync(pageFolderPath)) {
  fs.mkdirSync(pageFolderPath)
  fs.writeFileSync(indexFilePath, indexFile)
  fs.writeFileSync(indexTestFilePath, indexTestFile)
  fs.writeFileSync(componentFilePath, componentFile)
  insertImport()
} else {
  console.log(pageFolderPath,'already exists')
  process.exit(1)
}
