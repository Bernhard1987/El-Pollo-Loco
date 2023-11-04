const level1 = new Level(
    [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        // new Endboss(4030)
    ],

    [
        new Cloud(-720, 2),
        new Cloud(0, 1),
        new Cloud(720, 2),
        new Cloud(720*2, 1),
        new Cloud(720*3, 2),
        new Cloud(720*4, 1),
        new Cloud(720*5, 2),
        new Cloud(720*6, 1),
        new Cloud(720*7, 2)
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
        new CollectableBottle(100, 360),
        new CollectableBottle(150, 360),
        new CollectableBottle(200, 360),
        new CollectableBottle(250, 360),
        new CollectableBottle(300, 360),
        new CollectableBottle(350, 360),
        new CollectableBottle(400, 360),
        new CollectableBottle(450, 360),
        new CollectableBottle(500, 360),
        new CollectableBottle(550, 360),
        new CollectableBottle(500, 200),
        new CollectableBottle(550, 200),
        new CollectableBottle(500, 100),
        new CollectableBottle(550, 100),
        new CollectableCoin(700, 160),
        new CollectableCoin(600, 340),
        new CollectableCoin(800, 160),
        new CollectableCoin(900, 160),
        new CollectableCoin(1000, 160)
    ]
);