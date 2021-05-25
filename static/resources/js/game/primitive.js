import {
    CylinderGeometry,
    BoxGeometry,
    MeshPhongMaterial,
    SphereGeometry,
    Mesh,
    Object3D
} from '../../../vendor/three/build/three.module.js';

//  Creates a cylinder with the specified parameters.
//  Mesh is made up of geometry and a matrial. 
//  Set to recieve shadows.
export const getCylinder = (r, h, s, c) => {
    var geometry = new CylinderGeometry(r, r, h, s);
    var material = new MeshPhongMaterial({
        color: c,
    });
    var mesh = new Mesh(geometry, material);
    mesh.receiveShadow = true;
    return mesh;
}

//  Creates a box with the specified parameters.
//  Mesh is made up of geometry and a matrial. 
//  Uses default parameters. So the enemies dont need to add
//  a texture.
export const getBox = (w, h, d, c, s, t = null) => {
    var geometry = new BoxGeometry(w, h, d);
    var material = new MeshPhongMaterial({
        color: c,
        map: t
    });
    var mesh = new Mesh(geometry, material);
    mesh.castShadow = s;
    return mesh;
}

export const getSphere = (r, ws, hs, c, s, t = null) => {
    var geometry = new SphereGeometry(r,ws,hs);
    var material = new MeshPhongMaterial({
        color: c,
        map: t
    });
    var mesh = new Mesh(geometry, material);
    mesh.castShadow = s;
    return mesh;
}

export const getCloud = (colour) => {
  var cloud = new Object3D;

  for(let i = 0; i < 5; i++){
    let cloudPart = getSphere(0.5,16,16,colour, false);
    cloudPart.position.set(Math.random(), 0, -0.5 + (i*0.5) ); 
    cloud.add(cloudPart);
  }

  for(let i = 0; i < 15; i++){
    let cloudPart = getSphere(Math.random() * 0.75,16,16,colour, false);
    cloudPart.position.set(Math.random(),Math.random() * .75, Math.random()); 
    cloudPart.rotateX(Math.random() * 1.5);
    cloudPart.rotateY(Math.random() * 1.5);
    cloudPart.rotateZ(Math.random() * 1.5);
    cloud.add(cloudPart);
  }
  
  let cloudPart = getSphere(0.5,16,16,0xeeeeee, false);
  cloud.add(cloudPart);

  return cloud;
}