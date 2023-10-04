/**
 * Get latest comics update
 * @returns {Promise<Object>}
 */
export declare const latest: () => Promise<object>;
/**
 * Get comics data by query
 * @param {String} query
 * @returns {Promise<object>}
 */
export declare const search: (query: string) => Promise<object>;
/**
 * get comic details
 * @param {String} url
 * @returns {Promise<Object>}
 */
export declare const detail: (url: string) => Promise<object>;
declare const komikcast: {
    search: (query: string) => Promise<object>;
    detail: (url: string) => Promise<object>;
    latest: () => Promise<object>;
};
export default komikcast;
//# sourceMappingURL=index.d.ts.map