import './App.css';
import ReactFaceAge from "react-face-age";

function App() {

    const faceageId = 'WVmzp6E6QJKxDINW5tU5'
    const type = 'skincare-analyzer'

    const onload = (re) => {
        console.log(re);
    }

    return (
        <div className="App">
            <ReactFaceAge
                faceageId={faceageId}
                type={type}
                displayModel="section"
                language="en"
                height="550px"
                currency="$"
                quiz={true}
                defaultQuiz={{ email: 'hi@getfaceage.com' }}
                showProducts={true}
                showRoutine={true}
                showAddToCart={true}
                problems={["fineWrinkles", "eyeWrinkles"]}
                showCamera={true}
                showUpload={true}
                onLoad={onload}
            />
        </div>
    );
}

export default App;
