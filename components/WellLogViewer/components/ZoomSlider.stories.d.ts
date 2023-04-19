declare namespace _default {
    export { ZoomSlider as component };
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
        namespace value {
            const description_1: string;
            export { description_1 as description };
        }
        namespace max {
            const description_2: string;
            export { description_2 as description };
        }
        namespace onChange {
            const description_3: string;
            export { description_3 as description };
        }
        namespace step {
            const description_4: string;
            export { description_4 as description };
        }
    }
}
export default _default;
export function Default(args: any): JSX.Element;
export namespace Default {
    namespace args {
        const value_1: number;
        export { value_1 as value };
        const max_1: number;
        export { max_1 as max };
    }
}
import ZoomSlider from "./ZoomSlider";
declare const ComponentCode: "<ZoomSlider value={1} max={128}/>";
