# BotQuote v1.0.0

## Description

A bot for Discord that enable you to make and embed quotes from your server's members.

Made by TydraoXalys.

[Installation](#installation)

1. [Discord application creation](#discord-application-creation)
2. [Creation of .env file](#creation-of-env-file)
3. [Run](#run)
   - [Running via Docker (recommended)](#running-via-docker-recommended)
   - [Running using NodeJS directly](#running-using-nodejs-directly)

[Use](#use)

## Installation

It is a _self-hosted_ application. That means that you have to run it by yourself.

### Discord application creation

The first step is to create your own application on the [Discord Developer Portal](https://discord.com/developers/applications).

If you don't know how to do it, simply follow theses steps :

1. Log on to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click on `New Application`
3. Give a name to your application and create it
4. In the `SETTINGS` menu, go to `Bot` section and give a name to your bot.
5. Add your bot on your server :

   1. In the `SETTINGS` menu, go to the `OAuth2` section
   2. In `OAuth2 URL Generator`, check `bot` and `applications.commands`
   3. Configure the permissions of you bot
   4. Copy the link at the bottom in the search bar of your browser and go to the corresponding page
   5. Choose your server

And that's it ! :)

### Creation of .env file

Before starting the bot, you have to create a `.env` file that will contain some environment variables.

First, make a copy of the [.env_sample](./.env_sample) file at the project's root and rename this copy `.env`. Then, complete it by giving to each variable its corresponding value.

If you don't know where can you get each variable :

- The `TOKEN` variable correspond to your bot token. To get it :

  1. Go on your application page on [Discord Developer Portal](https://discord.com/developers/applications)
  2. In the `SETTINGS` menu, go to `Bot` section
  3. Click on `Reset Token`.
  4. Copy the generated token
  5. Paste it to the `TOKEN` variable in `.env` file

- The `CLIENT_ID` variable correspond to the id of your Discord application. To get it :

  1. Go on your application page on [Discord Developer Portal](https://discord.com/developers/applications)
  2. In the `SETTINGS` menu, go to `General information` section
  3. Search the `Application ID` and copy it
  4. Paste it to the `CLIENT_ID` variable in `.env` file

- The `GUILD_ID` variable correspond to the id of your Discord server. To get it :

  1. If not already done, enable the developer mode in your personnal Discord settings
  2. Right-click on your Discord server icon
  3. Click on `Copy Server ID`
  4. Paste it to the `GUILD_ID` variable in `.env` file

### Run

#### Running via Docker (recommended)

Make sure you have Docker and Docker compose installed.

Then, simply run the following command at the repository root :

```shell
docker compose up -d    # Use -d option to detach the execution from your terminal.
```

Check if the bot is active :

```shell
docker ps               # Use -a option to display active AND inactive Docker containers.
```

Here are some useful commands :

```shell
docker ps                       # Give information on your Docker containers such as their name or their id.

docker start <NAME_OR_ID>       # Start the bot using container name or id.
docker restart <NAME_OR_ID>     # Restart the bot using container name or id.
docker stop <NAME_OR_ID>        # Stop the bot using container name or id.

docker logs <NAME_OR_ID>        # Print the logs of the application using container name or id.

# The following commands needs to be executed at this project root.
docker compose up -d            # Create the container and start the bot.
docker compose down             # Stop the bot and remove the container.
```

#### Running using NodeJS directly

Install NodeJS version 22. You can download it [here](https://nodejs.org/en/download/package-manager).

Then execute the following command to start the bot in production mode :

```shell
npm install     # First time or update only
npm run build   # First time or update only
npm run start
```

## Use

The Bot has three main slash commands :

| Command   | Description                                                                         |
| --------- | ----------------------------------------------------------------------------------- |
| `/quote`  | Creates a new formatted quote                                                       |
| `/edit`   | Edits the last quote you have created (if any, and if it hasn't been deleted yet)   |
| `/cancel` | Deletes the last quote you have created (if any, and if it hasn't been deleted yet) |

The `/ping` command is just to make sure the bot is active from Discord servers.
