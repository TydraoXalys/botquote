import {
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

/**
 * Abstract class representing a Slash command of the Discord bot.
 */
export abstract class Command {
  /**
   * Slash command name. Must be unique.
   */
  abstract name: string;

  /**
   * Slash command description.
   */
  abstract description: string;

  /**
   * Slash command configuration with options only.
   */
  abstract config: SlashCommandOptionsOnlyBuilder;

  /**
   * Initializes the slash command configuration property.
   * @returns Slash command configuration.
   */
  protected abstract initConfig(): SlashCommandOptionsOnlyBuilder;

  /**
   * Executes the operation associated to the slash command.
   * @param interaction - Interaction that trigger the slash command.
   */
  public abstract execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void>;
}
