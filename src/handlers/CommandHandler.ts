import {
  ChatInputCommandInteraction,
  GuildChannel,
  REST,
  Routes,
} from "discord.js";
import { Command } from "../commands/Command";
import { PingCommand } from "../commands/PingCommand";
import { QuoteCommand } from "../commands/QuoteCommand";
import { LastQuoteHandler } from "./LastQuoteHandler";
import { EditCommand } from "../commands/EditCommand";
import { CancelCommand } from "../commands/CancelCommand";

/**
 * Class that manages registered slash commands.
 */
export class CommandHandler {
  /**
   * Registered slash commands
   */
  private commands: Command[];

  /**
   * Constructor.
   * @param lastQuoteHandler Instance of last quote handler used by slash commands.
   */
  public constructor(lastQuoteHandler: LastQuoteHandler) {
    this.commands = [
      new PingCommand(),
      new QuoteCommand(lastQuoteHandler),
      new EditCommand(lastQuoteHandler),
      new CancelCommand(lastQuoteHandler),
    ];
  }

  /**
   * Register the existing slash commands.
   * @param rest Discord REST API.
   * @param clientId Bot application identifier.
   * @param guildId Discord server id.
   */
  public registerSlashCommands(
    rest: REST,
    clientId: string,
    guildId: string
  ): void {
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: this.commands.map((command: Command) => command.config.toJSON()),
      })
      .then((data: any) =>
        console.log(
          `\x1b[32mSuccessfully registered ${data.length} slash commands.\x1b[0m`
        )
      )
      .catch((error: any) =>
        console.error(
          `\x1b[31mError during slash commands setup :\x1b[0m`,
          error
        )
      );
  }

  /**
   *
   * @param interaction Interaction triggered by the use of a slash command.
   * @returns Rejected promise if the slash command does not exist.
   */
  public async handle(interaction: ChatInputCommandInteraction): Promise<any> {
    const matchedCommand = this.commands.find(
      (command) => command.name === interaction.commandName
    );

    if (matchedCommand) {
      console.log(
        `\x1b[33m${interaction.user.tag} in #${
          (interaction.channel as GuildChannel).name
        } triggered ${interaction}.\x1b[0m`
      );
      matchedCommand
        .execute(interaction)
        .then(() => {
          console.log(
            `\x1b[32mCommand /${interaction.commandName} successfully executed.\x1b[0m`
          );
        })
        .catch((error) =>
          console.error(
            `\x1b[31mError during /${interaction.commandName} command execution :\x1b[0m`,
            error
          )
        );
    } else {
      return Promise.reject(`Command /${interaction.commandName} not found.`);
    }
  }
}
