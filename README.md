# fbtv
📺**Télécommande Freebox Révolution 3.0**

## Génèse
La télécommande était posée trop loin sur la table basse...
J'ai trouvé sur le net une url pour chatouiller la box :
C'est parti, je me lance dans le dév de ma propre télécommande en local sur mon Nas.
J'ai donc créé un masque de boutons simulant la télécommande...
Les commandes (API) sont envoyées par un script PHP.

La fameuse URL magique (faite le test dans votre navigateur !) : 
> http://192.168.0.44/pub/remote_control?code=12345678&key=mute

L'IP est celle de votre player Freebox (44 chez moi)
le code=12345678 est votre code personnel de votre télécommande Freebox (dispo depuis le menu de la freeox sur la TV dans paramètre/système)

![alt text](http://82.66.189.112/fbtv/screens/ScreenshotMain.png)


## Liste des "key"

| key  | Action |
| ------------- | ------------- |
| power  | On/Off  |
| home  | Freebox  |
| 0-9  | Numéro  |
| vol_inc vol_dec | Volume + -  |
| mute  | sourdine  |
| prgm_inc prgm_dec | Programme + - |
| red blue green yellow | Touches de couleurs |
| bwd fwd  | arrière avant  |
| play  | lecture/pause  |
| rec  | enregistrement  |
| tv  | Active la TV  |
| replay  | Freebox Replay  |
| netflix  | netflix  |
| youtube  | youtube  |
| canalvod  | canal vod  |
| ???  | Amazon Prime Video (introuvable😭) |
| records  | Enregistrements  |
| media  | Médias  |
| radios  | Radios  |
| back  | backspace (mode clavier) |
| delete  | suppression (mode clavier) |
| back  | backspace (mode clavier) |
| Space  | espace (mode clavier) |
| a-z A-Z  | a-z A-Z (mode clavier) |
| bonjour (sans espace)  | bonjour (mode clavier) |

Note : pour activer la chaine 180 vous devez envoyer '1', '8', '0' avec quelques millisecondes pour simuler la saisie.
la commande key=180 n'est pas reconnue !

![alt text](http://82.66.189.112/fbtv/screens/ScreenshotSpecial.png)

J'ai developpé des petits scripts, par exemple : Activer le mode PIP : 
'green','down','down','down','right','ok','ok'

## Fetch Feebox API
L'étape suivante était de récupérer les infos des chaines dispos depuis la freebox, les urls utilisées :
> http://mafreebox.freebox.fr/api/v6/tv/channels

Liste des chaines, mais pas de numero 😭... des codes des chaines au format : uuid-XXX
Solution : 
> http://mafreebox.freebox.fr/api/v8/tv/bouquets

Liste des bouquets, sélection du NumBouquet avec name==='Freebox TV'
> http://mafreebox.freebox.fr/api/v3/tv/bouquets/[NumBouquet]/channels

Liste des chaines, avec les numéros et des codes des chaines au format : uuid-XXX
Bingo, on peut faire le lien entre les 2 listes avec uuid-XXX

J'ai construit ma variable listeChaines finale :
| clé | référence | contenu |
| ------------- | ------------- | ------------- |
|nb| chaine.number | Numéro de la chaine|
|pub| chaine.pub_service | True/False chaine public|
|abo| channel.has_abo | True/False chaine avec abonnement|
|name| channel.short_name | Nom court de la chaine|
|img| channel.logo_url | Url du logo de la chaine (stocké sur la freebox 😎!)|

Cette liste est stockée est local storage pour ne pas faire tout ce travail à chauqe chargement...

## Gestion des programmes

J'ai ajouter les prgrammes en cours via les service offert par :
> https://xmltv.digital3d.com/swagger/index.html

![alt text](http://82.66.189.112/fbtv/screens/ScreenshotChaines.png)

J'ai désormais les programmes de chaque chaines (disponilbes sur la freebox) en temps réel...

## Quelques liens interessants      
> https://github.com/Aymkdn/assistant-freebox-cloud/wiki/Player-API#lancer-un-m%C3%A9dia--une-application
> https://dev.freebox.fr/sdk/os/
> http://mafreebox.freebox.fr/api/v8/player/1/api/v6/status/ (on doit petre connecté préalablement sur http://mafreebox.freebox.fr)
> http://mafreebox.freebox.fr/freeboxtv/playlist.m3u (url dispo du flux vidéo au format rtsp)
> http://mafreebox.freebox.fr/api_version
> http://mafreebox.freebox.fr/api/v8/tv/bouquets/
> http://mafreebox.freebox.fr/api/v3/tv/bouquets/582/channels
> http://mafreebox.freebox.fr/api/v6/tv/channels/
> https://github.com/JRBANCEL/FreeboxLogin (compliqué... si qqun peut m'aider, je serai ravi de récupérer le statut de la freebox : allumée/éteinte, chaine en cours...)

## La suite...

J'espère que mon code vous aidera à avancer sur votre projet !
