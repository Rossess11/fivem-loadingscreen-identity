resource_manifest_version "77731fab-63ca-442c-a67b-abc70f28dfa5"
description "Rossess Loading Screen"
version "1.0"

loadscreen_manual_shutdown "yes"

loadscreen_cursor 'yes'

loadscreen 'html/index.html'

client_script 'client.lua'

files {
    "html/*"
}