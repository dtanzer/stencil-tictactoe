/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppRoot {
    }
    interface GameBoard {
        "player1": string;
        "player2": string;
    }
    interface NewGame {
        "foo": string | undefined;
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLGameBoardElement extends Components.GameBoard, HTMLStencilElement {
    }
    var HTMLGameBoardElement: {
        prototype: HTMLGameBoardElement;
        new (): HTMLGameBoardElement;
    };
    interface HTMLNewGameElement extends Components.NewGame, HTMLStencilElement {
    }
    var HTMLNewGameElement: {
        prototype: HTMLNewGameElement;
        new (): HTMLNewGameElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "game-board": HTMLGameBoardElement;
        "new-game": HTMLNewGameElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface GameBoard {
        "player1"?: string;
        "player2"?: string;
    }
    interface NewGame {
        "foo"?: string | undefined;
        "onStartNewGame"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "game-board": GameBoard;
        "new-game": NewGame;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "game-board": LocalJSX.GameBoard & JSXBase.HTMLAttributes<HTMLGameBoardElement>;
            "new-game": LocalJSX.NewGame & JSXBase.HTMLAttributes<HTMLNewGameElement>;
        }
    }
}
