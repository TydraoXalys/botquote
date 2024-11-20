import { LocalizationMap } from "discord.js";

/**
 * Class associated to the /quote command.
 *
 * Contains the translations for the different locales of the command description and options (name and description) and the differents answers.
 */
export class QuoteCommandLocalization {
  /**
   * Locales for command description.
   */
  public static COMMAND_DESC: LocalizationMap = {
    "en-GB": "Creates and formats a quote.",
    "en-US": "Creates and formats a quote.",
    fr: "Crée et formatte une citation.",
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
    "en-GB": "Content of the quote.",
    "en-US": "Content of the quote.",
    fr: "Contenu de la citation.",
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
}
