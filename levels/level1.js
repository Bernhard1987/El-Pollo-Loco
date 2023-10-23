const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        //new Endboss()
    ],

    [
        new Cloud(-720, 2),
        new Cloud(0, 1),
        new Cloud(720, 2),
        new Cloud(720*2, 1),
        new Cloud(720*3, 2)
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
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 4, 0)
    ],
    [
        new CollectableCoin(100, 340),
        new CollectableCoin(150, 340),
        new CollectableCoin(200, 340),
        new CollectableCoin(250, 340),
        new CollectableCoin(400, 160),
        new CollectableBottle(450, 360),
        new CollectableBottle(500, 360),
        new CollectableBottle(550, 360),
        new CollectableBottle(600, 360),
        new CollectableBottle(650, 360)
    ]
);