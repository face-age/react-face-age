import React from 'react'
import ReactDOM from 'react-dom'
import ReactFaceAge from './react-faceage.jsx'

const props = {
    options: {
        faceageId: 'WVmzp6E6QJKxDINW5tU5',
        type: 'skincare-analyzer',
    }
}

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ReactFaceAge {...props}/>, div)
    ReactDOM.unmountComponentAtNode(div);
})
