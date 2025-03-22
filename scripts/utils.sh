COMMIT_TEMPLATE_FILE="$(dirname "$0")/commit-message-template.html"
FILE_URL="file://$COMMIT_TEMPLATE_FILE"

check_commit_template() {
  if [ -f "$COMMIT_TEMPLATE_FILE" ]; then
    echo "You can view the commit message template here: $FILE_URL"
  else
    echo "Error: Commit template file not found at $COMMIT_TEMPLATE_FILE."
    exit 1
  fi
}

check_internet_connection() {
  if curl -s --head http://www.google.com/ | grep "200 OK" > /dev/null; then
    return 0
  else
    return 1
  fi
}


open_in_browser() {
  local file="$1"
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$file" >/dev/null 2>&1
  elif command -v open >/dev/null 2>&1; then
    open "$file"
  elif command -v start >/dev/null 2>&1; then
    start "" "$file"
  else
    echo "Error: No suitable command to open the file in the browser found."
    exit 1
  fi
}
