<br />

<p align="center"><img src="https://getfaceage.com/wp-content/themes/faceage/assets/images/logo.svg" width="232px"></p>


<p align="center">React.js wrapper for <a href="https://www.npmjs.com/package/face-age">Face Age</a> to build interactive visualizations in react.</p>

<p align="center"><a href="https://getfaceage.com/"><img
      src="https://facegpt.app/static/hero_light.png"></a></p>
<br />


## Installation

```bash
npm install face-age react-face-age
# yarn add face-age react-face-age
```

Local development (from a local tarball):
```bash
# in the library repo
npm run build -- --bundleConfigAsCjs
npm pack

# in your app
npm uninstall react-face-age
npm i /absolute/path/to/react-face-age/react-face-age-<version>.tgz
```

## Quick start (JS/TS)

```jsx
import ReactFaceAge from 'react-face-age';

export default function App() {
  return (
    <ReactFaceAge
      faceageId="<YOUR_FACE_AGE_CLIENT_ID>"
      analyzerType="skincare-analyzer"  // or use "type" prop
      displayModel="section"            // or "modal"
      language="en"
      height="550px"
      currency="$"
      quiz
      defaultQuiz={{ email: 'hi@getfaceage.com' }}
      showProducts
      showRoutine
      showAddToCart
      problems={["fineWrinkles", "eyeWrinkles"]}
      showCamera
      showUpload
    />
  );
}
```

## Props

- faceageId: string (required)
- analyzerType: string (alias for FaceAge option "type")
- displayModel: 'section' | 'modal'
- language: string
- height: string (e.g., '550px')
- currency: string (e.g., '$')
- quiz: boolean
- defaultQuiz: object (e.g., { email: 'hi@getfaceage.com' })
- showProducts: boolean
- showRoutine: boolean
- showAddToCart: boolean
- problems: string[]
- showCamera: boolean
- showUpload: boolean

### Callbacks (events)
- onClickProblem(fn)
- onDisplayProducts(fn)
- onDisplayRoutines(fn)
- onAddToCart(fn)
- onClickProduct(fn)
- onCloseModal(fn)            // fires in modal mode
- onCheckout(fn)

### Getters (fire when prop changes from undefined → function)
- getAdvisorData(fn)
- getActiveSelections(fn)
- getRoutineGroup(fn)
- getImage(fn)

Pattern to trigger once after mount:
```tsx
const [enableFetch, setEnableFetch] = useState(false);
useEffect(() => setEnableFetch(true), []);

<ReactFaceAge
  faceageId="<ID>"
  getAdvisorData={enableFetch ? (d) => console.log(d) : undefined}
  getActiveSelections={enableFetch ? (s) => console.log(s) : undefined}
  getImage={enableFetch ? (img) => console.log(img) : undefined}
/>;
```

### Custom products
Provide products via `setCustomProducts`. They are applied on mount and on changes.

```tsx
const products = [
  {
    id: 1,
    url: 'https://getfaceage.com',
    image: 'https://demo.getfaceage.com/static/products/pr5.png',
    title: 'Skin moisturizers',
    description: 'Vitamin C. Rooster 30ml',
    routineGroups: { morning: ['cleanser', 'serum'] },
    problems: ['acne', 'wrinkles'],
    price: 40,
    offerPrice: 18.99,
    variables: {
      size: {
        title: 'Size',
        option: [
          { label: '10 cc', value: '10', price: 40, offerPrice: 18.99 },
          { label: '25 cc', value: '25', price: 52, offerPrice: 19.99 },
          { label: '35 cc', value: '35' }
        ]
      }
    }
  }
];

<ReactFaceAge setCustomProducts={products} />
```

## Imperative API (advanced)
This wrapper is designed to be declarative, but you can still reach the FaceAge instance if needed.

- In JS: access the global `FaceAge` class. The instance is internal to the component. Prefer the declarative props above.
- If you must call the API directly, add a small ref wrapper component around `ReactFaceAge` and expose the instance.

Common calls (through the wrapper’s getters):
- Advisor data: `getAdvisorData={(cbData) => ...}`
- Active selections: `getActiveSelections={(cbData) => ...}`
- Routine group: `getRoutineGroup={(groups) => ...}`
- Image: `getImage={(img) => ...}`
- Custom products: `setCustomProducts={[...]}`



## Contacts

Website: <a href="https://getfaceage.com/">getfaceage.com</a>

Email: <a href="dev@getfaceage.com">dev@getfaceage.com</a>
