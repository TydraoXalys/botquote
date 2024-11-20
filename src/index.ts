import { Client, GatewayIntentBits, REST } from "discord.js";
import dotenv from "dotenv";
import { CommandHandler } from "./handlers/CommandHandler";
import { EventHandler } from "./handlers/EventHandler";
import { LastQuoteHandler } from "./handlers/LastQuoteHandler";

// Import of environment variables
dotenv.config();
const TOKEN: string = process.env.TOKEN || "";
const CLIENT_ID: string = process.env.CLIENT_ID || "";
const GUILD_ID: string = process.env.GUILD_ID || "";

/**
 * Main class of the application.
 */
class BotQuoteApplication {
  /**
   * Discord client associated to this application
   */
  private client: Client;

  /**
   * Discord REST API.
   */
  private rest: REST;

  /**
   * Handler that manages the last quote published by each user (if any, and if this quote hasn't been deleted).
   */
  private lastQuoteHandler: LastQuoteHandler;

  /**
   * Handler that manages custom slash commands.
   */
  private commandHandler: CommandHandler;

  /**
   * Handler that manages Discord events.
   */
  private eventHandler: EventHandler;

  /**
   * Constructor
   */
  public constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.rest = new REST().setToken(TOKEN);
    this.lastQuoteHandler = new LastQuoteHandler();
    this.commandHandler = new CommandHandler(this.lastQuoteHandler);
    this.eventHandler = new EventHandler();
  }

  /**
   * Start the application.
   */
  public start(): void {
    console.log(`\x1b[33mStarting bot...\x1b[0m`);
    this.client
      .login(TOKEN)
      .then(() => {
        this.eventHandler.initialize(this.client, this.commandHandler);
        this.commandHandler.registerSlashCommands(
          this.rest,
          CLIENT_ID,
          GUILD_ID
        );
      })
      .catch((error: any) => {
        console.error(
          `\x1b[31mError during application startup :\x1b[0m`,
          error
        );
      });
  }
}

// Script to start the application.
const app = new BotQuoteApplication();
app.start();
