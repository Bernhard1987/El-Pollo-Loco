class CollectableObject extends MovableObject {
    collectedBottlesCount = 0;
    collectedCoinsCount = 0;

    collect_sound = new Audio('./assets/sound/pickup.mp3');
    collect_sound_volume = 0.4;
    
    constructor() {
        super();
        this.setSoundVolume();
    }

    hit() {
        this.collect_sound.play();
    }
}