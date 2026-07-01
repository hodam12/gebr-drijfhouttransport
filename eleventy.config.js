import Image from "@11ty/eleventy-img";
import * as yaml from "js-yaml";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  // admin/index.html is een kant-en-klaar statisch bestand (de CMS-editor),
  // dit mag Eleventy niet als template proberen te verwerken.
  eleventyConfig.ignores.add("src/admin/index.html");

  // Eén foto-bron (uit assets/img-full of een upload via de CMS) wordt hier
  // automatisch verkleind + naar webp omgezet, zodat een beheerder nooit zelf
  // meerdere formaten hoeft te maken.
  async function optimize(src, widths) {
    return Image(src, {
      widths,
      formats: ["webp", "jpeg"],
      outputDir: "_site/assets/optimized/",
      urlPath: "/assets/optimized/",
    });
  }

  eleventyConfig.addAsyncShortcode("afbeelding", async function (src, alt, opties = {}) {
    if (!src) return "";
    let metadata = await optimize(src, opties.widths || [480, 960, 1600]);
    let htmlOpties = {
      alt: alt || "",
      decoding: "async",
      sizes: opties.sizes || "100vw",
    };
    if (opties.klasse) htmlOpties.class = opties.klasse;
    if (opties.eager) {
      htmlOpties.fetchpriority = "high";
    } else {
      htmlOpties.loading = "lazy";
    }
    return Image.generateHTML(metadata, htmlOpties);
  });

  // Zet een bestandspad zoals "src/assets/uploads/icoon.svg" (zo slaat de CMS
  // het op) om naar het webadres "/assets/uploads/icoon.svg". Gebruikt voor
  // kleine afbeeldingen (zoals icoontjes) die niet via eleventy-img geschaald
  // hoeven te worden.
  eleventyConfig.addFilter("url", function (src) {
    if (!src) return "";
    return src.replace(/^src\//, "/");
  });

  eleventyConfig.addAsyncShortcode("galerijFoto", async function (src, alt) {
    if (!src) return "";
    let metadata = await optimize(src, [560, 1280]);
    let thumb = Image.generateHTML(metadata, {
      alt: alt || "",
      loading: "lazy",
      decoding: "async",
      sizes: "(min-width: 700px) 560px, 100vw",
    });
    let webpFormats = metadata.webp;
    let volledigeFoto = webpFormats[webpFormats.length - 1].url;
    return `<button class="gallery-item reveal" data-full="${volledigeFoto}">${thumb}</button>`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
