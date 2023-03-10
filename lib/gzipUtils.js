import { promisify } from "util";
import { gunzip, gzip } from "zlib";

const gzipAsync = promisify(gzip);

const gunzipAsync = promisify(gunzip);

export const decompress = async (content) => {
  const buf = Buffer.from(content, 'base64');
  const result = await gunzipAsync(buf);
  return JSON.parse(result.toString());
}

export const compress = async (data) => {
  const dataJson = JSON.stringify(data);
  const buffer = Buffer.from(dataJson);
  const result = await gzipAsync(buffer);
  return result.toString('base64');
};