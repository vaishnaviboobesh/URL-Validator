  /**
   * Validates if the provided input is a URL
   * @param urlInput value to validate
   * @returns {boolean}
   */
  export function isValidUrl(urlInput: string): boolean {
    try{
      new URL(urlInput);
      return true;
    }
    catch {
        return false;
    }
  }