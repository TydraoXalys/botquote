/**
 * Class that manages the last quote of each user.
 */
export class LastQuoteHandler {
  /**
   * Map that associates the user id to the corresponding last quote id.
   */
  private lastQuoteMap: Map<string, string>;

  /**
   * Constructor.
   */
  constructor() {
    this.lastQuoteMap = new Map<string, string>();
  }

  /**
   * Add or update the last quote associated to the given user.
   * @param userId Id of the user who made the quote.
   * @param quoteId Id of the message instance associated to the quote.
   */
  public setLastQuote(userId: string, quoteId: string): void {
    this.lastQuoteMap.set(userId, quoteId);
  }

  /**
   * Getter of a last quote associated to the given user.
   * @param userId Id of the user who made the quote.
   * @returns Id of the message instance associated to the quote.
   */
  public getLastQuote(userId: string): string | undefined {
    return this.lastQuoteMap.get(userId);
  }
}
