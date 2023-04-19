declare const _default: {
    classes: any;
    functions: {};
    enumerations: {
        COORDINATE_SYSTEM: {
            readonly DEFAULT: -1;
            readonly LNGLAT: 1;
            readonly METER_OFFSETS: 2;
            readonly LNGLAT_OFFSETS: 3;
            readonly CARTESIAN: 0;
        };
        GL: {
            DEPTH_BUFFER_BIT: number;
            STENCIL_BUFFER_BIT: number;
            COLOR_BUFFER_BIT: number;
            POINTS: number;
            LINES: number;
            LINE_LOOP: number;
            LINE_STRIP: number;
            TRIANGLES: number;
            TRIANGLE_STRIP: number;
            TRIANGLE_FAN: number;
            ZERO: number;
            ONE: number;
            SRC_COLOR: number;
            ONE_MINUS_SRC_COLOR: number;
            SRC_ALPHA: number;
            ONE_MINUS_SRC_ALPHA: number;
            DST_ALPHA: number;
            ONE_MINUS_DST_ALPHA: number;
            DST_COLOR: number;
            ONE_MINUS_DST_COLOR: number;
            SRC_ALPHA_SATURATE: number;
            CONSTANT_COLOR: number;
            ONE_MINUS_CONSTANT_COLOR: number;
            CONSTANT_ALPHA: number;
            ONE_MINUS_CONSTANT_ALPHA: number;
            FUNC_ADD: number;
            FUNC_SUBTRACT: number;
            FUNC_REVERSE_SUBTRACT: number;
            BLEND_EQUATION: number;
            BLEND_EQUATION_RGB: number;
            BLEND_EQUATION_ALPHA: number;
            BLEND_DST_RGB: number;
            BLEND_SRC_RGB: number;
            BLEND_DST_ALPHA: number;
            BLEND_SRC_ALPHA: number;
            BLEND_COLOR: number;
            ARRAY_BUFFER_BINDING: number;
            ELEMENT_ARRAY_BUFFER_BINDING: number;
            LINE_WIDTH: number;
            ALIASED_POINT_SIZE_RANGE: number;
            ALIASED_LINE_WIDTH_RANGE: number;
            CULL_FACE_MODE: number;
            FRONT_FACE: number;
            DEPTH_RANGE: number;
            DEPTH_WRITEMASK: number;
            DEPTH_CLEAR_VALUE: number;
            DEPTH_FUNC: number;
            STENCIL_CLEAR_VALUE: number;
            STENCIL_FUNC: number;
            STENCIL_FAIL: number;
            STENCIL_PASS_DEPTH_FAIL: number;
            STENCIL_PASS_DEPTH_PASS: number;
            STENCIL_REF: number;
            STENCIL_VALUE_MASK: number;
            STENCIL_WRITEMASK: number;
            STENCIL_BACK_FUNC: number;
            STENCIL_BACK_FAIL: number;
            STENCIL_BACK_PASS_DEPTH_FAIL: number;
            STENCIL_BACK_PASS_DEPTH_PASS: number;
            STENCIL_BACK_REF: number;
            STENCIL_BACK_VALUE_MASK: number;
            STENCIL_BACK_WRITEMASK: number;
            VIEWPORT: number;
            SCISSOR_BOX: number;
            COLOR_CLEAR_VALUE: number;
            COLOR_WRITEMASK: number;
            UNPACK_ALIGNMENT: number;
            PACK_ALIGNMENT: number;
            MAX_TEXTURE_SIZE: number;
            MAX_VIEWPORT_DIMS: number;
            SUBPIXEL_BITS: number;
            RED_BITS: number;
            GREEN_BITS: number;
            BLUE_BITS: number;
            ALPHA_BITS: number;
            DEPTH_BITS: number;
            STENCIL_BITS: number;
            POLYGON_OFFSET_UNITS: number;
            POLYGON_OFFSET_FACTOR: number;
            TEXTURE_BINDING_2D: number;
            SAMPLE_BUFFERS: number;
            SAMPLES: number;
            SAMPLE_COVERAGE_VALUE: number;
            SAMPLE_COVERAGE_INVERT: number;
            COMPRESSED_TEXTURE_FORMATS: number;
            VENDOR: number;
            RENDERER: number;
            VERSION: number;
            IMPLEMENTATION_COLOR_READ_TYPE: number;
            IMPLEMENTATION_COLOR_READ_FORMAT: number;
            BROWSER_DEFAULT_WEBGL: number;
            STATIC_DRAW: number;
            STREAM_DRAW: number;
            DYNAMIC_DRAW: number;
            ARRAY_BUFFER: number;
            ELEMENT_ARRAY_BUFFER: number;
            BUFFER_SIZE: number;
            BUFFER_USAGE: number;
            CURRENT_VERTEX_ATTRIB: number;
            VERTEX_ATTRIB_ARRAY_ENABLED: number;
            VERTEX_ATTRIB_ARRAY_SIZE: number;
            VERTEX_ATTRIB_ARRAY_STRIDE: number;
            VERTEX_ATTRIB_ARRAY_TYPE: number;
            VERTEX_ATTRIB_ARRAY_NORMALIZED: number;
            VERTEX_ATTRIB_ARRAY_POINTER: number;
            VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;
            CULL_FACE: number;
            FRONT: number;
            BACK: number;
            FRONT_AND_BACK: number;
            BLEND: number;
            DEPTH_TEST: number;
            DITHER: number;
            POLYGON_OFFSET_FILL: number;
            SAMPLE_ALPHA_TO_COVERAGE: number;
            SAMPLE_COVERAGE: number;
            SCISSOR_TEST: number;
            STENCIL_TEST: number;
            NO_ERROR: number;
            INVALID_ENUM: number;
            INVALID_VALUE: number;
            INVALID_OPERATION: number;
            OUT_OF_MEMORY: number;
            CONTEXT_LOST_WEBGL: number;
            CW: number;
            CCW: number;
            DONT_CARE: number;
            FASTEST: number;
            NICEST: number;
            GENERATE_MIPMAP_HINT: number;
            BYTE: number;
            UNSIGNED_BYTE: number;
            SHORT: number;
            UNSIGNED_SHORT: number;
            INT: number;
            UNSIGNED_INT: number;
            FLOAT: number;
            DOUBLE: number;
            DEPTH_COMPONENT: number;
            ALPHA: number;
            RGB: number;
            RGBA: number;
            LUMINANCE: number;
            LUMINANCE_ALPHA: number;
            UNSIGNED_SHORT_4_4_4_4: number;
            UNSIGNED_SHORT_5_5_5_1: number;
            UNSIGNED_SHORT_5_6_5: number;
            FRAGMENT_SHADER: number;
            VERTEX_SHADER: number;
            COMPILE_STATUS: number;
            DELETE_STATUS: number;
            LINK_STATUS: number;
            VALIDATE_STATUS: number;
            ATTACHED_SHADERS: number;
            ACTIVE_ATTRIBUTES: number;
            ACTIVE_UNIFORMS: number;
            MAX_VERTEX_ATTRIBS: number;
            MAX_VERTEX_UNIFORM_VECTORS: number;
            MAX_VARYING_VECTORS: number;
            MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
            MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
            MAX_TEXTURE_IMAGE_UNITS: number;
            MAX_FRAGMENT_UNIFORM_VECTORS: number;
            SHADER_TYPE: number;
            SHADING_LANGUAGE_VERSION: number;
            CURRENT_PROGRAM: number;
            NEVER: number;
            ALWAYS: number;
            LESS: number;
            EQUAL: number;
            LEQUAL: number;
            GREATER: number;
            GEQUAL: number;
            NOTEQUAL: number;
            KEEP: number;
            REPLACE: number;
            INCR: number;
            DECR: number;
            INVERT: number;
            INCR_WRAP: number;
            DECR_WRAP: number;
            NEAREST: number;
            LINEAR: number;
            NEAREST_MIPMAP_NEAREST: number;
            LINEAR_MIPMAP_NEAREST: number;
            NEAREST_MIPMAP_LINEAR: number;
            LINEAR_MIPMAP_LINEAR: number;
            TEXTURE_MAG_FILTER: number;
            TEXTURE_MIN_FILTER: number;
            TEXTURE_WRAP_S: number;
            TEXTURE_WRAP_T: number;
            TEXTURE_2D: number;
            TEXTURE: number;
            TEXTURE_CUBE_MAP: number;
            TEXTURE_BINDING_CUBE_MAP: number;
            TEXTURE_CUBE_MAP_POSITIVE_X: number;
            TEXTURE_CUBE_MAP_NEGATIVE_X: number;
            TEXTURE_CUBE_MAP_POSITIVE_Y: number;
            TEXTURE_CUBE_MAP_NEGATIVE_Y: number;
            TEXTURE_CUBE_MAP_POSITIVE_Z: number;
            TEXTURE_CUBE_MAP_NEGATIVE_Z: number;
            MAX_CUBE_MAP_TEXTURE_SIZE: number;
            TEXTURE0: number;
            ACTIVE_TEXTURE: number;
            REPEAT: number;
            CLAMP_TO_EDGE: number;
            MIRRORED_REPEAT: number;
            TEXTURE_WIDTH: number;
            TEXTURE_HEIGHT: number;
            FLOAT_VEC2: number;
            FLOAT_VEC3: number;
            FLOAT_VEC4: number;
            INT_VEC2: number;
            INT_VEC3: number;
            INT_VEC4: number;
            BOOL: number;
            BOOL_VEC2: number;
            BOOL_VEC3: number;
            BOOL_VEC4: number;
            FLOAT_MAT2: number;
            FLOAT_MAT3: number;
            FLOAT_MAT4: number;
            SAMPLER_2D: number;
            SAMPLER_CUBE: number;
            LOW_FLOAT: number;
            MEDIUM_FLOAT: number;
            HIGH_FLOAT: number;
            LOW_INT: number;
            MEDIUM_INT: number;
            HIGH_INT: number;
            FRAMEBUFFER: number;
            RENDERBUFFER: number;
            RGBA4: number;
            RGB5_A1: number;
            RGB565: number;
            DEPTH_COMPONENT16: number;
            STENCIL_INDEX: number;
            STENCIL_INDEX8: number;
            DEPTH_STENCIL: number;
            RENDERBUFFER_WIDTH: number;
            RENDERBUFFER_HEIGHT: number;
            RENDERBUFFER_INTERNAL_FORMAT: number;
            RENDERBUFFER_RED_SIZE: number;
            RENDERBUFFER_GREEN_SIZE: number;
            RENDERBUFFER_BLUE_SIZE: number;
            RENDERBUFFER_ALPHA_SIZE: number;
            RENDERBUFFER_DEPTH_SIZE: number;
            RENDERBUFFER_STENCIL_SIZE: number;
            FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;
            FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;
            FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;
            FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;
            COLOR_ATTACHMENT0: number;
            DEPTH_ATTACHMENT: number;
            STENCIL_ATTACHMENT: number;
            DEPTH_STENCIL_ATTACHMENT: number;
            NONE: number;
            FRAMEBUFFER_COMPLETE: number;
            FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;
            FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;
            FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;
            FRAMEBUFFER_UNSUPPORTED: number;
            FRAMEBUFFER_BINDING: number;
            RENDERBUFFER_BINDING: number;
            READ_FRAMEBUFFER: number;
            DRAW_FRAMEBUFFER: number;
            MAX_RENDERBUFFER_SIZE: number;
            INVALID_FRAMEBUFFER_OPERATION: number;
            UNPACK_FLIP_Y_WEBGL: number;
            UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;
            UNPACK_COLORSPACE_CONVERSION_WEBGL: number;
            READ_BUFFER: number;
            UNPACK_ROW_LENGTH: number;
            UNPACK_SKIP_ROWS: number;
            UNPACK_SKIP_PIXELS: number;
            PACK_ROW_LENGTH: number;
            PACK_SKIP_ROWS: number;
            PACK_SKIP_PIXELS: number;
            TEXTURE_BINDING_3D: number;
            UNPACK_SKIP_IMAGES: number;
            UNPACK_IMAGE_HEIGHT: number;
            MAX_3D_TEXTURE_SIZE: number;
            MAX_ELEMENTS_VERTICES: number;
            MAX_ELEMENTS_INDICES: number;
            MAX_TEXTURE_LOD_BIAS: number;
            MAX_FRAGMENT_UNIFORM_COMPONENTS: number;
            MAX_VERTEX_UNIFORM_COMPONENTS: number;
            MAX_ARRAY_TEXTURE_LAYERS: number;
            MIN_PROGRAM_TEXEL_OFFSET: number;
            MAX_PROGRAM_TEXEL_OFFSET: number;
            MAX_VARYING_COMPONENTS: number;
            FRAGMENT_SHADER_DERIVATIVE_HINT: number;
            RASTERIZER_DISCARD: number;
            VERTEX_ARRAY_BINDING: number;
            MAX_VERTEX_OUTPUT_COMPONENTS: number;
            MAX_FRAGMENT_INPUT_COMPONENTS: number;
            MAX_SERVER_WAIT_TIMEOUT: number;
            MAX_ELEMENT_INDEX: number;
            RED: number;
            RGB8: number;
            RGBA8: number;
            RGB10_A2: number;
            TEXTURE_3D: number;
            TEXTURE_WRAP_R: number;
            TEXTURE_MIN_LOD: number;
            TEXTURE_MAX_LOD: number;
            TEXTURE_BASE_LEVEL: number;
            TEXTURE_MAX_LEVEL: number;
            TEXTURE_COMPARE_MODE: number;
            TEXTURE_COMPARE_FUNC: number;
            SRGB: number;
            SRGB8: number;
            SRGB8_ALPHA8: number;
            COMPARE_REF_TO_TEXTURE: number;
            RGBA32F: number;
            RGB32F: number;
            RGBA16F: number;
            RGB16F: number;
            TEXTURE_2D_ARRAY: number;
            TEXTURE_BINDING_2D_ARRAY: number;
            R11F_G11F_B10F: number;
            RGB9_E5: number;
            RGBA32UI: number;
            RGB32UI: number;
            RGBA16UI: number;
            RGB16UI: number;
            RGBA8UI: number;
            RGB8UI: number;
            RGBA32I: number;
            RGB32I: number;
            RGBA16I: number;
            RGB16I: number;
            RGBA8I: number;
            RGB8I: number;
            RED_INTEGER: number;
            RGB_INTEGER: number;
            RGBA_INTEGER: number;
            R8: number;
            RG8: number;
            R16F: number;
            R32F: number;
            RG16F: number;
            RG32F: number;
            R8I: number;
            R8UI: number;
            R16I: number;
            R16UI: number;
            R32I: number;
            R32UI: number;
            RG8I: number;
            RG8UI: number;
            RG16I: number;
            RG16UI: number;
            RG32I: number;
            RG32UI: number;
            R8_SNORM: number;
            RG8_SNORM: number;
            RGB8_SNORM: number;
            RGBA8_SNORM: number;
            RGB10_A2UI: number;
            TEXTURE_IMMUTABLE_FORMAT: number;
            TEXTURE_IMMUTABLE_LEVELS: number;
            UNSIGNED_INT_2_10_10_10_REV: number;
            UNSIGNED_INT_10F_11F_11F_REV: number;
            UNSIGNED_INT_5_9_9_9_REV: number;
            FLOAT_32_UNSIGNED_INT_24_8_REV: number;
            UNSIGNED_INT_24_8: number;
            HALF_FLOAT: number;
            RG: number;
            RG_INTEGER: number;
            INT_2_10_10_10_REV: number;
            CURRENT_QUERY: number;
            QUERY_RESULT: number;
            QUERY_RESULT_AVAILABLE: number;
            ANY_SAMPLES_PASSED: number;
            ANY_SAMPLES_PASSED_CONSERVATIVE: number;
            MAX_DRAW_BUFFERS: number;
            DRAW_BUFFER0: number;
            DRAW_BUFFER1: number;
            DRAW_BUFFER2: number;
            DRAW_BUFFER3: number;
            DRAW_BUFFER4: number;
            DRAW_BUFFER5: number;
            DRAW_BUFFER6: number;
            DRAW_BUFFER7: number;
            DRAW_BUFFER8: number;
            DRAW_BUFFER9: number;
            DRAW_BUFFER10: number;
            DRAW_BUFFER11: number;
            DRAW_BUFFER12: number;
            DRAW_BUFFER13: number;
            DRAW_BUFFER14: number;
            DRAW_BUFFER15: number;
            MAX_COLOR_ATTACHMENTS: number;
            COLOR_ATTACHMENT1: number;
            COLOR_ATTACHMENT2: number;
            COLOR_ATTACHMENT3: number;
            COLOR_ATTACHMENT4: number;
            COLOR_ATTACHMENT5: number;
            COLOR_ATTACHMENT6: number;
            COLOR_ATTACHMENT7: number;
            COLOR_ATTACHMENT8: number;
            COLOR_ATTACHMENT9: number;
            COLOR_ATTACHMENT10: number;
            COLOR_ATTACHMENT11: number;
            COLOR_ATTACHMENT12: number;
            COLOR_ATTACHMENT13: number;
            COLOR_ATTACHMENT14: number;
            COLOR_ATTACHMENT15: number;
            SAMPLER_3D: number;
            SAMPLER_2D_SHADOW: number;
            SAMPLER_2D_ARRAY: number;
            SAMPLER_2D_ARRAY_SHADOW: number;
            SAMPLER_CUBE_SHADOW: number;
            INT_SAMPLER_2D: number;
            INT_SAMPLER_3D: number;
            INT_SAMPLER_CUBE: number;
            INT_SAMPLER_2D_ARRAY: number;
            UNSIGNED_INT_SAMPLER_2D: number;
            UNSIGNED_INT_SAMPLER_3D: number;
            UNSIGNED_INT_SAMPLER_CUBE: number;
            UNSIGNED_INT_SAMPLER_2D_ARRAY: number;
            MAX_SAMPLES: number;
            SAMPLER_BINDING: number;
            PIXEL_PACK_BUFFER: number;
            PIXEL_UNPACK_BUFFER: number;
            PIXEL_PACK_BUFFER_BINDING: number;
            PIXEL_UNPACK_BUFFER_BINDING: number;
            COPY_READ_BUFFER: number;
            COPY_WRITE_BUFFER: number;
            COPY_READ_BUFFER_BINDING: number;
            COPY_WRITE_BUFFER_BINDING: number;
            FLOAT_MAT2x3: number;
            FLOAT_MAT2x4: number;
            FLOAT_MAT3x2: number;
            FLOAT_MAT3x4: number;
            FLOAT_MAT4x2: number;
            FLOAT_MAT4x3: number;
            UNSIGNED_INT_VEC2: number;
            UNSIGNED_INT_VEC3: number;
            UNSIGNED_INT_VEC4: number;
            UNSIGNED_NORMALIZED: number;
            SIGNED_NORMALIZED: number;
            VERTEX_ATTRIB_ARRAY_INTEGER: number;
            VERTEX_ATTRIB_ARRAY_DIVISOR: number;
            TRANSFORM_FEEDBACK_BUFFER_MODE: number;
            MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: number;
            TRANSFORM_FEEDBACK_VARYINGS: number;
            TRANSFORM_FEEDBACK_BUFFER_START: number;
            TRANSFORM_FEEDBACK_BUFFER_SIZE: number;
            TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: number;
            MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: number;
            MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: number;
            INTERLEAVED_ATTRIBS: number;
            SEPARATE_ATTRIBS: number;
            TRANSFORM_FEEDBACK_BUFFER: number;
            TRANSFORM_FEEDBACK_BUFFER_BINDING: number;
            TRANSFORM_FEEDBACK: number;
            TRANSFORM_FEEDBACK_PAUSED: number;
            TRANSFORM_FEEDBACK_ACTIVE: number;
            TRANSFORM_FEEDBACK_BINDING: number;
            FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: number;
            FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: number;
            FRAMEBUFFER_ATTACHMENT_RED_SIZE: number;
            FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: number;
            FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: number;
            FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: number;
            FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: number;
            FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: number;
            FRAMEBUFFER_DEFAULT: number;
            DEPTH24_STENCIL8: number;
            DRAW_FRAMEBUFFER_BINDING: number;
            READ_FRAMEBUFFER_BINDING: number;
            RENDERBUFFER_SAMPLES: number;
            FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: number;
            FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: number;
            UNIFORM_BUFFER: number;
            UNIFORM_BUFFER_BINDING: number;
            UNIFORM_BUFFER_START: number;
            UNIFORM_BUFFER_SIZE: number;
            MAX_VERTEX_UNIFORM_BLOCKS: number;
            MAX_FRAGMENT_UNIFORM_BLOCKS: number;
            MAX_COMBINED_UNIFORM_BLOCKS: number;
            MAX_UNIFORM_BUFFER_BINDINGS: number;
            MAX_UNIFORM_BLOCK_SIZE: number;
            MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: number;
            MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: number;
            UNIFORM_BUFFER_OFFSET_ALIGNMENT: number;
            ACTIVE_UNIFORM_BLOCKS: number;
            UNIFORM_TYPE: number;
            UNIFORM_SIZE: number;
            UNIFORM_BLOCK_INDEX: number;
            UNIFORM_OFFSET: number;
            UNIFORM_ARRAY_STRIDE: number;
            UNIFORM_MATRIX_STRIDE: number;
            UNIFORM_IS_ROW_MAJOR: number;
            UNIFORM_BLOCK_BINDING: number;
            UNIFORM_BLOCK_DATA_SIZE: number;
            UNIFORM_BLOCK_ACTIVE_UNIFORMS: number;
            UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: number;
            UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: number;
            UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: number;
            OBJECT_TYPE: number;
            SYNC_CONDITION: number;
            SYNC_STATUS: number;
            SYNC_FLAGS: number;
            SYNC_FENCE: number;
            SYNC_GPU_COMMANDS_COMPLETE: number;
            UNSIGNALED: number;
            SIGNALED: number;
            ALREADY_SIGNALED: number;
            TIMEOUT_EXPIRED: number;
            CONDITION_SATISFIED: number;
            WAIT_FAILED: number;
            SYNC_FLUSH_COMMANDS_BIT: number;
            COLOR: number;
            DEPTH: number;
            STENCIL: number;
            MIN: number;
            MAX: number;
            DEPTH_COMPONENT24: number;
            STREAM_READ: number;
            STREAM_COPY: number;
            STATIC_READ: number;
            STATIC_COPY: number;
            DYNAMIC_READ: number;
            DYNAMIC_COPY: number;
            DEPTH_COMPONENT32F: number;
            DEPTH32F_STENCIL8: number;
            INVALID_INDEX: number;
            TIMEOUT_IGNORED: number;
            MAX_CLIENT_WAIT_TIMEOUT_WEBGL: number;
            VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE: number;
            UNMASKED_VENDOR_WEBGL: number;
            UNMASKED_RENDERER_WEBGL: number;
            MAX_TEXTURE_MAX_ANISOTROPY_EXT: number;
            TEXTURE_MAX_ANISOTROPY_EXT: number;
            COMPRESSED_RGB_S3TC_DXT1_EXT: number;
            COMPRESSED_RGBA_S3TC_DXT1_EXT: number;
            COMPRESSED_RGBA_S3TC_DXT3_EXT: number;
            COMPRESSED_RGBA_S3TC_DXT5_EXT: number;
            COMPRESSED_R11_EAC: number;
            COMPRESSED_SIGNED_R11_EAC: number;
            COMPRESSED_RG11_EAC: number;
            COMPRESSED_SIGNED_RG11_EAC: number;
            COMPRESSED_RGB8_ETC2: number;
            COMPRESSED_RGBA8_ETC2_EAC: number;
            COMPRESSED_SRGB8_ETC2: number;
            COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: number;
            COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: number;
            COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: number;
            COMPRESSED_RGB_PVRTC_4BPPV1_IMG: number;
            COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: number;
            COMPRESSED_RGB_PVRTC_2BPPV1_IMG: number;
            COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: number;
            COMPRESSED_RGB_ETC1_WEBGL: number;
            COMPRESSED_RGB_ATC_WEBGL: number;
            COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: number;
            COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: number;
            UNSIGNED_INT_24_8_WEBGL: number;
            HALF_FLOAT_OES: number;
            RGBA32F_EXT: number;
            RGB32F_EXT: number;
            FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: number;
            UNSIGNED_NORMALIZED_EXT: number;
            MIN_EXT: number;
            MAX_EXT: number;
            SRGB_EXT: number;
            SRGB_ALPHA_EXT: number;
            SRGB8_ALPHA8_EXT: number;
            FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT: number;
            FRAGMENT_SHADER_DERIVATIVE_HINT_OES: number;
            COLOR_ATTACHMENT0_WEBGL: number;
            COLOR_ATTACHMENT1_WEBGL: number;
            COLOR_ATTACHMENT2_WEBGL: number;
            COLOR_ATTACHMENT3_WEBGL: number;
            COLOR_ATTACHMENT4_WEBGL: number;
            COLOR_ATTACHMENT5_WEBGL: number;
            COLOR_ATTACHMENT6_WEBGL: number;
            COLOR_ATTACHMENT7_WEBGL: number;
            COLOR_ATTACHMENT8_WEBGL: number;
            COLOR_ATTACHMENT9_WEBGL: number;
            COLOR_ATTACHMENT10_WEBGL: number;
            COLOR_ATTACHMENT11_WEBGL: number;
            COLOR_ATTACHMENT12_WEBGL: number;
            COLOR_ATTACHMENT13_WEBGL: number;
            COLOR_ATTACHMENT14_WEBGL: number;
            COLOR_ATTACHMENT15_WEBGL: number;
            DRAW_BUFFER0_WEBGL: number;
            DRAW_BUFFER1_WEBGL: number;
            DRAW_BUFFER2_WEBGL: number;
            DRAW_BUFFER3_WEBGL: number;
            DRAW_BUFFER4_WEBGL: number;
            DRAW_BUFFER5_WEBGL: number;
            DRAW_BUFFER6_WEBGL: number;
            DRAW_BUFFER7_WEBGL: number;
            DRAW_BUFFER8_WEBGL: number;
            DRAW_BUFFER9_WEBGL: number;
            DRAW_BUFFER10_WEBGL: number;
            DRAW_BUFFER11_WEBGL: number;
            DRAW_BUFFER12_WEBGL: number;
            DRAW_BUFFER13_WEBGL: number;
            DRAW_BUFFER14_WEBGL: number;
            DRAW_BUFFER15_WEBGL: number;
            MAX_COLOR_ATTACHMENTS_WEBGL: number;
            MAX_DRAW_BUFFERS_WEBGL: number;
            VERTEX_ARRAY_BINDING_OES: number;
            QUERY_COUNTER_BITS_EXT: number;
            CURRENT_QUERY_EXT: number;
            QUERY_RESULT_EXT: number;
            QUERY_RESULT_AVAILABLE_EXT: number;
            TIME_ELAPSED_EXT: number;
            TIMESTAMP_EXT: number;
            GPU_DISJOINT_EXT: number;
        };
    };
    constants: {};
};
export default _default;
