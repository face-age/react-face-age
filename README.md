<br />

<p align="center"><img src="https://getfaceage.com/wp-content/themes/faceage/assets/images/logo.svg" width="232px"></p>


<p align="center">React.js wrapper for <a href="https://www.npmjs.com/package/face-age">Face Age</a> to build interactive visualizations in react.</p>

<p align="center"><a href="https://getfaceage.com/"><img
      src="https://facegpt.app/static/hero_light.png"></a></p>
<br />


## Download and Installation

##### Installing

```bash
npm install face-age react-face-age
```

<p>or</p>

```bash
yarn add face-age react-face-age
```


## Usage

```js
import ReactFaceAge from "react-face-age";
```

To create a basic analysis with minimal configuration, write the following:

```javascript
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        faceageId: '<Face Age Client Id>',
        type: 'skincare-analyzer'
      }
    }
    
  }
  
  onload (re) {
      console.log(re);
  }
  
  render() {
    return (
      <ReactFaceAge
        options={this.state.options}
        onLoad={this.onload}
      />
    )
  }
}
```


## Options

If you want to change the global default options, you can use object `options`.


### type

- Type: `String`
- Default: `'skincare'`
- Options:
    - `'skincare'`: create a new crop box
    - `'skincare-analyze'`: move the canvas

Define the analysis display mode. If you set the type to skincare, only the possibility of receiving the image will be displayed, while the skincare-analyze value is entered, the image will be received and the received data will also be displayed.


### access

- Type: `Array`
- Default: `['dark_circle', 'eye_bag', 'eye_wrinkles', 'deep_wrinkles', 'wrinkles', 'acnes', 'pores', 'pigment']`

You can set it to display more limited analysis information.

### showCamera

- Type: `Boolean`
- Default: `true`

You can set it to use the camera to load the image.

### showUpload

- Type: `Boolean`
- Default: `true`

You can specify whether users can upload images.



### showFacePoint

- Type: `Boolean`
- Default: `true`

Ability to display analysis points on the face.



## Contacts

Website: <a href="https://getfaceage.com/">getfaceage.com</a>

Email: <a href="dev@getfaceage.com">dev@getfaceage.com</a>
