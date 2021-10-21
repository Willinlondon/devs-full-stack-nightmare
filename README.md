# Dev's Full Stack Nightmare - A Makers Academy Final Project

A Makers project for week 11-12, Engineering Project III. Created by Amelia, Ash, Dan, Fiona & Will.

## Initial approach

# Summary

- As our final project for Makers, we were grouped together with the mission to create a game. This was the whole group's top choice of subject. We all had an interest in gaming and were extremely passionate about creating something that reflected that.
- We spent the first day of this two week task devising a team charter to ensure that every team member's needs and learning goals could be met, pitching ideas for a product, and choosing the best tech stack for the job.
- Our final idea was an amalgam of features thrown around in this planning session. We discussed platforming, map making, turn based battle, text based story/fantasy etc.
- Everyone on the team contributed ideas which made it in to the final design, which was really satisfying.
- We collectively agreed upon the technology and frameworks we planned to use to develop the game, including some that were new to all of us, which proved to be both exciting and a great learning experience.
- The concept and story were not chosen until well into the project. During development, we had vented our frustrations (and made each other laugh) by naming our enemy characters after some of our biggest blockers as software development students. In the end we decided to keep them around and build the whole story around that theme!

# Technologies

- Javascript (Most previous projects had been done in Ruby, and the group was keen to develop their second language further)
- Node
- Express
- Cypress
- P5.js library (Most of our game takes place on this sketch, and we were very keen to learn and try this out, needless to say it was a blast and we were able to get really creative with it!)
- Postgres
- Heroku

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
