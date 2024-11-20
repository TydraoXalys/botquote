import { italic, LocalizationMap } from "discord.js";

/**
 * Class associated to the /cancel command.
 *
 * Contains the translations for the different locales of the command description and options (name and description) and the differents answers.
 */
export class CancelCommandLocalization {
  /**
   * Locales for command description.
   */
  public static COMMAND_DESC: LocalizationMap = {
    "en-GB": "Deletes the last quote you made.",
    "en-US": "Deletes the last quote you made.",
    fr: "Efface la dernière citation que vous avez effectuée.",
  };

  /**
   * Locales for the answer indicating that the last quote of the user is not editable.
   */
  public static ANSWER_NOT_EDITABLE: LocalizationMap = {
    "en-GB": `
No quote created by you is currently editable.
You may have already deleted the last quote you published.
    `,
    "en-US": `
No quote created by you is currently editable.
You may have already deleted the last quote you published.
    `,
    fr: `
Aucune citation créée par vous n'est actuellement éditable.
Vous avez peut-être déjà supprimé la dernière citation que vous avez publiée.
    `,
  };

  /**
   * Locales for the answer indicating that there is not last quote associated to the user.
   */
  public static ANSWER_NOT_FOUND: LocalizationMap = {
    "en-GB": `
No quote created by you have been found.
You may not have publish any, or the bot may have been restarted since your last quote.

${italic(
  `NB: It is not possible to edit or delete a quote that was made before a restart of the bot.`
)}
    `,
    "en-US": `
No quote created by you have been found.
You may not have publish any, or the bot may have been restarted since your last quote.

${italic(
  `NB: It is not possible to edit or delete a quote that was made before a restart of the bot.`
)}
    `,
    fr: `
Aucune citation créée par vous n'a été trouvée.
Vous n'en avez peut-être pas publié, ou le bot a peut-être été redémarré depuis la publication de dernière citation.

${italic(
  `NB : Il n'est pas possible de modifier ou de supprimer une citation publiée avant un redémarrage du bot.`
)}
    `,
  };

  /**
   * Locales for the answer indicating that the last quote has been deleted successfully
   */
  public static ANSWER_SUCCESS: LocalizationMap = {
    "en-GB": `The last quote you have made have been successfully deleted.`,
    "en-US": `The last quote you have made have been successfully deleted.`,
    fr: `La dernière citation que vous avez publiée a bien été effacée.`,
  };
}
