import os
import re


def process_html_files():
    root_directory = os.path.dirname(os.getcwd())  # Or set this explicitly if needed
    for dirpath, _, filenames in os.walk(root_directory):
        for file in filenames:
            if file.endswith(".html"):
                file_path = os.path.join(dirpath, file)
                process_file(file_path, root_directory)


def get_canonical_url(file_path, root_directory):
    content_root = "https://connorpeace.com"
    relative_path = os.path.relpath(file_path, root_directory).replace("\\", "/")
    if relative_path.endswith("index.html"):
        return f"{content_root}/{os.path.dirname(relative_path)}/".rstrip("/")
    else:
        return f"{content_root}/{relative_path}".replace(".html", "")


def recreate_canonical_link(file_path, content, root_directory):
    canonical_url = get_canonical_url(file_path, root_directory)
    return re.sub(
        r'<link[^>]*?rel="canonical"[^>]*?>',
        f'<link rel="canonical" href="{canonical_url}">',
        content
    )


def clean_anchor_tags(content):
    return re.sub(
        r'<a([^>]+)href="([^"]+)\.html(/?)"',
        lambda match: f'<a{match.group(1)}href="{match.group(2)}"',
        content
    )


def process_file(file_path, root_directory):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    content = recreate_canonical_link(file_path, content, root_directory)
    content = clean_anchor_tags(content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

    print(f"Processed: {file_path}")


if __name__ == "__main__":
    process_html_files()
