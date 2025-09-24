
import React, { Component } from 'react';
import FaceAge from 'face-age';

export default class ReactFaceAge extends Component {
    constructor(props) {
        super(props);
        if (React.createRef) {
            this.faceRef = React.createRef();
        } else {
            this.setRef = el => this.faceRef = el;
        }
        this.face = null;
        this.state = {
            runAdvisor: null,
        };
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.FaceAge = FaceAge;
        }
        const options = this.getConfig();
        if (options && options.displayModel !== 'modal') {
            options.elementId = 'FaceAge-module';
        }
        this.face = new FaceAge(options);
        if (this.props.setCustomProducts !== undefined) {
            try {
                this.face.API.setCustomProducts(this.props.setCustomProducts);
            } catch (e) {}
        }
        this.face.render();
    }

    componentDidUpdate(prevProps) {
        if (!this.face) return;

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

        if (prevProps.getAdvisorData !== getAdvisorData && getAdvisorData) {
            this.face.API.getAdvisorData((data) => {
                getAdvisorData(data);
                if (getImage) {
                    getImage(this.face.API.getImage());
                }
                this.setState({ runAdvisor: true });
            });
        }

        if (prevProps.setCustomProducts !== setCustomProducts) {
            this.face.API.setCustomProducts(setCustomProducts);
        }

        if (prevProps.getActiveSelections !== getActiveSelections && getActiveSelections && typeof getActiveSelections === 'function') {
            this.face.API.getActiveSelections((data) => {
                getActiveSelections(data);
            });
        }

        if (prevProps.getActiveSelections !== getAdvisorData && getRoutineGroup) {
            getRoutineGroup(this.face.API.getRoutineGroup());
        }

        if (prevProps.getActiveSelections !== onClickProblem && onClickProblem && typeof onClickProblem === 'function') {
            this.face.onClickProblem(onClickProblem);
        }

        if (prevProps.getActiveSelections !== onDisplayProducts && onDisplayProducts && typeof onDisplayProducts === 'function') {
            this.face.onDisplayProducts(onDisplayProducts);
        }

        if (prevProps.getActiveSelections !== onDisplayRoutines && onDisplayRoutines && typeof onDisplayRoutines === 'function') {
            this.face.onDisplayProducts(onDisplayRoutines);
        }

        if (prevProps.getActiveSelections !== onAddToCart && onAddToCart && typeof onAddToCart === 'function') {
            this.face.onAddToCart(onAddToCart);
        }

        if (prevProps.getActiveSelections !== onClickProduct && onClickProduct && typeof onClickProduct === 'function') {
            this.face.onClickProduct(onClickProduct);
        }

        if (prevProps.getActiveSelections !== onCloseModal && onCloseModal && typeof onCloseModal === 'function') {
            this.face.onCloseModal(onCloseModal);
        }

        if (prevProps.getActiveSelections !== onCheckout && onCheckout && typeof onCheckout === 'function') {
            this.face.onCheckout(onCheckout);
        }

        if (prevProps.onResetData !== onResetData) {
            this.face.onResetData(() => {
                if (onResetData && typeof onResetData === 'function') {
                    onResetData();
                }
                this.setState({ runAdvisor: false });
            });
        }
    }

    componentWillUnmount() {
        try {
            if (this.face && typeof this.face.destroy === 'function') {
                this.face.destroy();
            } else if (this.face && typeof this.face.dispose === 'function') {
                this.face.dispose();
            } else if (this.face && typeof this.face.unmount === 'function') {
                this.face.unmount();
            }
        } catch (e) {
        } finally {
            this.face = null;
            const el = typeof document !== 'undefined' ? document.getElementById('FaceAge-module') : null;
            if (el) {
                while (el.firstChild) el.removeChild(el.firstChild);
            }
        }
    }

    getConfig() {
        const defaults = {
            elementId: 'FaceAge-module',
            displayModel: 'section',
            language: 'en',
            height: '550px',
            currency: '$',
            quiz: true,
            defaultQuiz: {},
            showProducts: true,
            showRoutine: true,
            showAddToCart: true,
            problems: [],
            showCamera: true,
            showUpload: true,
        };

        const {
            faceageId,
            type,
            analyzerType,
            displayModel,
            language,
            height,
            currency,
            quiz,
            defaultQuiz,
            showProducts,
            showRoutine,
            showAddToCart,
            problems,
            showCamera,
            showUpload,
        } = this.props;

        const effectiveType = analyzerType !== undefined ? analyzerType : type;

        const provided = {
            faceageId,
            type: effectiveType,
            analyzerType,
            displayModel,
            language,
            height,
            currency,
            quiz,
            defaultQuiz,
            showProducts,
            showRoutine,
            showAddToCart,
            problems,
            showCamera,
            showUpload,
        };

        const cleaned = Object.keys(provided).reduce((acc, key) => {
            if (provided[key] !== undefined) acc[key] = provided[key];
            return acc;
        }, {});

        const merged = { ...defaults, ...cleaned };

        merged.elementId = 'FaceAge-module';

        if (!merged.faceageId || typeof merged.faceageId !== 'string') {
            throw new Error('ReactFaceAge: faceageId (Face Age Client ID) is required');
        }

        return merged;
    }

    render() {
        const { className, style } = this.props;
        return (
            <div
                id="FaceAge-module"
                ref={React.createRef ? this.faceRef : this.setRef}
                className={className}
                style={style}
            />
        );
    }
}
