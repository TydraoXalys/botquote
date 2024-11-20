import { italic, LocalizationMap } from "discord.js";

/**
 * Class associated to the /edit command.
 *
 * Contains the translations for the different locales of the command description and options (name and description) and the differents answers.
 */
export class EditCommandLocalization {
  /**
   * Locales for command description.
   */
  public static COMMAND_DESC: LocalizationMap = {
    "en-GB": "Edit the last quote you made.",
    "en-US": "Edit the last quote you made.",
    fr: "Edite la dernière citation que vous avez effectuée.",
  };

  /**
   * Locales for the name of the command option associated to the content of the quote.
   */
  public static CONTENT_OPTION_NAME: LocalizationMap = {
    "en-GB": "content",
    "en-US": "content",
    fr: "contenu",
  };

  /**
   * Locales for the description of the command option associated to the content of the quote.
   */
  public static CONTENT_OPTION_DESC: LocalizationMap = {
    "en-GB": "New content of the quote.",
    "en-US": "New content of the quote.",
    fr: "Nouveau contenu de la citation.",
  };

  /**
   * Locales for the name of the command option associated to the author of the quote.
   */
  public static AUTHOR_OPTION_NAME: LocalizationMap = {
    "en-GB": "author",
    "en-US": "author",
    fr: "auteur",
  };

  /**
   * Locales for the description of the command option associated to the author of the quote.
   */
  public static AUTHOR_OPTION_DESC: LocalizationMap = {
    "en-GB": "User that made the quote.",
    "en-US": "User that made the quote.",
    fr: "Utilisateur à l'origine de la citation.",
  };

  /**
   * Locales for the name of the command option associated to the context of the quote.
   */
  public static CONTEXT_OPTION_NAME: LocalizationMap = {
    "en-GB": "context",
    "en-US": "context",
    fr: "contexte",
  };

  /**
   * Locales for the description of the command option associated to the context of the quote.
   */
  public static CONTEXT_OPTION_DESC: LocalizationMap = {
    "en-GB": "Additionnal context of the quote.",
    "en-US": "Additionnal context of the quote.",
    fr: "Contexte additionnel de la citation.",
  };

  /**
   * Locales for the answer given when no parameter is specified while calling the slash command.
   */
  public static ANSWER_NO_PARAM: LocalizationMap = {
    "en-GB": `You must specify at least one parameter to perform this operation.`,
    "en-US": `You must specify at least one parameter to perform this operation.`,
    fr: `Vous devez spécifier au moins un paramètre pour effectuer cette opération.`,
  };

  /**
   * Locales for the answer indicating that the last quote of the user is not editable.
   */
  public static ANSWER_NOT_EDITABLE: LocalizationMap = {
    "en-GB": `
No quote created by you is currently editable.
You may have deleted the last quote you published.
    `,
    "en-US": `
No quote created by you is currently editable.
You may have deleted the last quote you published.
    `,
    fr: `
Aucune citation créée par vous n'est actuellement éditable.
Vous avez peut-être supprimé la dernière citation que vous avez publiée.
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
}
