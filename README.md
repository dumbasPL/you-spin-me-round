# you-spin-me-round

A discord bot that repeatedly moves a user between two voice channels.  
Created as a replacment for the teamspeak poke feature (since you can still hear the sound of beeing moved between channels even when muted)

## running

Set the `CLIENT_TOKEN` to your newly created discord bot token and run as any other nodejs project or use the `Dockerfile` to run in dokcer

## commands

NOTE: only users with the administrator permission have access to the commands

- `s!spin <@user> <chanel1> <chanel2>`: start "spin" (channel 1 and 2 need to be provided as IDs. Right click -> copy ID)
- `s!stop <@user>`: stop "spinning" a user. Note: a user can not stop the spin of himself so if an admin forgets about it then the user is fucked XD

# Disclamer

This is a meme bot created for me and my friends, it has many bugs, uses old versions of almost everything, 
and unless you are willing to read the code I would recommend against trying to use it.
