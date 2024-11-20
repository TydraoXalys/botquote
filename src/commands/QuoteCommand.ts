import {
  blockQuote,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  subtext,
  time,
  TimestampStyles,
} from "discord.js";
import { Command } from "./Command";
import { QuoteCommandLocalization } from "../localizations/QuoteCommandLocalization";
import { LastQuoteHandler } from "../handlers/LastQuoteHandler";

/**
 * Class associated to the /quote command.
 * @extends Command
 */
export class QuoteCommand extends Command {
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
   * Used to save the bot message id when executing the command.
   */
  lastQuoteHandler: LastQuoteHandler;

  /**
   * Constructor.
   * @param lastQuoteHandler Instance of last quote handler.
   */
  constructor(lastQuoteHandler: LastQuoteHandler) {
    super();
    this.name = "quote";
    this.description = "Creates and formats a quote.";
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
      .setDescriptionLocalizations(QuoteCommandLocalization.COMMAND_DESC)
      .addStringOption((option) =>
        option
          .setName("content")
          .setDescription("Content of the quote.")
          .setNameLocalizations(QuoteCommandLocalization.CONTENT_OPTION_NAME)
          .setDescriptionLocalizations(
            QuoteCommandLocalization.CONTENT_OPTION_DESC
          )
          .setRequired(true)
      )
      .addUserOption((option) =>
        option
          .setName("author")
          .setDescription("User that made the quote.")
          .setNameLocalizations(QuoteCommandLocalization.AUTHOR_OPTION_NAME)
          .setDescriptionLocalizations(
            QuoteCommandLocalization.AUTHOR_OPTION_DESC
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("context")
          .setDescription("Additionnal context of the quote.")
          .setNameLocalizations(QuoteCommandLocalization.CONTEXT_OPTION_NAME)
          .setDescriptionLocalizations(
            QuoteCommandLocalization.CONTEXT_OPTION_DESC
          )
      );
  }

  /**
   * Executes the operation associated to the slash command.
   * @param interaction - Interaction that trigger the slash command.
   */
  public async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const content = interaction.options.getString("content")!;
    const author = interaction.options.getUser("author")!;
    const context = interaction.options.getString("context");
    const timestamp = time(new Date(), TimestampStyles.ShortDateTime);

    const embed: EmbedBuilder = new EmbedBuilder().setColor(0x009834).addFields(
      { name: " ", value: content },
      {
        name: " ",
        value: subtext(
          `${author}, ${context ? `${context}, ` : ""}${timestamp}`
        ),
      }
    );

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    this.lastQuoteHandler.setLastQuote(interaction.user.id, message.id);
  }
}
