ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

RegisterNUICallback("close", function(data, cb)
    if data.cond then
        Citizen.Wait(2000)
        DoScreenFadeOut(0)
        ShutdownLoadingScreen()
	    ShutdownLoadingScreenNui()
        Citizen.Wait(1000)
        lanzarjs('ok on client')
    end
end)

function lanzarjs (mess)
    --print(mess)
    TriggerEvent('esx_identity:executeother','ok executeother')
end