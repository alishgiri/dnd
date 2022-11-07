import React from "react";

import { Spell } from "../models/Spells";
import SpellDetailsModal from "../components/SpellDetailsModal";

export interface CommonHandlerProps {
  errMsg: string | null;
  toggleIsLoading: () => void;
  handleError: (error: any) => void;
  toggleModal: (spell?: Spell) => void;
}

interface CommonHandlerState {
  modalShow: boolean;
  isLoading: boolean;
  errMsg: string | null;
  spell: Spell | null | undefined;
}

export default function commonHandlers(
  Component: React.ComponentType<CommonHandlerProps>
) {
  return class extends React.Component<{}, CommonHandlerState> {
    state = { spell: null, errMsg: null, modalShow: false, isLoading: false };

    handleError = (error: any) => {
      if (typeof error === "string") {
        this.setState({ errMsg: error });
      } else if (error instanceof Error) {
        this.setState({ errMsg: error.message });
      } else {
        this.setState({ errMsg: "Something went wrong!" });
      }
    };

    toggleModal = (spell?: Spell) => {
      this.setState({ spell, modalShow: !this.state.modalShow });
    };

    toggleIsLoading = () => this.setState({ isLoading: !this.state.isLoading });

    render() {
      const { spell, errMsg, modalShow, isLoading } = this.state;

      return (
        <>
          <Component
            {...this.props}
            errMsg={errMsg}
            toggleModal={this.toggleModal}
            handleError={this.handleError}
            toggleIsLoading={this.toggleIsLoading}
          />
          <SpellDetailsModal
            spell={spell}
            show={modalShow}
            isLoading={isLoading}
            onHide={this.toggleModal}
          />
        </>
      );
    }
  };
}
