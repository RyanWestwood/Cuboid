import {
    DirectionalLight,
    AmbientLight
} from '../../../vendor/three/build/three.module.js';

//  Creates a directional light with an optional intensity and colour.
export const getDirectionalLight = (c, i) => {
    var light = new DirectionalLight(c, i);
    light.castShadow = true;
    return light
}

//  Creates an ambient light with optional intensity and colour.
export const getAmbientLight = (c, i) => {
    var light = new AmbientLight(c, i);
    return light
}

