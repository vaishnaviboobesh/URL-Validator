 
 /**
  * Delays the execution of the given function
  * @param {T} func - The function to be delayed with execution
  * @param {number} delay - Delay in ms
  * @returns {(...args: Parameters<T>) => void} The debounced function
  */
 export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: number | undefined;

    return (...args: Parameters<T>) => {
      if (timer){
       clearTimeout(timer); 
      }

      timer = setTimeout(() => {
        func(...args)
      }, delay);
    }
  }