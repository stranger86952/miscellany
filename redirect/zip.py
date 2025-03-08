import zipfile
import os
import sys

def build_zip(level, prefix, input_file):
    if level == 1:
        zip_name = f"{prefix}.zip"
        with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
            zipf.write(input_file, os.path.basename(input_file))
        return zip_name
    else:
        child_zip_names = []
        for i in range(level):
            child_prefix = f"zip-{level-1}-{i}"
            child_zip = build_zip(level - 1, child_prefix, input_file)
            child_zip_names.append(child_zip)
        current_zip = f"{prefix}.zip"
        with zipfile.ZipFile(current_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for f in child_zip_names:
                zipf.write(f, os.path.basename(f))
        for f in child_zip_names:
            os.remove(f)
        return current_zip

def main(input_file):
    n = 6
    final_zip = build_zip(n, f"zip-{n}", input_file)
    print(f"{final_zip} has been created.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("required format: python zip.py <your_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    if not os.path.isfile(input_file):
        print(f"'{input_file}' doesn't exist.")
        sys.exit(1)
    main(input_file)
