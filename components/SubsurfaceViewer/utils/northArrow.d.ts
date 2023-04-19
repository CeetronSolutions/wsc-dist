export declare const GLTF_JSON_NORTH_ARROW: {
    accessors: ({
        bufferView: number;
        byteOffset: number;
        componentType: number;
        count: number;
        type: string;
        max: number[];
        min: number[];
        name?: undefined;
    } | {
        bufferView: number;
        byteOffset: number;
        componentType: number;
        count: number;
        type: string;
        max: number[];
        min: number[];
        name: string;
    })[];
    asset: {
        generator: string;
        version: string;
    };
    buffers: {
        uri: string;
        byteLength: number;
    }[];
    bufferViews: ({
        buffer: number;
        byteOffset: number;
        byteLength: number;
        target: number;
        byteStride?: undefined;
    } | {
        buffer: number;
        byteOffset: number;
        byteLength: number;
        byteStride: number;
        target: number;
    })[];
    images: {
        uri: string;
    }[];
    materials: {
        name: string;
        pbrMetallicRoughness: {
            baseColorFactor: number[];
            baseColorTexture: {
                index: number;
                texCoord: number;
            };
            metallicFactor: number;
            roughnessFactor: number;
            metallicRoughnessTexture: {
                index: number;
                texCoord: number;
            };
        };
        normalTexture: {
            index: number;
            texCoord: number;
            scale: number;
        };
        emissiveFactor: number[];
        alphaMode: string;
        doubleSided: boolean;
    }[];
    meshes: {
        primitives: {
            attributes: {
                POSITION: number;
                NORMAL: number;
                TANGENT: number;
                TEXCOORD_0: number;
                TEXCOORD_1: number;
            };
            indices: number;
            material: number;
            mode: number;
        }[];
    }[];
    nodes: ({
        mesh: number;
        name: string;
        children?: undefined;
        matrix?: undefined;
    } | {
        children: number[];
        matrix: number[];
        name: string;
        mesh?: undefined;
    } | {
        children: number[];
        name: string;
        mesh?: undefined;
        matrix?: undefined;
    })[];
    samplers: {
        magFilter: number;
        minFilter: number;
        wrapS: number;
        wrapT: number;
    }[];
    scene: number;
    scenes: {
        nodes: number[];
    }[];
    textures: {
        sampler: number;
        source: number;
    }[];
};
