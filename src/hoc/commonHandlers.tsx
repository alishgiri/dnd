import React from "react";

export interface CommonHandlerProps {
  errMsg: string | null;
  handleError: (error: any) => void;
}

export default function commonHandlers(
  Component: React.ComponentType<CommonHandlerProps>
) {
  return class extends React.Component {
    state = { errMsg: null };

    handleError = (error: any) => {
      if (typeof error === "string") {
        this.setState({ errMsg: error });
      } else if (error instanceof Error) {
        this.setState({ errMsg: error.message });
      } else {
        this.setState({ errMsg: "Something went wrong!" });
      }
    };

    render() {
      const { errMsg } = this.state;

      return (
        <Component
          {...this.props}
          errMsg={errMsg}
          handleError={this.handleError}
        />
      );
    }
  };
}
