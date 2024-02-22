---
title: "Minecraft Datapacks"
date: 2019-05-16
featured: true
bg-img: /assets/img/projects/q_learning/bg.png
caption: "Chess and Pathfinding"
tags:  [Minecraft, Code, Chess, Pathfinding]
---

Yes, this is nerdy Minecraft content feel free to leave if you're not interested in that 😎

### What are Datapacks?
I guess I don't have to explain Minecraft to you if you clicked this project, but the concept of datapacks might not be familiar to everyone.
Basically a datapack is a folder one can add to their Minecraft save to further customize their experience in the game.
This includes adding custom functions, advancements, dimensions, items, recipes, biomes and much more.
In many ways for the user this can feel like installing a mod. The differences lie in the implementation and the capabilities.
Mods are written in Java and have to be installed with a mod loader, while datapacks are "written" in various Minecraft specific files, mostly in json or mcfunction format.
Generally mods are more powerful and datapacks are  more lightweight and easier to "install".
[Here](https://minecraft.fandom.com/wiki/Data_pack) you can read more if you're interested.

### What did I do?
I mostly used `.mcfunction` files for my datapacks. With these files one can group [commands](https://minecraft.fandom.com/wiki/Commands) together and also have some of them be executed every tick in the game.
This means that both projects could have been done with only command blocks as well. 
Using a datapack made it a lot easier to implement and share with others and probably also helps with performance.
But enough of this, what's the deal?

### [Chesscraft](https://www.planetminecraft.com/data-pack/chesscraft-chess-in-minecraft/)
![Chesscraft](assets/img/projects/minecraft_datapacks/chesscraft.png)
It's chess. In Minecraft.
The pieces are all different minecraft mobs that I found fitting for the roles. 
To move a piece you have to apply damage to a it for example by hitting it or shooting it with a bow.
It will them create projections of itself on all valid squares and hitting one of the projections logs in the move.

While the game will make sure white and black always take turns moving, there is no check for which player actually makes a move.
The game also doesn't handle check or checkmate and there is no en passant and no pawn promotion.
Implementing those would have been too much work for me back when I first uploaded this datapack (This was around my highschool finals 😧) and then I never picked it up again.

Maybe one day when I feel particulary bored I will make a little remastered edition, who knows.
Probably not though, when I take a look at the "code" now I get dizzy since it's not very funny business to implement proper control flow with `.mcfunction` files.
To do so you either have to include the condition in every command or have one seperate file for every branch of the condition.

I think it still can be fun to play a round of chess like with it in Minecraft.
If you want to try it out or look through the files head over to [planetminecraft](https://www.planetminecraft.com/data-pack/chesscraft-chess-in-minecraft/) to download it! 💚

### [Pathfinding](https://www.planetminecraft.com/data-pack/pathfinding-4547841/)
TODO
