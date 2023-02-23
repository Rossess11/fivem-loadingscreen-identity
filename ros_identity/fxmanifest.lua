fx_version 'adamant'

game 'gta5'

description 'Rossess Identity'

version '1.2.0'

server_scripts {
	'@es_extended/locale.lua',
	'@mysql-async/lib/MySQL.lua',
	'server/main.lua'
}

client_scripts {
	'@es_extended/locale.lua',
	'client/main.lua'
}

ui_page 'html/index.html'

files {
	'html/*'
}

dependency 'es_extended'
