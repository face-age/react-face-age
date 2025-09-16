
import FaceAge from 'face-age';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

window.FaceAge = FaceAge

function omit(obj, keysToRemove) {
    let newObj = { ...obj }
    keysToRemove.forEach(key => {
        delete newObj[key]
    });
    return newObj
}

//window.FaceAge = FaceAge

export default class ReactFaceAge extends Component {
    constructor(props) {
        super(props)
        if (React.createRef) {
            this.faceRef = React.createRef()
        } else {
            this.setRef = el => this.faceRef = el
        }
        this.face = null;
        this.state = {
            runAdvisor: null,
        };
    }

    render() {
        //const {...props} = this.props
        /* return React.createElement('div', {
             id: 'FaceAge-module',
             ref: React.createRef
                 ? this.faceRef
                 : this.setRef,
             ...props
         })*/
        const { className, style } = omit(this.props, Object.keys(ReactFaceAge.propTypes));

        return (
            <div
                id="FaceAge-module"
                ref={React.createRef ? this.faceRef : this.setRef}
                className={className}
                style={style}
            />
        );
    }

    componentDidMount() {
        //const current = React.createRef ? this.faceRef.current : this.faceRef;
        let options = this.getConfig();

        if (options.displayModel !== 'modal')
            options.elementId = 'FaceAge-module';

        this.face = new FaceAge(options)
        this.face.render();

    }

    componentDidUpdate(prevProps, prevState) {

        if (!this.face) return null;

        const {
            getAdvisorData,
            getActiveSelections,
            getRoutineGroup,
            onClickProblem,
            onDisplayProducts,
            onDisplayRoutines,
            onAddToCart,
            onClickProduct,
            onResetData,
            onCloseModal,
            getImage,
            onCheckout,
            setCustomProducts
        } = this.props;


        if ((prevProps.getAdvisorData !== getAdvisorData) && getAdvisorData) {
            this.face.API.getAdvisorData((data) => {

                getAdvisorData(data);

                if (getImage) {
                    getImage(this.face.API.getImage());
                }

                this.setState({runAdvisor: true});

            });
        }

        if (prevProps.setCustomProducts !== setCustomProducts)
            this.face.API.setCustomProducts(setCustomProducts);


        if ((prevProps.getActiveSelections !== getActiveSelections) && getActiveSelections && typeof getActiveSelections === 'function') {
            this.face.API.getActiveSelections((data) => {
                getActiveSelections(data)
            });
        }

        if ((prevProps.getActiveSelections !== getAdvisorData) && getRoutineGroup) {
            getRoutineGroup(this.face.API.getRoutineGroup());
        }

        // Events
        if ((prevProps.getActiveSelections !== onClickProblem) && onClickProblem && typeof onClickProblem === 'function')
            this.face.onClickProblem(onClickProblem);

        if ((prevProps.getActiveSelections !== onDisplayProducts) && onDisplayProducts && typeof onDisplayProducts === 'function')
            this.face.onDisplayProducts(onDisplayProducts);

        if ((prevProps.getActiveSelections !== onDisplayRoutines) && onDisplayRoutines && typeof onDisplayRoutines === 'function')
            this.face.onDisplayProducts(onDisplayRoutines);

        if ((prevProps.getActiveSelections !== onCheckout) && onAddToCart && typeof onAddToCart === 'function')
            this.face.onAddToCart(onAddToCart);

        if ((prevProps.getActiveSelections !== onCheckout) && onClickProduct && typeof onClickProduct === 'function')
            this.face.onClickProduct(onClickProduct);


        if ((prevProps.getActiveSelections !== onCheckout) && onCloseModal && typeof onCloseModal === 'function')
            this.face.onCloseModal(onCloseModal);

        if ((prevProps.getActiveSelections !== onCheckout) && onCheckout && typeof onCheckout === 'function')
            this.face.onCheckout(onCheckout);


        if (prevProps.onResetData !== onResetData) {

            this.face.onResetData(() => {

                if (onResetData && typeof onResetData === 'function')
                    onResetData();

                this.setState({runAdvisor: false});

            });
        }

    }


    getConfig() {
        const {options} = this.props;
        return options;
    }


}

ReactFaceAge.propTypes = {
    options: PropTypes.object.isRequired,
    onLoad: PropTypes.object,
}
