# Solstra × Vesper Commerce — 1-Hour Delivery Mockup

A **demo mockup** showing a DTC beverage storefront with **one-hour delivery via Gopuff +
DoorDash** built in natively.

**Solstra is a fictional brand.** It exists only to demo the Vesper Commerce one-hour
delivery experience without using a real brand's identity. The name, palette, copy, flavours,
pricing and can artwork are all invented. Nothing here represents a real product or a real
retail footprint.

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Homepage with the 1-hour delivery band, live address check, "How it works", flavour lineup, and a ⚡ 1-hr tag on every product card |
| `solstra-now.html` | "Solstra Now" on-demand collection — single cans and 4-packs at shelf price |
| `product.html` | PDP with a third purchase option next to Subscribe / Buy Once: **⚡ 1-Hour Delivery** |
| `checkout.html` | Shop-style checkout combining standard shipping tiers with 1-hour delivery |

## Artwork

The cans are vector, not photography — `assets/can-*.svg`, generated from a single
parameterised template so all five flavours share one silhouette and lockup. The variety
pack inlines three copies rather than referencing the other files, because an SVG loaded
through `<img>` is sandboxed and will not fetch external resources.

Palette is plum (`#2B1B34`) with an amber accent (`#E0A33C`).

## Coverage figures

The 222 locations / 88.7M reach / 185 metros figures on the homepage match the companion
Solstra coverage page, so the two artifacts tell the same story. Those figures are
illustrative sample data.
