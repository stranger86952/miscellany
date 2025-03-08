import os

def generate_index_html():
    current_dir = os.getcwd()
    directories = [d for d in os.listdir(current_dir) if os.path.isdir(os.path.join(current_dir, d))]

    base_url = "https://stranger86952.github.io/miscellany/"

    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory Listing</title>
</head>
<body>
    <h1>Directory Listing</h1>
    <ul>
"""
    for directory in directories:
        if directory == ".git":
            continue
        directory_url = f"{base_url}{directory}/"
        html_content += f"        <li><a href=\"{directory_url}\">{directory}</a></li>\n"
    html_content += """    </ul>
</body>
</html>
"""

    with open("index.html", "w", encoding="utf-8") as file:
        file.write(html_content)

if __name__ == "__main__":
    generate_index_html()
