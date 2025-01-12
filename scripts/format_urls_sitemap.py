import os
import re

def process_sitemap():
    """
    Process all .html files in  sitemap.xml
    """
    root_directory = os.getcwd()  # Repository root
    file_path = os.path.join(root_directory, "sitemap.xml")
    process_file(file_path)

def process_file(file_path):
    """
    Modify the file to:
    1. Remove ".html" from href attributes of <a> tags.
    2. Remove ".html" from href attributes of <link> tags.
    3. Strip trailing forward slashes from URLs.
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Strip .html from <loc> tags
    content = re.sub(
        r'<loc>(.+)\.html(/?)</loc>',
        lambda match: f'<loc>{match.group(1)}</loc>',
        content
    )

    # Strip trailing slashes from <loc> tags
    content = re.sub(
        r'<loc>(.+)/</loc>',
        lambda match: f'<loc>{match.group(1)}</loc>',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Processed: {file_path}")

if __name__ == "__main__":
    process_sitemap()
