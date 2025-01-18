# fbtv
📺Télécommande Freebox Révolution 3.0 !

La télécommande était posée trop loin sur la table basse...
J'ai trouvé sur le net une url pour chatouiller la box :
http://192.168.0.44/pub/remote_control?code=12345678&key=1
http://192.168.0.44/pub/remote_control?code=12345678&key=ok
http://192.168.0.44/pub/remote_control?code=12345678&key=left
http://192.168.0.44/pub/remote_control?code=12345678&key=mute
http://192.168.0.44/pub/remote_control?code=12345678&key=power

L'IP est celle de votre player Freebox
le code=12345678 est votre code personnel de votre télécommande Freebox (dispo depuis le menu de la freeox sur la TV dans paramètre/système)

C'est parti, je me lance dans le dév de ma propre télécommande en local sur mon Nas.
J'ai donc créé un masque de boutons simulant la télécommande...
Les commandes (API) sont envoyées par un script PHP.

L'étape suivante était de récupérer les infos des chaines dispos depuis la freebox :

1ere étape : 



