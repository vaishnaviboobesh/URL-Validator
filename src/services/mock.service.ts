type UrlCheckResult = {
	exists: boolean;
	urlType?: "file" | "folder";
};

 /**
  * Mocked API method that checks URL existence 
  * Assumes, ending with "/" as folder, contains "." as file
  * @param {string} urlInput - URL value to check 
  * @returns {Promise<UrlCheckResult>} - A promise with check result
  */
export function mockCheckUrl(urlInput: string, signal?: AbortSignal): Promise<UrlCheckResult> {
	return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
		if (urlInput.endsWith("/")) {
			return resolve({ exists: true, urlType: "folder" });
		} else if(urlInput.includes('.')) {
      return resolve({ exists: true, urlType: 'file'}); 
    } else {
      return resolve({ exists: false })
    }
  }, 3000);

    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    })

	});
}
