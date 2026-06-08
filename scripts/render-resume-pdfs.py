#!/usr/bin/env python3
import json
import os
import sys

try:
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.utils import ImageReader
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.pdfgen import canvas
except ImportError as exc:
    print(
        "Missing PDF dependency. Install reportlab and pillow, "
        "or run with RESUME_PDF_PYTHON pointing to an environment that has them.",
        file=sys.stderr,
    )
    raise SystemExit(1) from exc


PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 54
MARGIN_TOP = 52
MARGIN_BOTTOM = 52
CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2

BLUE = colors.HexColor("#1f4f82")
DARK = colors.HexColor("#101418")
BODY = colors.HexColor("#3e4949")
MUTED = colors.HexColor("#53605f")
RULE = colors.HexColor("#cfd8d3")
PHOTO_BORDER = colors.HexColor("#d8e2dd")

FONT_CANDIDATES = [
    {
        "regular": "/System/Library/Fonts/Supplemental/Arial.ttf",
        "bold": "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    },
    {
        "regular": "/Library/Fonts/Arial Unicode.ttf",
        "bold": "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    },
]

EXPERIENCE_TITLES = {
    "ru": "Опыт",
    "en": "Experience",
}


def register_fonts():
    for candidate in FONT_CANDIDATES:
        regular = candidate["regular"]
        bold = candidate["bold"]

        if os.path.exists(regular) and os.path.exists(bold):
            pdfmetrics.registerFont(TTFont("ResumeRegular", regular))
            pdfmetrics.registerFont(TTFont("ResumeBold", bold))
            return "ResumeRegular", "ResumeBold"

    return "Helvetica", "Helvetica-Bold"


FONT_REGULAR, FONT_BOLD = register_fonts()


def string_width(text, font_name, font_size):
    return pdfmetrics.stringWidth(text, font_name, font_size)


def wrap_text(text, font_name, font_size, max_width):
    words = str(text).split()
    lines = []
    current = ""

    for word in words:
        candidate = word if not current else f"{current} {word}"

        if string_width(candidate, font_name, font_size) <= max_width:
            current = candidate
            continue

        if current:
            lines.append(current)
            current = word
            continue

        lines.append(word)

    if current:
        lines.append(current)

    return lines


def draw_wrapped(canv, text, x, y, max_width, font_name, font_size, leading, color):
    lines = wrap_text(text, font_name, font_size, max_width)

    if canv:
        canv.setFont(font_name, font_size)
        canv.setFillColor(color)

        for line in lines:
            canv.drawString(x, y, line)
            y -= leading
    else:
        y -= leading * len(lines)

    return y


def draw_inline_links(canv, items, x, y, max_width):
    separator = " | "
    font_size = 9.6

    while font_size > 7.8:
        total_width = 0

        for index, item in enumerate(items):
            if index:
                total_width += string_width(separator, FONT_REGULAR, font_size)

            total_width += string_width(item["label"], FONT_REGULAR, font_size)

        if total_width <= max_width:
            break

        font_size -= 0.2

    if not canv:
        return y

    canv.setFont(FONT_REGULAR, font_size)
    canv.setFillColor(MUTED)

    cursor_x = x

    for index, item in enumerate(items):
        if index:
            canv.drawString(cursor_x, y, separator)
            cursor_x += string_width(separator, FONT_REGULAR, font_size)

        label = item["label"]
        label_width = string_width(label, FONT_REGULAR, font_size)
        canv.drawString(cursor_x, y, label)
        canv.linkURL(
            item["url"],
            (cursor_x, y - 2, cursor_x + label_width, y + font_size + 2),
            relative=0,
            thickness=0,
        )
        cursor_x += label_width

    return y


def draw_bullets(canv, items, x, y, max_width, body_size, leading):
    text_x = x + 14
    text_width = max_width - 14

    for item in items:
        text = item["text"] if isinstance(item, dict) else item
        url = item.get("url") if isinstance(item, dict) else None
        lines = wrap_text(text, FONT_REGULAR, body_size, text_width)

        if canv:
            canv.setFillColor(BLUE)
            canv.circle(x + 3, y + 3, 1.45, stroke=0, fill=1)
            canv.setFont(FONT_REGULAR, body_size)
            canv.setFillColor(BODY)

            text_y = y

            for line in lines:
                canv.drawString(text_x, text_y, line)

                if url:
                    line_width = string_width(line, FONT_REGULAR, body_size)
                    canv.linkURL(
                        url,
                        (text_x, text_y - 2, text_x + line_width, text_y + body_size + 2),
                        relative=0,
                        thickness=0,
                    )

                text_y -= leading

        y -= leading * len(lines)

    return y


def draw_experience(canv, items, x, y, max_width, body_size, leading):
    for item in items:
        title = f"{item['period']} | {item['company']} | {item['role']}"
        title_lines = wrap_text(title, FONT_BOLD, body_size + 0.6, max_width)

        if canv:
            canv.setFont(FONT_BOLD, body_size + 0.6)
            canv.setFillColor(DARK)

            title_y = y

            for line in title_lines:
                canv.drawString(x, title_y, line)
                title_y -= leading

        y -= leading * len(title_lines)
        y = draw_wrapped(
            canv,
            item["summary"],
            x,
            y,
            max_width,
            FONT_REGULAR,
            body_size,
            leading,
            BODY,
        )
        y -= 3

    return y


def draw_section(canv, title, x, y, max_width, body_size, leading, body_drawer):
    y -= 8

    if canv:
        canv.setFont(FONT_BOLD, body_size + 4.4)
        canv.setFillColor(BLUE)
        canv.drawString(x, y, title)

    y -= body_size + 7.5
    y = body_drawer(canv, x, y, max_width)
    return y - 6


def get_contact_items(site):
    return [
        {"label": site["githubLabel"], "url": site["github"]},
        {"label": site["email"], "url": f"mailto:{site['email']}"},
        {"label": site["telegramHandle"], "url": site["telegram"]},
        {"label": site["maxLabel"], "url": site["max"]},
        {"label": site["url"], "url": site["url"]},
    ]


def get_skill_bullets(content):
    selected_indices = [1, 2, 0, 4]
    groups = content["skillGroups"]
    bullets = []

    for index in selected_indices:
        if index < len(groups):
            bullets.append(", ".join(groups[index]["values"]) + ".")

    return bullets


def layout_resume(canv, root_dir, site, locale, content, sizes):
    body_size = sizes["body"]
    leading = sizes["leading"]
    intro_size = sizes["intro"]
    intro_leading = sizes["intro_leading"]
    title_size = sizes["title"]
    photo_size = 82
    top_y = PAGE_HEIGHT - MARGIN_TOP
    photo_x = PAGE_WIDTH - MARGIN_X - photo_size
    photo_y = top_y - photo_size - 3
    text_max_width = photo_x - MARGIN_X - 28
    title_y = top_y - 26
    contact_y = title_y - 24
    rule_y = min(photo_y - 16, contact_y - 26)

    if canv:
        canv.setTitle(f"{content['displayName']} CV")
        canv.setAuthor(site["name"])
        canv.setSubject(f"{content['displayName']} resume")
        canv.setFont(FONT_BOLD, title_size)
        canv.setFillColor(DARK)
        canv.drawString(MARGIN_X, title_y, content["displayName"])

        avatar_path = os.path.join(root_dir, "public/images/avatar-2026.jpg")

        if os.path.exists(avatar_path):
            canv.drawImage(
                ImageReader(avatar_path),
                photo_x,
                photo_y,
                width=photo_size,
                height=photo_size,
                preserveAspectRatio=True,
                anchor="c",
            )
            canv.setStrokeColor(PHOTO_BORDER)
            canv.setLineWidth(0.8)
            canv.rect(photo_x, photo_y, photo_size, photo_size, stroke=1, fill=0)

        draw_inline_links(canv, get_contact_items(site), MARGIN_X, contact_y, text_max_width)

        canv.setStrokeColor(RULE)
        canv.setLineWidth(0.8)
        canv.line(MARGIN_X, rule_y, PAGE_WIDTH - MARGIN_X, rule_y)

    y = rule_y - 24
    y = draw_wrapped(
        canv,
        content["summary"],
        MARGIN_X,
        y,
        CONTENT_WIDTH,
        FONT_REGULAR,
        intro_size,
        intro_leading,
        DARK,
    )
    y -= 10

    benefit_bullets = [item["summary"] for item in content["benefits"]]
    artifact_bullets = [item["title"] for item in content["artifacts"]]
    skill_bullets = get_skill_bullets(content)
    publication_bullets = [
        {
            "text": f"{item['source']}: {item['title']}, {item['date']}.",
            "url": item["url"],
        }
        for item in content["publications"]
    ]

    y = draw_section(
        canv,
        content["sections"]["impact"],
        MARGIN_X,
        y,
        CONTENT_WIDTH,
        body_size,
        leading,
        lambda c, x, section_y, width: draw_bullets(
            c, benefit_bullets, x, section_y, width, body_size, leading
        ),
    )
    y = draw_section(
        canv,
        EXPERIENCE_TITLES.get(locale, "Experience"),
        MARGIN_X,
        y,
        CONTENT_WIDTH,
        body_size,
        leading,
        lambda c, x, section_y, width: draw_experience(
            c, content["experience"], x, section_y, width, body_size, leading
        ),
    )
    y = draw_section(
        canv,
        content["sections"]["artifacts"],
        MARGIN_X,
        y,
        CONTENT_WIDTH,
        body_size,
        leading,
        lambda c, x, section_y, width: draw_bullets(
            c, artifact_bullets, x, section_y, width, body_size, leading
        ),
    )
    y = draw_section(
        canv,
        content["sections"]["skills"],
        MARGIN_X,
        y,
        CONTENT_WIDTH,
        body_size,
        leading,
        lambda c, x, section_y, width: draw_bullets(
            c, skill_bullets, x, section_y, width, body_size, leading
        ),
    )
    y = draw_section(
        canv,
        content["sections"]["expertise"],
        MARGIN_X,
        y,
        CONTENT_WIDTH,
        body_size,
        leading,
        lambda c, x, section_y, width: draw_bullets(
            c, publication_bullets, x, section_y, width, body_size, leading
        ),
    )

    return y


def choose_sizes(root_dir, site, locale, content):
    for body_size in [9.2, 9.0, 8.8, 8.6, 8.4, 8.2, 8.0]:
        sizes = {
            "title": 27,
            "intro": body_size + 1.3,
            "intro_leading": (body_size + 1.3) * 1.35,
            "body": body_size,
            "leading": body_size * 1.32,
        }
        final_y = layout_resume(None, root_dir, site, locale, content, sizes)

        if final_y >= MARGIN_BOTTOM:
            return sizes

    return sizes


def write_pdf(root_dir, site, locale, content):
    output_rel = site["cvUrls"][locale].lstrip("/")
    output_path = os.path.join(root_dir, "public", output_rel)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    sizes = choose_sizes(root_dir, site, locale, content)

    canv = canvas.Canvas(output_path, pagesize=A4)
    layout_resume(canv, root_dir, site, locale, content, sizes)
    canv.showPage()
    canv.save()
    print(output_path)


def main():
    data = json.load(sys.stdin)
    root_dir = data["rootDir"]
    site = data["site"]

    for locale in ["ru", "en"]:
        write_pdf(root_dir, site, locale, data["localizedContent"][locale])


if __name__ == "__main__":
    main()
