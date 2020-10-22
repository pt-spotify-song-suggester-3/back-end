# back-end
Spotify Song Suggester 3 Back End

User Schema:
    id - integer automatically supplied
    username - string, required, must be unique
    password - string, required, must be unique

Playlist Schema
    id - integer, automatically supplied
    name - string must be unique
    user_id - supplied automatically in all currently implemented URIs

Playlist-Songs Schema !!NO PLANNED OR CURRENT URI IMPLEMENTATIONS, PURELY FOR REFERENCE!!
    id - integer, automatically supplied
    playlist_id - integer, automatically supplied in all currently implemented URIs
    song_id - string

Route Documentation:

	/api/user
		/register
			POST operation
			requires username and password string

			description:
				registers a new user using the provided
				username and password strings.

		/login
			POST operation
			requires username and password string

			description:
				requests auth token by checking database
				to compare provided username and password
				strings

		/:id
			PUT operation
			requires replacement data

			description:
				locates user in database and overwrites
				stored information with supplied object

		/:id
			DELETE operation
			requires nothing

			description:
				deletes user indicated by url
		
		/:id/playlists
			GET operation
			requires nothing

			description:
				gets playlists associated with user
				indicated by url

		/:id/playlists
			POST operation
			requires (playlist) name string

			description:
				creates playlist for user associated by
				url with supplied data

/*====================================================================================================================================================*/

	/api/user/:id/playlists
		/:id
			PUT operation
			requires new (playlist) name string

			description:
				overwrites playlist associated with url

		/:id
			DELETE operation
			requires nothing

			description:
				deletes playlist indicated by url

		/:id
			POST operation
			requires (song) id

			description:
				adds song matching supplied (song) id
				to playlist indicated by url
	
		/:id
			GET operation
			No requirements

			description:
				gets all songs associated with playlist
				indicated by url
		