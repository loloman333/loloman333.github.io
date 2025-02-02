---
title: "Minecraft Datapacks"
date: 2019-05-16
featured: true
bg-img: /assets/projects/minecraft_datapacks/banner.png
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

It's chess. In Minecraft.
The pieces are all different minecraft mobs that I found fitting for the roles. 
To move a piece you have to apply damage to it for example by hitting it or shooting it with a bow.
It will them create projections of itself on all valid squares. Hitting one of the projections logs in the move.

![Chess in Minecraft](/assets/projects/minecraft_datapacks/chesscraft.png)

While the game will make sure that white and black always take turns moving, there is no check for which player actually makes a move.
The game also doesn't handle check or checkmate and there is no en passant and no pawn promotion.
Implementing al these features would have been too much work for me back when I first uploaded this datapack (This was around my highschool finals 😧) and then I never picked it up again.

Maybe one day when I feel particulary bored I will make a little remastered edition, who knows.
Probably not though, when I take a look at the "code" now I get dizzy since it's not very funny business to implement proper control flow with `.mcfunction` files.
To do so you either have to include the condition in every command or have one seperate file for every branch of the condition.

I think it still can be fun to play a roun.d of chess like with it in Minecraft.
If you want to try it out or look through the files head over to [planetminecraft](https://www.planetminecraft.com/data-pack/chesscraft-chess-in-minecraft/) to download it! 💚

### [Pathfinding](https://www.planetminecraft.com/data-pack/pathfinding-4547841/)

This datapack is even nerdier 🤓.
I implemented two dimensional pathfinding. One can set the start and the end node of the path, choose an algorithm along with some other settings and then let the search begin!
In the background I execute the desired algorithm by spawning a bunch of entities, one for each block that is searched on until the end marker is found.

Depending on the setting the entities will either be armor stands for visualization or invisible area effect clouds for performance. 
I included Dijkstras Algorithm, Best First Search and A-Star once with manhattan and once with euclidean distance measurement. 
If all this makes no sense to you but you are interested in the topic i can recommend [this source](https://clementmihailescu.github.io/Pathfinding-Visualizer/).

![Pathfinding in Minecraft: Best First](/assets/projects/minecraft_datapacks/pathfinding_best_first.png) ![Pathfinding in Minecraft: A*](/assets/projects/minecraft_datapacks/pathfinding_a_star.png)

All together this was very enjoyable to implement compared to Chesscraft.
To make it maybe a bit more useful or at least fun I also included the options to let a chicken follow the path once it is found 🐔.

Again if you want to give it a try out browse the files head over to feel free to head over to [planetminecraft](https://www.planetminecraft.com/data-pack/pathfinding-4547841/)! 💚
