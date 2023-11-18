/**
 * Class representing the end boss that extends MovableObject.
 */
class Endboss extends MovableObject {
    /**
     * @property {number} width - The width of the end boss.
     * @property {number} height - The height of the end boss.
     * @property {number} x - The initial x-coordinate of the end boss.
     * @property {number} y - The initial y-coordinate of the end boss.
     * @property {number} offsetX - The offset along the x-axis used for collision detection.
     * @property {number} offsetY - The offset along the y-axis used for collision detection.
     * @property {number} collisionStartOffsetY - The offset to start collision along the y-axis.
     * @property {number} damage - The amount of damage the end boss deals on collision.
     * @property {number} maxHealth - The maximum health points of the end boss.
     * @property {number} speed - The horizontal movement speed of the end boss.
     * @property {number} isHurtImgDuration - The duration of the hurt animation in seconds.
     * @property {boolean} bossTriggered - Flag indicating if the boss has been triggered.
     * @property {boolean} walk - Flag indicating if the end boss is walking.
     * @property {number} moveLeftInterval - The interval ID for the left movement.
     * @property {number} stopAndRoarInterval - The interval ID for stopping and roaring.
     * @property {string[]} IMAGES_WALKING - Array of file paths for walking animation images.
     * @property {string[]} IMAGES_DEAD - Array of file paths for dead animation images.
     * @property {string[]} IMAGES_ALERT - Array of file paths for alert animation images.
     * @property {string[]} IMAGES_HURT - Array of file paths for hurt animation images.
     * @property {string[]} IMAGES_ATTACK - Array of file paths for attack animation images.
     * @property {Audio} sound_enemy - Audio object for enemy sounds.
     * @property {Audio} sound_dead - Audio object for dead sounds.
     * @property {Audio} sound_roar - Audio object for roar sounds.
     * @property {number} sound_enemy_volume - Volume level for enemy sounds.
     * @property {number} sound_dead_volume - Volume level for dead sounds.
     * @property {Audio} walking_sound - Audio object for walking sounds.
     * @property {Audio} walking_sound_2 - Additional audio object for walking sounds.
     * @property {number} walking_sound_volume - Volume level for walking sounds.
     * @property {number} speedY - The vertical speed of the end boss.
     * @property {number} jumpSpeedY - The vertical speed when jumping.
     * @property {number} acceleration - The acceleration due to gravity.
     * @property {number} floorCoord - The y-coordinate of the floor or ground.
     * @property {number} health - The health points of the end boss.
     * @property {number} lastHit - The timestamp of the last hit on the end boss.
     * @property {boolean} walkingSoundPlayed - Flag indicating if the walking sound has been played.
     * @property {boolean} collision - Flag indicating if collision detection is enabled.
     * @property {boolean} soundOn - Flag indicating if sound is enabled.
     * @property {Array} objectIntervals - An array to store interval IDs for object-specific intervals.
     */
    width = 255; //aspect-ratio 0.85
    height = 300;
    x = 4500;
    y = 170;
    offsetX = -40;
    offsetY = -70;
    collisionStartOffsetY = 24;
    damage = 1;
    maxHealth = 800;
    speed = 4;
    isHurtImgDuration = 0.5;

    bossTriggered = false;
    walk = true;

    moveDuration = 2000;
    stopDuration = 1500;
    moveLeftInterval;
    stopAndRoarInterval;

    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    sound_enemy = new Audio('./assets/sound/boss-bok.mp3');
    sound_dead = new Audio('./assets/sound/boss-dead.mp3');
    sound_roar = new Audio('./assets/sound/boss-roar.mp3');
    sound_enemy_volume = 0.3;
    sound_dead_volume = 0.3;

    walking_sound = new Audio('./assets/sound/boss_walk1.mp3');
    walking_sound_2 = new Audio('./assets/sound/boss_walk2.mp3');
    walking_sound_volume = 0.7; //0.7

    /**
     * Creates an instance of the Endboss class.
     * @param {number} startX - The initial x-coordinate of the end boss.
     */
    constructor(startX) {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.setSoundVolume();
        this.animate();
        this.health = this.maxHealth;
        this.x = startX;
    }

    /**
     * Initiates the animation of the end boss based on its state (hurt, walking, alert).
     */
    animate() {
        let animate = setInterval(() => {
            if (this.isHurt()) {
                this.animateImages(this.IMAGES_HURT);
            } else if (this.bossTriggered && this.walk) {
                this.animateImages(this.IMAGES_WALKING);
            } else {
                this.animateImages(this.IMAGES_ALERT);
            }
        }, 1000 / 6);

        this.pushToObjectInterval(animate);
    }

    /**
     * Triggers the boss, initiating movement, sound, and intervals.
     */
    triggerBoss() {
        this.playBossRoar();
        this.playWalkingSound();
        this.setMovementTiming();
        this.moveLeft();
        this.stopAndRoar();
    }

    /**
     * Sets the timing for movement intervals.
     */
    setMovementTiming() {
        setInterval(() => {
            if (!this.walk) {
                setTimeout(() => {
                    this.walk = true;
                    this.moveLeft();
                }, this.stopDuration);
            } else {
                setTimeout(() => {
                    this.walk = false;
                    this.stopAndRoar();
                }, this.moveDuration);
            }
        }, this.stopDuration + this.moveDuration);
    }

    /**
     * Stops movement and initiates a roar sound.
     */
    stopAndRoar() {
        if (!this.walk) {
            this.playBossRoar();
            clearInterval(this.moveLeftInterval);
        }
    }

    /**
     * Initiates the left movement interval.
     */
    moveLeft() {
        clearInterval(this.stopAndRoarInterval);
        this.moveLeftInterval = setInterval(() => {
            if (this.walk) {
                super.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Plays the chicken sound for the boss.
     */
    chickenSound() {
        this.sound_enemy.play();
    }

    /**
     * Plays the dead sound for the boss.
     */
    playSoundDead() {
        this.sound_dead.play();
    }

    /**
     * Plays the boss roar sound.
     */
    playBossRoar() {
        this.sound_roar.play();
    }

    /**
     * Plays the walking sound based on the walking flag.
     */
    playWalkingSound() {
        let playWalkingSound = setInterval(() => {
            if (this.walk) {
                this.walkingSound();
            }
        }, 400);
        this.pushToObjectInterval(playWalkingSound);
    }
}