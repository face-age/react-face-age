import './App.css';
import ReactFaceAge from "react-face-age";

function App() {

    const options = {
        faceageId: 'WVmzp6E6QJKxDINW5tU5',
        type: 'skincare-analyzer'
    }

    const onload = (re) => {
        console.log(re);
    }

    return (
        <div className="App">
            <ReactFaceAge
                options={options}
                onLoad={onload}
            />
        </div>
    );
}

export default App;
