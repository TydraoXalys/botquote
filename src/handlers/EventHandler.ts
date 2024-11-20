import { ChatInputCommandInteraction, Client, Events } from "discord.js";
import { CommandHandler } from "./CommandHandler";

/**
 * Class that manages Discord events.
 */
export class EventHandler {
  /**
   * Constructor.
   */
  public constructor() {}

  /**
   * Initialize the behavior of the bot when receiving an event.
   * @param client Discord client instance associated to the bot.
   * @param commandHandler CommandHandler instance.
   */
  public initialize(client: Client, commandHandler: CommandHandler): void {
    client.once(Events.ClientReady, (readyClient) =>
      console.log(`\x1b[32mReady! Logged in as ${readyClient.user.tag}.\x1b[0m`)
    );

    client.on(Events.InteractionCreate, (interaction) => {
      if (interaction instanceof ChatInputCommandInteraction) {
        commandHandler.handle(interaction as ChatInputCommandInteraction);
      }
    });
  }
}
