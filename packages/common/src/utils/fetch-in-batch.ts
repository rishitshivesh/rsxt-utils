type FetchBatcherOptions = {
    limit?: number;
    mapper?: (res: Response, url: string) => Promise<any>; // custom result parsing
};

export async function fetchInBatches(
    urls: string[],
    options: FetchBatcherOptions = {}
): Promise<any[]> {
    const {limit = 5, mapper = (res: Response) => res.json()} = options;
    const results: any[] = new Array(urls.length);
    let index = 0;

    async function worker() {
        while (index < urls.length) {
            const i = index++;
            try {
                const res = await fetch(urls[i]);
                results[i] = await mapper(res, urls[i]);
            } catch (err) {
                results[i] = null; // optional: throw or track error
            }
        }
    }

    const workers = Array.from({length: Math.min(limit, urls.length)}, () => worker());
    await Promise.all(workers);

    return results;
}
