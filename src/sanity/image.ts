import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (!builder) {
    return { width: () => ({ height: () => ({ url: () => "" }) }), url: () => "" } as any;
  }
  return builder.image(source);
}
