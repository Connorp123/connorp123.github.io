import os
import re

def process_html_files():
    """
    Process all .html files in the root directory, removing ".html" from <a href="..."> links.
    """
    root_directory = os.getcwd()  # Repository root
    for file in os.listdir(root_directory):
        if file.endswith(".html"):
            file_path = os.path.join(root_directory, file)
            process_file(file_path)

def process_file(file_path):
    """
    Modify the file to remove ".html" from href attributes of <a> tags.
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    updated_content = re.sub(
        r'<a([^>]+)href="([^"]+)\.html"',
        lambda match: f'<a{match.group(1)}href="{match.group(2)}"',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)
    print(f"Processed: {file_path}")

if __name__ == "__main__":
    process_html_files()