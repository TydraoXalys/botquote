import {
  ChatInputCommandInteraction,
  italic,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import { Command } from "./Command";
import { LastQuoteHandler } from "../handlers/LastQuoteHandler";
import { CancelCommandLocalization } from "../localizations/CancelCommandLocalization";

/**
 * Class associated to the /cancel command.
 * @extends Command
 */
export class CancelCommand extends Command {
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
   * Reference to the last quote handler.
   *
   * Used to find the bot message to delete when executing the command.
   */
  lastQuoteHandler: LastQuoteHandler;

  /**
   * Constructor.
   * @param lastQuoteHandler Instance of last quote handler.
   */
  constructor(lastQuoteHandler: LastQuoteHandler) {
    super();
    this.name = "cancel";
    this.description = "Deletes the last quote you made.";
    this.config = this.initConfig();
    this.lastQuoteHandler = lastQuoteHandler;
  }

  /**
   * Initializes the slash command configuration property.
   * @returns Slash command configuration.
   */
  protected initConfig(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .setDescriptionLocalizations(CancelCommandLocalization.COMMAND_DESC);
  }

  /**
   * Executes the operation associated to the slash command.
   * @param interaction - Interaction that trigger the slash command.
   */
  public async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const lastQuote = this.lastQuoteHandler.getLastQuote(interaction.user.id);

    if (lastQuote === "") {
      // Case where there is no deletable last quote for the user.
      await interaction.reply({
        content:
          CancelCommandLocalization.ANSWER_NOT_EDITABLE[interaction.locale] ??
          `
No quote created by you is currently editable.
You may have already deleted the last quote you published.
          `,
        ephemeral: true,
      });
    } else if (!lastQuote) {
      // Case where there is no last quote for the user.
      await interaction.reply({
        content:
          CancelCommandLocalization.ANSWER_NOT_FOUND[interaction.locale] ??
          `
No quote created by you have been found.
You may not have publish any, or the bot may have been restarted since your last quote.

${italic(
  `NB: It is not possible to edit or delete a quote that was made before a restart of the bot.`
)}
          `,
        ephemeral: true,
      });
    } else {
      // Default case
      const lastQuoteMessage = await interaction.channel!.messages.fetch(
        lastQuote
      );
      await lastQuoteMessage.delete();
      this.lastQuoteHandler.setLastQuote(interaction.user.id, "");

      await interaction.reply({
        content:
          CancelCommandLocalization.ANSWER_SUCCESS[interaction.locale] ??
          `The last quote you have made have been successfully deleted.`,
        ephemeral: true,
      });
    }
  }
}
