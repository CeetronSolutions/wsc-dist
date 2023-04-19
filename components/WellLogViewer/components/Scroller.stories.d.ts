declare namespace _default {
    export { Scroller as component };
    export const title: string;
    export namespace parameters {
        namespace docs {
            namespace description {
                const component: string;
            }
        }
        namespace componentSource {
            export { ComponentCode as code };
            export const language: string;
        }
    }
    export namespace argTypes {
        namespace onScroll {
            const description_1: string;
            export { description_1 as description };
        }
    }
}
export default _default;
export function Default(args: any): JSX.Element;
export namespace Default {
    const args: {};
}
import Scroller from "./Scroller";
declare const ComponentCode: string;
