import React from 'react';
import FaceAge from 'face-age';

type AnyFunction = (...args: any[]) => void;

export type DisplayModel = 'section' | 'modal' | (string & {});

export interface FaceAgeOptions {
  elementId?: string;
  faceageId: string;
  type?: string;
  analyzerType?: string;
  displayModel?: DisplayModel;
  language?: string;
  height?: string;
  currency?: string;
  quiz?: boolean;
  defaultQuiz?: { email?: string } & Record<string, unknown>;
  showProducts?: boolean;
  showRoutine?: boolean;
  showAddToCart?: boolean;
  problems?: string[];
  showCamera?: boolean;
  showUpload?: boolean;
  // Allow unknown additional options without losing type safety on known ones
  [extraOption: string]: unknown;
}

export interface ReactFaceAgeProps extends React.HTMLAttributes<HTMLDivElement>, FaceAgeOptions {
  getAdvisorData?: (data: any) => void;
  getActiveSelections?: (data: any) => void;
  getRoutineGroup?: (data: any) => void;
  onClickProblem?: AnyFunction;
  onDisplayProducts?: AnyFunction;
  onDisplayRoutines?: AnyFunction;
  onAddToCart?: AnyFunction;
  onClickProduct?: AnyFunction;
  onResetData?: AnyFunction;
  onCloseModal?: AnyFunction;
  onCheckout?: AnyFunction;
  getImage?: (image: any) => void;
  setCustomProducts?: any;
}

interface ReactFaceAgeState {
  runAdvisor: boolean | null;
}

export default class ReactFaceAge extends React.Component<ReactFaceAgeProps, ReactFaceAgeState> {
  private faceRef: React.RefObject<HTMLDivElement>;
  private face: any;

  constructor(props: ReactFaceAgeProps) {
    super(props);
    this.faceRef = React.createRef<HTMLDivElement>();
    this.face = null;
    this.state = {
      runAdvisor: null,
    };
  }

  componentDidMount(): void {
    if (typeof window !== 'undefined') {
      (window as any).FaceAge = FaceAge;
    }

    const options = this.getConfig();
    if (options && options.displayModel !== 'modal') {
      (options as any).elementId = 'FaceAge-module';
    }

    this.face = new (FaceAge as any)(options);
    // Apply custom products before render if provided
    if (this.props.setCustomProducts !== undefined) {
      try {
        this.face.API.setCustomProducts(this.props.setCustomProducts);
      } catch (_) {
        // ignore
      }
    }
    // Register handlers as early as possible
    this.registerEventHandlers(this.props);
    this.face.render();
  }

  componentWillUnmount(): void {
    try {
      if (this.face && typeof this.face.destroy === 'function') {
        this.face.destroy();
      } else if (this.face && typeof this.face.dispose === 'function') {
        this.face.dispose();
      } else if (this.face && typeof this.face.unmount === 'function') {
        this.face.unmount();
      }
    } catch (_) {
      // no-op
    } finally {
      this.face = null;
      const el = typeof document !== 'undefined' ? document.getElementById('FaceAge-module') : null;
      if (el) {
        while (el.firstChild) el.removeChild(el.firstChild);
      }
    }
  }

  componentDidUpdate(prevProps: ReactFaceAgeProps): void {
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
      setCustomProducts,
    } = this.props;

    if (prevProps.getAdvisorData !== getAdvisorData && getAdvisorData) {
      this.face.API.getAdvisorData((data: any) => {
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

    if (
      prevProps.getActiveSelections !== getActiveSelections &&
      getActiveSelections &&
      typeof getActiveSelections === 'function'
    ) {
      this.face.API.getActiveSelections((data: any) => {
        getActiveSelections(data);
      });
    }

    if (prevProps.getRoutineGroup !== getRoutineGroup && getRoutineGroup) {
      getRoutineGroup(this.face.API.getRoutineGroup());
    }

    // Re-register event handlers when their references change
    if (prevProps.onClickProblem !== onClickProblem) {
      if (typeof onClickProblem === 'function') this.face.onClickProblem(onClickProblem);
    }
    if (prevProps.onDisplayProducts !== onDisplayProducts) {
      if (typeof onDisplayProducts === 'function') this.face.onDisplayProducts(onDisplayProducts);
    }
    if (prevProps.onDisplayRoutines !== onDisplayRoutines) {
      if (typeof onDisplayRoutines === 'function') this.face.onDisplayProducts(onDisplayRoutines);
    }
    if (prevProps.onAddToCart !== onAddToCart) {
      if (typeof onAddToCart === 'function') this.face.onAddToCart(onAddToCart);
    }
    if (prevProps.onClickProduct !== onClickProduct) {
      if (typeof onClickProduct === 'function') this.face.onClickProduct(onClickProduct);
    }
    if (prevProps.onCloseModal !== onCloseModal) {
      if (typeof onCloseModal === 'function') this.face.onCloseModal(onCloseModal);
    }
    if (prevProps.onCheckout !== onCheckout) {
      if (typeof onCheckout === 'function') this.face.onCheckout(onCheckout);
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

  private getConfig(): FaceAgeOptions {
    const defaults: Partial<FaceAgeOptions> = {
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

    const effectiveType = analyzerType ?? type;

    const provided: Partial<FaceAgeOptions> = {
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

    const cleaned = Object.fromEntries(
      Object.entries(provided).filter(([_, v]) => v !== undefined)
    ) as Partial<FaceAgeOptions>;

    const merged = { ...defaults, ...cleaned } as FaceAgeOptions;

    if (!merged.faceageId || typeof merged.faceageId !== 'string') {
      throw new Error('ReactFaceAge: faceageId (Face Age Client ID) is required');
    }

    return merged;
  }

  private registerEventHandlers(props: ReactFaceAgeProps): void {
    if (!this.face) return;
    const {
      onClickProblem,
      onDisplayProducts,
      onDisplayRoutines,
      onAddToCart,
      onClickProduct,
      onCloseModal,
      onCheckout,
    } = props;

    if (typeof onClickProblem === 'function') this.face.onClickProblem(onClickProblem);
    if (typeof onDisplayProducts === 'function') this.face.onDisplayProducts(onDisplayProducts);
    if (typeof onDisplayRoutines === 'function') this.face.onDisplayProducts(onDisplayRoutines);
    if (typeof onAddToCart === 'function') this.face.onAddToCart(onAddToCart);
    if (typeof onClickProduct === 'function') this.face.onClickProduct(onClickProduct);
    if (typeof onCloseModal === 'function') this.face.onCloseModal(onCloseModal);
    if (typeof onCheckout === 'function') this.face.onCheckout(onCheckout);
  }

  render(): React.ReactNode {
    const { className, style } = this.props;

    return (
      <div
        id="FaceAge-module"
        ref={this.faceRef}
        className={className}
        style={style}
      />
    );
  }
}


