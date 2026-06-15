characters = [
    {
        name: "Mr. Tea Cup",
        health: 10,
        speed: 3,
        jump_height: 2,
        sprites :{
            size: {
                x: 16,
                y: 16
            },
            animations: {
                idle_right: [
                    "tea_man/idle_right_1.png",
                    "tea_man/idle_right_2.png"
                ],
                idle_left: [
                    "tea_man/idle_left_1.png",
                    "tea_man/idle_left_2.png"
                ],
                walk_left: [
                    "tea_man/walk_left_1.png",
                    "tea_man/walk_left_2.png"
                ],
                walk_right: [
                    "tea_man/walk_right_1.png",
                    "tea_man/walk_right_2.png"
                ],
                crouch_left: [
                    "tea_man/crouch_left.png"
                ],
                crouch_right: [
                    "tea_man/crouch_right.png"
                ],
                jump_left: [
                    "tea_man/jump_left.png"
                ],
                jump_right: [
                    "tea_man/jump_right.png"
                ]
            }
        }
    },
    {
        name: "Mr. Tea Cup",
        health: 10,
        speed: 3,
        jump_height: 2,
        sprites :{
            size: {
                x: 16,
                y: 16
            },
            animations: {
                idle_right: [
                    "tea_man/idle_right_1.png",
                    "tea_man/idle_right_2.png"
                ],
                idle_left: [
                    "tea_man/idle_left_1.png",
                    "tea_man/idle_left_2.png"
                ],
                walk_left: [
                    "tea_man/walk_left_1.png",
                    "tea_man/walk_left_2.png"
                ],
                walk_right: [
                    "tea_man/walk_right_1.png",
                    "tea_man/walk_right_2.png"
                ],
                crouch_left: [
                    "tea_man/crouch_left.png"
                ],
                crouch_right: [
                    "tea_man/crouch_right.png"
                ],
                jump_left: [
                    "tea_man/jump_left.png"
                ],
                jump_right: [
                    "tea_man/jump_right.png"
                ]
            }
        }
    }
]
characters.forEach(character => {
    keys = Object.keys(character.sprites.animations)
    keys.forEach(key => {
        character.sprites.animations[key].forEach(animation => {
            // console.log(animation);
            AssetLoader.queueLoad("assets/characters/" + animation);
        });
    })
});
AssetLoader.queueLoad("assets/backgroundpage.jpg");
AssetLoader.queueLoad("assets/ground1.png");
AssetLoader.queueLoad("assets/ground1_2.png");
AssetLoader.queueLoad("assets/ground2.png");
AssetLoader.queueLoad("assets/missing.png");
// AssetLoader.queueLoad("assets/bread.png");