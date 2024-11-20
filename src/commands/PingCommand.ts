import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import { Command } from "./Command";
import { PingCommandLocalization } from "../localizations/PingCommandLocalization";

/**
 * Class associated to the /ping command.
 * @extends Command
 */
export class PingCommand extends Command {
  /**
   * Slash command name. Must be unique.
   */
  name: string;

  /**
   * Slash command description.
   */
  description: string;

  /**
   * Slash command configuration with options only.
   */
  config: SlashCommandOptionsOnlyBuilder;

  /**
   * Constructor.
   */
  constructor() {
    super();
    this.name = "ping";
    this.description = "Pings the bot. Useful to check if it is active.";
    this.config = this.initConfig();
  }

  /**
   * Initializes the slash command configuration property.
   * @returns Slash command configuration.
   */
  protected initConfig(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .setDescriptionLocalizations(PingCommandLocalization.COMMAND_DESC);
  }

  /**
   * Executes the operation associated to the slash command.
   * @param interaction - Interaction that trigger the slash command.
   */
  public async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await interaction.reply("Pong!");
  }
}
