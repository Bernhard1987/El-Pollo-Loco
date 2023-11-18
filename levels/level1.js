let level1 = [];

function initLevel() {
level1 = new Level(
    [
        new Chicken(0),
        new Chicken(0),
        new Chicken(0),
        new ChickenSmall(0),
        new ChickenSmall(0),
        new ChickenSmall(0),
        new Chicken(720),
        new Chicken(720),
        new ChickenSmall(900),
        new ChickenSmall(900),
        new ChickenSmall(1800),
        new ChickenSmall(1800),
        new ChickenSmall(1800),
        new Chicken(2000),
        new Chicken(2000),
        new ChickenSmall(2500),
        new ChickenSmall(2500),
        new ChickenSmall(2500),
        new ChickenSmall(2500),
        new ChickenSmall(2500),
        new Endboss(4030)
    ],

    [
        new Cloud(-720, 2),
        new Cloud(0, 1),
        new Cloud(720, 2),
        new Cloud(720 * 2, 1),
        new Cloud(720 * 3, 2),
        new Cloud(720 * 4, 1),
        new Cloud(720 * 5, 2),
        new Cloud(720 * 6, 1),
        new Cloud(720 * 7, 2)
    ],

    [
        new BackgroundObject('./assets/img/5_background/layers/air.png', -719, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719, 0),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0, 0),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719, 0),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 2, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 4, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 4, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 4, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 4, 0),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 5, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 5, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 5, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 5, 0),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 6, 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 6, 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 6, 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 6, 0)
    ],
    [
        new CollectableCoin(100, 340),
        new CollectableBottle(200, 360),
        new CollectableBottle(250, 360),
        new CollectableBottle(300, 360),
        new CollectableBottle(350, 360),
        new CollectableCoin(400, 340),
        new CollectableBottle(500, 360),
        new CollectableCoin(600, 340),
        new CollectableCoin(600, 160),
        new CollectableCoin(700, 340),
        new CollectableBottle(850, 360),
        new CollectableCoin(1000, 340),
        new CollectableCoin(1000, 160),
        new CollectableCoin(1100, 340),
        new CollectableCoin(1200, 160),
        new CollectableCoin(1250, 340),
        new CollectableBottle(1300, 360),
        new CollectableBottle(1350, 360),
        new CollectableBottle(1400, 360),
        new CollectableCoin(1500, 160),
        new CollectableCoin(1500, 80),
        new CollectableBottle(1750, 360),
        new CollectableCoin(1750, 160),
        new CollectableCoin(1800, 80),
        new CollectableCoin(1850, 100),
        new CollectableCoin(1900, 160),
        new CollectableBottle(2000, 360),
        new CollectableBottle(2050, 360),
        new CollectableBottle(2100, 360),
        new CollectableCoin(2600, 340),
        new CollectableCoin(3000, 160),
        new CollectableCoin(3000, 340),
        new CollectableBottle(3050, 360),
        new CollectableBottle(3100, 360),
        new CollectableBottle(3150, 360),
        new CollectableBottle(3200, 360),
        new CollectableBottle(3500, 360),
        new CollectableCoin(3650, 340)
    ]
);
}