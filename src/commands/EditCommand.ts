import {
  APIEmbedField,
  blockQuote,
  ChatInputCommandInteraction,
  EmbedBuilder,
  italic,
  Message,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  subtext,
} from "discord.js";
import { Command } from "./Command";
import { LastQuoteHandler } from "../handlers/LastQuoteHandler";
import { EditCommandLocalization } from "../localizations/EditCommandLocalization";

/**
 * Class associated to the /edit command.
 * @extends Command
 */
export class EditCommand extends Command {
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
   * Used to find the bot message to edit when executing the command.
   *
   * Used also to save the bot message id when executing the command.
   */
  lastQuoteHandler: LastQuoteHandler;

  /**
   * Constructor.
   * @param lastQuoteHandler Instance of last quote handler.
   */
  constructor(lastQuoteHandler: LastQuoteHandler) {
    super();
    this.name = "edit";
    this.description = "Edit the last quote you made.";
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
      .setDescriptionLocalizations(EditCommandLocalization.COMMAND_DESC)
      .addStringOption((option) =>
        option
          .setName("content")
          .setDescription("New content of the quote.")
          .setNameLocalizations(EditCommandLocalization.CONTENT_OPTION_NAME)
          .setDescriptionLocalizations(
            EditCommandLocalization.CONTENT_OPTION_DESC
          )
      )
      .addUserOption((option) =>
        option
          .setName("author")
          .setDescription("User that made the quote.")
          .setNameLocalizations(EditCommandLocalization.AUTHOR_OPTION_NAME)
          .setDescriptionLocalizations(
            EditCommandLocalization.AUTHOR_OPTION_DESC
          )
      )
      .addStringOption((option) =>
        option
          .setName("context")
          .setDescription("Additionnal context of the quote.")
          .setNameLocalizations(EditCommandLocalization.CONTEXT_OPTION_NAME)
          .setDescriptionLocalizations(
            EditCommandLocalization.CONTEXT_OPTION_DESC
          )
      );
  }

  /**
   * Extracts the different parts of the given quote message.
   * @param lastQuoteMessage Instance of Message class that represent the last quote of the user.
   * @returns Tuple that contains the different parts of the quote (content, author, context if any, timestamp).
   */
  private async extractElementsFromLastQuote(
    lastQuoteMessage: Message
  ): Promise<[string, string, string | null, string]> {
    return new Promise<[string, string, string | null, string]>(
      async (resolve, reject) => {
        try {
          const lastQuoteEmbedFields: APIEmbedField[] =
            lastQuoteMessage.embeds[0].fields;

          const subtext: string[] = lastQuoteEmbedFields[1].value
            .replace(/-# /, "")
            .split(", ");

          resolve([
            lastQuoteEmbedFields[0].value,
            subtext[0],
            subtext.length >= 3
              ? subtext.slice(1, subtext.length - 1).join(", ")
              : null,
            subtext[subtext.length - 1],
          ]);
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  /**
   * Executes the operation associated to the slash command.
   * @param interaction - Interaction that trigger the slash command.
   */
  public async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const contentOption = interaction.options.getString("content");
    const authorOption = interaction.options.getUser("author");
    const contextOption = interaction.options.getString("context");
    const lastQuote = this.lastQuoteHandler.getLastQuote(interaction.user.id);

    if (!contentOption && !authorOption && !contextOption) {
      // Case where there is no specified parameter while executing the command.
      await interaction.reply({
        content:
          EditCommandLocalization.ANSWER_NO_PARAM[interaction.locale] ??
          `You must specify at least one parameter to perform this operation.`,
        ephemeral: true,
      });
    } else if (lastQuote === "") {
      // Case where there is no editable last quote for the user.
      await interaction.reply({
        content:
          EditCommandLocalization.ANSWER_NOT_EDITABLE[interaction.locale] ??
          `
No quote created by you is currently editable.
You may have deleted the last quote you published.
          `,
        ephemeral: true,
      });
    } else if (!lastQuote) {
      // Case where there is no last quote for the user.
      await interaction.reply({
        content:
          EditCommandLocalization.ANSWER_NOT_FOUND[interaction.locale] ??
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
      const lastQuoteMessage: Message =
        await interaction.channel!.messages.fetch(lastQuote);
      const [previousContent, previousAuthor, previousContext, timestamp]: [
        string,
        string,
        string | null,
        string
      ] = await this.extractElementsFromLastQuote(lastQuoteMessage);

      const newContent = contentOption ?? previousContent;
      const newAuthor = authorOption ?? previousAuthor;
      const newContext = contextOption ?? previousContext;

      const embed: EmbedBuilder = new EmbedBuilder()
        .setColor(0x009834)
        .addFields(
          { name: " ", value: newContent },
          {
            name: " ",
            value: subtext(
              `${newAuthor}, ${newContext ? `${newContext}, ` : ""}${timestamp}`
            ),
          }
        );

      const message = await interaction.reply({
        embeds: [embed],
        fetchReply: true,
      });
      await lastQuoteMessage.delete();
      this.lastQuoteHandler.setLastQuote(interaction.user.id, message.id);
    }
  }
}
