# Dev's Full Stack Nightmare - A Makers Academy Final Project

A Makers project for week 11-12, Engineering Project III. Created by Amelia, Ash, Dan, Fiona & Will.

## Initial approach

# Summary

- So as our final project during our time in Makers, we were grouped together with the intention of creating some form of a game, which I believe was everybody's top choice and preference when it came to this project. Needless to say the entire had some background in gaming, and were extremely passionate about creating something that reflected that.
- We spent the first day of our time agreeing on what our approach and working standards would be, and then began to pitch ideas to create a product.
- The overall game came from a combination of features thrown around, such as platforming, map making, turn based battle, text based story/fantasy etc. We somewhat compromised on the platforming part to be map exploring, and quickly put together a game format that would include every other feature.
- We somewhat compromised on the platforming part to be map exploring, and quickly put together a game format that would include every other feature.
- We collectively agreed upon the technology and frameworks we plan to use to develop the game, and there are some new ones in there for quite a few people which proved to be both exciting and a great learning experience!
- The concept and story was decided late into the project, but since we had named our bosses and enemies this point (as well as their abilities) after some of our biggest blockers so far, we opted to keep it that way, and build the story around that!

# Technologies

- Javascript (Most previous projects had been done in Ruby, and the group was keen to develop their second language further)
- Node
- Express
- Cypress
- P5.js library (Most of our game takes place on this sketch, and we were very keen to learn and try this out, needless to say it was a blast and we were able to get really creative with it!)
- Postgres

# User Stories MVP

These were the user stories that our game was built around. Here were the ones that we deemed essential to achieve a basic minimum viable product (MVP).

```
As a bored individual (at work),
so that I can pass time,
I want to be able to play a fun game,
```

```
As a player,
so that I can feel intrigued,
I want to be able to explore a  map
```

```
As a player,
so that I be challenged,
I want to be able to battle an enemy
```

```
As a player,
so that I can gauge my progress,
I want to see mine and my enemy's health
```

```
As a player,
so that I can see how well I've done,
I want to be able to see I've won or lost
```

# Additional User Stories

In addition, we also created another batch of "nice to have" features which we hoped to add to the game once we had the MVP working. We certainly did not expect to be able to get all of these into the game in time for its release, and were pleasantly suprised that we did in fact, manage to cover all of these user stories (and even some more!).

```
As a player,
so that I can win the battle,
I want to be able to select abilities
```

```
As a player,
so that I can maximise the fun,
I want to face different enemies
```

```
As a player,
so that I can see how well I've done vs other players,
I want to be able to see a leaderboard
```

```
As a player,
so that I can see how well I've done vs other players,
I want to be able to see a leaderboard
```

```
As a player,
so that I can see how well I've done compared to previous attemps,
I want to be able to see my last few results
```

```
As a player,
To increase replayability,
I want the map to be different each time
```

# Database Setup

```
CREATE DATABASE the_game;
CREATE DATABASE the_game_test;
CREATE TABLE scores(id SERIAL PRIMARY KEY, username VARCHAR(200), score integer);
```

# Graphical copyright attribution

- Map floor tiles sourced from https://opengameart.org/content/sci-fi-interior-tiles : Copyright/Attribution Notice:
  NOT REQUIRED, Buch https://opengameart.org/users/buch or http://blog-buch.rhcloud.com;
  Surrounding map tiles sourced from https://3dtextures.me/2020/09/30/sci-fi-floor-001/ : Copyright/Attribution Notice: All textures on this site are licensed as CC0. \*See https://3dtextures.me/about/ for further details on f.a.q./textures license.
- Original music and sounds