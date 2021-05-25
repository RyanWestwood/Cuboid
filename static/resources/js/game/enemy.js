//  Enemy class, controls creating and adding enemy to the scene and updating the 
//  enemies position on screen.
export class Enemy {
    constructor(game, mesh) {
        this.scene = game;
        this.mesh = mesh;
        game.add(this.mesh);
    }

    //  Moves the enemy in the scene.
    update(speed) {
        this.mesh.position.x += speed;
    }

    //  Removes the enemy from the scene.
    remove() {
        this.scene.remove(this.mesh);
    }
}