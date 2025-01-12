import os
import re

def process_html_files():
    """
    Process all .html files in the root directory and subdirectories,
    modifying URLs in <a> and <link> tags.
    """
    root_directory = os.getcwd()  # Repository root
    for dirpath, _, filenames in os.walk(root_directory):
        for file in filenames:
            if file.endswith(".html"):
                file_path = os.path.join(dirpath, file)
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

    # Process <a> tags
    content = re.sub(
        r'<a([^>]+)href="([^"]+)\.html(/?)"',
        lambda match: f'<a{match.group(1)}href="{match.group(2)}"',
        content
    )

    # Process <link> tags
    content = re.sub(
        r'<link([^>]+)href="([^"]+)\.html(/?)"',
        lambda match: f'<link{match.group(1)}href="{match.group(2)}"',
        content
    )

    # Remove trailing slashes from all URLs
    content = re.sub(
        r'(<(?:a|link)[^>]+href="[^"]+?)/"',
        lambda match: match.group(1) + '"',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Processed: {file_path}")

if __name__ == "__main__":
    process_html_files()
