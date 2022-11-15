import React, { Component, ReactNode } from "react";
import ErrorComponent from "../molecules/errorComponent/index";

interface Props {
  children: ReactNode;
}

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: State) {
    console.error(error);
    return { hasError: true, errorInfo: error };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
