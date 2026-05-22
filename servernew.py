import asyncio
import ssl
import pathlib
from websockets.asyncio.server import serve, broadcast

import json
import uuid


players = []


async def handle_client(websocket):
    
    try:
        userid = str(uuid.uuid4())

        player = {"id" : userid, "nickname" : "null", "position": {"x": 0, "y": 0}, "rot": 0, "velocity": {"x": 0, "y": 0}, "hero" : 0, "initialized" : 0}

        players.append(player)
        # 1. DODAJ KLIENTA DO ZBIORU
        connected_clients.add(websocket)
        
        print(f"CONNECTED: {userid}")
        await websocket.send(json.dumps({"action": "init_data", "status": 200, "userid": userid}))
        
        async for message in websocket:
            # print(f"MESSAGE from {userid}: {message}")
            try:
                msg = json.loads(message)
                match msg["action"]:
                    case "information_set":
                        player["nickname"] = msg["data"]["username"]
                        player["hero"] = msg["data"]["hero"]
                        player["initialized"] = 1
                        await websocket.send(json.dumps({"status": 200, "action": "information_set"}))
                    case "update_player":
                        if player["initialized"] == 1:
                            player["position"]["x"] = msg["data"]["position"]["x"]
                            player["position"]["y"] = msg["data"]["position"]["y"]
                            player["rot"] = msg["data"]["rot"]
                            player["velocity"]["x"] = msg["data"]["velocity"]["x"]
                            player["velocity"]["y"] = msg["data"]["velocity"]["y"]
                    case "chat_message":
                        if player["initialized"] == 1:
                            text = msg["message"]
                            broadcast(connected_clients, json.dumps({"status":200, "action":"chat_message", "content" : text, "from": player["nickname"]}))
            except Exception as ex:
                print(ex)
                await websocket.send(json.dumps({"status": 500}))
    finally:
               
        # 2. USUŃ KLIENTA PRZY ROZŁĄCZENIU
        connected_clients.remove(websocket)
        players.remove(player)
        print(f"DISCONNECTED: {userid}")








connected_clients = set()


async def main():
    # Ścieżki do Twoich nowych certyfikatów
    # Certbot zawsze zapisuje je w tym miejscu:
    #NO SSL
    # cert_path = "/etc/letsencrypt/live/wss.gregoryk07.online/fullchain.pem"
    # key_path = "/etc/letsencrypt/live/wss.gregoryk07.online/privkey.pem"

    # Konfiguracja SSL
    # ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    # ssl_context.load_cert_chain(certfile=cert_path, keyfile=key_path)

    # Uruchomienie serwera na porcie 8765 z obsługą SSL
    # async with serve(handle_client, "0.0.0.0", 8765, ssl=ssl_context):
    async with serve(handle_client, "0.0.0.0", 8765):
        print("WSS SERVER START")
        print("wss://wss.gregoryk07.online:8765\n\n")
        # await asyncio.get_running_loop().create_future()  # Działa w nieskończoność
        while True:
            try:
                    # Tutaj wpisz logikę serwera
                # print("Przetwarzam logikę...")
                
                # Przykład: rozsyłanie wiadomości do wszystkich co 5 sekund
                # if connected_clients:
                message = json.dumps({"action": "update", "players": players})
                broadcast(connected_clients, message)
                    
                # Bardzo ważne: pozwól pętli 'odetchnąć'
            except Exception as ex:
                print(ex)
            
            await asyncio.sleep(10)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\nWSS SERVER STOP")