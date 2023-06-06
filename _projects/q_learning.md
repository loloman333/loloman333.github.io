---
title: "Q-Learning Implementation"
date: 2023-01-02
featured: true
bg-img: TODO
caption: "Cart Pole & TORCS"
---

### Q-Learning, what's that?
Well to make it short it's a very simple method of reinforcement learning, which again is a whole category of machine learning methods based on the idea of rewarding desired behaviour of an agent and/or punishing undesired one to make it learn.

Still too abstract? I made a [series of three short videos](https://youtube.com/playlist?list=PLQjdzNIQ02PC2lrqGmNFA2jpRazE82PM7) for university, explaining reinforcement learning and later Q-Learning in more detail. ~~Alternatively you could just search it on the web, there are probably better explanations.~~

In this project I implemented Q-Learning and applied it to two applications.

### The Cart Pole Balancing Problem 

This application is part of [gym](https://www.gymlibrary.dev/), a standard API for reinforcement learning in python.

The premise is simple: There is a cart with a pole on top and we need to keep it balanced by moving the cart left and right.

![Cart Pole Demo](/assets/img/projects/q_learning/cart-pole.gif)

For details of the implementation and results you can check out the following links:
- [Youtube](https://youtu.be/-htcoaKumxc) 
- [Github](https://github.com/loloman333/Cart-Pole-Q-Learning)

### The Open Race Car Simulator (TORCS)

According to their [website](https://torcs.sourceforge.net/), TORCS is " a highly portable multi platform car racing simulation" that "is used as ordinary car racing game, as AI racing game and as research platform".

While all that is probably true, I have to say that it can be a bit tricky to set up and get everything running, especially if you want to use python as client language.

![TORCS Demo](/assets/img/projects/q_learning/torcs.gif)

Again, I'll spare you (and me) the details and leave you two links for details:
- [Youtube](https://youtu.be/tN3eY_rLinA) 
- [Github](https://github.com/loloman333/TORCS-Q-Learning) (It's probably a mess)
