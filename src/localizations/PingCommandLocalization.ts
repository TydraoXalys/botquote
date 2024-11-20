import { LocalizationMap } from "discord.js";

/**
 * Class associated to the /ping command.
 *
 * Contains the translations for the different locales of the command description and options (name and description) and the differents answers.
 */
export class PingCommandLocalization {
  /**
   * Locales for command description.
   */
  public static COMMAND_DESC: LocalizationMap = {
    "en-GB": "Pings the bot. Useful to check if it is active.",
    "en-US": "Pings the bot. Useful to check if it is active.",
    fr: "Ping le bot. Utile pour vérifier que celui-ci est actif.",
  };
}
