source "$(dirname "$0")/utils.sh"

check_commit_template

if check_internet_connection; then
  ts-node "$(dirname "$0")/commit-tense-check.ts" "$1" || {
    echo "Commit message tense error. Please refer to the guidelines in your browser."
    open_in_browser "$COMMIT_TEMPLATE_FILE"
    exit 1
  }
else
  echo "No internet connection. Cannot perform commit message tense check."
  exit 1
fi
