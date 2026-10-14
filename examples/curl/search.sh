#!/usr/bin/env bash
set -euo pipefail
: "${GALAXY_API_KEY:?Set GALAXY_API_KEY to your API key first}"
curl --get 'https://api.galaxysapi.com/api/search_note_v1' \
  --header "Authorization: ${GALAXY_API_KEY}" \
  --data-urlencode "keyword=${1:-咖啡}" \
  --data-urlencode 'page=1' \
  --data-urlencode 'page_size=20' \
  --connect-timeout 10 --max-time 60 --fail-with-body
