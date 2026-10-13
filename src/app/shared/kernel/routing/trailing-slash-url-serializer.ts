import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';

/**
 * Serializes router URLs with a trailing slash (/insumos-para-cafeterias/ instead of
 * /insumos-para-cafeterias) so every routerLink href matches the canonical URL and the static
 * host does not have to answer with an extra 301 (IIS redirects /folder -> /folder/).
 *
 * - serialize: adds "/" to non-root paths that do not end in "/" and do not look like a file
 *   (last segment without an extension), keeping ?query and #fragment after it.
 * - parse: strips the trailing slash before parsing, so routes match exactly as before.
 */
@Injectable()
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    return super.parse(stripTrailingSlash(url));
  }

  override serialize(tree: UrlTree): string {
    return addTrailingSlash(super.serialize(tree));
  }
}

function splitUrl(url: string): { path: string; rest: string } {
  const i = url.search(/[?#]/);
  return i === -1 ? { path: url, rest: '' } : { path: url.slice(0, i), rest: url.slice(i) };
}

export function stripTrailingSlash(url: string): string {
  const { path, rest } = splitUrl(url);
  if (path.length <= 1) return url;
  return path.replace(/\/+$/, '') + rest;
}

export function addTrailingSlash(url: string): string {
  const { path, rest } = splitUrl(url);
  if (!path || path === '/' || path.endsWith('/')) return url;
  const last = path.slice(path.lastIndexOf('/') + 1);
  if (/\.[a-z0-9]{2,5}$/i.test(last)) return url; // file-like (e.g. /sitemap.xml)
  return path + '/' + rest;
}
