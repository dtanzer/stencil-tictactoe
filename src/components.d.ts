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
    interface NewGame {
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLNewGameElement extends Components.NewGame, HTMLStencilElement {
    }
    var HTMLNewGameElement: {
        prototype: HTMLNewGameElement;
        new (): HTMLNewGameElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "new-game": HTMLNewGameElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface NewGame {
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "new-game": NewGame;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "new-game": LocalJSX.NewGame & JSXBase.HTMLAttributes<HTMLNewGameElement>;
        }
    }
}
