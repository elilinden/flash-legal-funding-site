#!/usr/bin/env python3
"""Generate a 1200x630 Open Graph image for Flash Legal Funding."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BRAND = (59, 91, 255)
BRAND_DARK = (26, 27, 77)
INK = (17, 21, 58)
ACCENT = (0, 165, 156)
WHITE = (255, 255, 255)

img = Image.new("RGB", (W, H), BRAND_DARK)
px = img.load()
for y in range(H):
    t = y / H
    r = int(BRAND_DARK[0] * (1 - t) + BRAND[0] * t * 0.55)
    g = int(BRAND_DARK[1] * (1 - t) + BRAND[1] * t * 0.55)
    b = int(BRAND_DARK[2] * (1 - t) + BRAND[2] * t * 0.55)
    for x in range(W):
        px[x, y] = (r, g, b)

draw = ImageDraw.Draw(img, "RGBA")

draw.ellipse((-260, -260, 360, 360), fill=(59, 91, 255, 60))
draw.ellipse((W - 320, H - 380, W + 320, H + 380), fill=(0, 165, 156, 55))

bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
reg = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
f_logo = ImageFont.truetype(bold, 44)
f_head = ImageFont.truetype(bold, 70)
f_sub = ImageFont.truetype(reg, 32)
f_chip = ImageFont.truetype(bold, 24)

logo = Image.open("assets/logo.png").convert("RGBA")
ratio = 56 / logo.height
logo = logo.resize((int(logo.width * ratio), 56), Image.LANCZOS)
img.paste(logo, (60, 60), logo)

headline_lines = [
    "Pre-Settlement Funding",
    "for Personal Injury Cases",
]
y = 200
for line in headline_lines:
    draw.text((60, y), line, font=f_head, fill=WHITE)
    y += 84

draw.text(
    (60, y + 16),
    "Non-recourse cash advances. No credit check.",
    font=f_sub,
    fill=(220, 228, 255),
)
draw.text(
    (60, y + 56),
    "If you lose your case, you owe $0.",
    font=f_sub,
    fill=(220, 228, 255),
)

f_cta = ImageFont.truetype(bold, 30)

cta_text = "Apply Now →"
cta_bbox = draw.textbbox((0, 0), cta_text, font=f_cta)
ctw = cta_bbox[2] - cta_bbox[0]
cth = cta_bbox[3] - cta_bbox[1]
cta_pad_x, cta_pad_y = 32, 18
cta_x = 60
cta_y = H - 60 - (cth + cta_pad_y * 2)
draw.rounded_rectangle(
    (cta_x, cta_y, cta_x + ctw + cta_pad_x * 2, cta_y + cth + cta_pad_y * 2),
    radius=999,
    fill=WHITE,
)
draw.text(
    (cta_x + cta_pad_x, cta_y + cta_pad_y - 6),
    cta_text,
    font=f_cta,
    fill=BRAND,
)

info_text = "flashlegalfunding.com  ·  (859) 81-FLASH"
info_bbox = draw.textbbox((0, 0), info_text, font=f_chip)
iw = info_bbox[2] - info_bbox[0]
ih = info_bbox[3] - info_bbox[1]
info_x = cta_x + ctw + cta_pad_x * 2 + 24
info_y = cta_y + (cth + cta_pad_y * 2 - ih) // 2 - 4
draw.text((info_x, info_y), info_text, font=f_chip, fill=(220, 228, 255))

img.save("assets/og-image.png", "PNG", optimize=True)
print(f"wrote assets/og-image.png  {img.size}")
