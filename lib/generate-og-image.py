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

chip_text = "flashlegalfunding.com"
chip_bbox = draw.textbbox((0, 0), chip_text, font=f_chip)
cw = chip_bbox[2] - chip_bbox[0]
ch = chip_bbox[3] - chip_bbox[1]
pad_x, pad_y = 22, 12
chip_x = 60
chip_y = H - 60 - (ch + pad_y * 2)
draw.rounded_rectangle(
    (chip_x, chip_y, chip_x + cw + pad_x * 2, chip_y + ch + pad_y * 2),
    radius=999,
    fill=(255, 255, 255, 235),
)
draw.text((chip_x + pad_x, chip_y + pad_y - 4), chip_text, font=f_chip, fill=BRAND_DARK)

phone_text = "(859) 81-FLASH"
phone_bbox = draw.textbbox((0, 0), phone_text, font=f_chip)
pw = phone_bbox[2] - phone_bbox[0]
ph = phone_bbox[3] - phone_bbox[1]
phone_x = chip_x + cw + pad_x * 2 + 16
draw.rounded_rectangle(
    (phone_x, chip_y, phone_x + pw + pad_x * 2, chip_y + ph + pad_y * 2),
    radius=999,
    fill=(0, 165, 156, 230),
)
draw.text((phone_x + pad_x, chip_y + pad_y - 4), phone_text, font=f_chip, fill=WHITE)

img.save("assets/og-image.png", "PNG", optimize=True)
print(f"wrote assets/og-image.png  {img.size}")
