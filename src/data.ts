const gameData = [
	{
		id: 1,
		title: 'Zelda',
		console: 'Nintendo 64',
		genre: 'Action-Adventure',
		releaseDate: '1998',
		imageUrl:
			'https://cdna.artstation.com/p/assets/images/images/013/834/282/large/tom-garden-forest-temple-finished-smaller-02.jpg?1541294994',
		summary:
			'Les jeux The Legend of Zelda se déroulent dans un univers médiéval fantastique où existent magie, divinités, créatures diverses, héros et princesse. Un univers où existe le Bon et le Mauvais côté, où le Héros doit vaincre le Mal au profit du Bien.',
	},

	{
		id: 2,
		title: 'Final Fantasy VII',
		console: 'Nintendo 64',
		genre: 'RPG',
		releaseDate: '1997',
		imageUrl:
			'https://image.api.playstation.com/vulcan/img/cfn/113075PxnarzRek4cRpjrRWSpLfrcBd23B5e_Yj2azms6nWYKmySv4h3a22G5_R1CM4BQUmSRD6oOArDROKv041NUkgun78-.png',
		summary:
			"Final Fantasy VII est un jeu de rôle, développé par Square Co., Ltd., sorti pour la première fois en 1997 au Japon. De tous les jeux de la série Final Fantasy, Final Fantasy VII est celui qui a le plus de popularité auprès des joueurs. Il est le premier jeu de la série à être sorti sur PlayStation à utiliser des graphismes en 3D. Final Fantasy VII a été un énorme succès à travers le monde et contribua au succès de la console de Sony ainsi qu'à l'exportation des jeux de rôle en dehors du Japon. Il est encore actuellement le jeu de la série le plus vendu au monde (9,8 millions d'exemplaires vendus). À cause de son succès, de nombreux jeux dérivés ont vu le jour et ont finalement donné naissance à la Compilation Final Fantasy VII.",
	},

	{
		id: 3,
		title: 'Sonic the Hedgehog',
		console: 'Sega Genesis',
		genre: 'Plateforme',
		releaseDate: '1991',
		imageUrl:
			'https://d.newsweek.com/en/full/2018092/sonic-hedgehog-2.jpg?w=1600&h=1600&q=88&f=ef770fd1a6192ca097d943b0ba9c484f',
		summary:
			'Sonic the Hedgehog est un jeu de plateforme rapide mettant en scène le hérisson bleu Sonic dans sa quête pour arrêter le méchant Dr. Robotnik. Le jeu est célèbre pour sa vitesse et ses niveaux colorés.',
	},

	{
		id: 4,
		title: 'Street Fighter II: The World Warrior',
		console: 'Super Nintendo Entertainment System (SNES)',
		genre: 'Combat',
		releaseDate: '1992',
		imageUrl:
			'https://i.discogs.com/B58zXRK4-ijLglLLGIYm-eZbpCxBgo9gByCEz8qUh8k/rs:fit/g:sm/q:90/h:598/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQzNTA5/MTgtMTU5MDk0ODUw/Ni0zNDcwLmpwZWc.jpeg',
		summary:
			"Street Fighter II propose huit personnages jouables de base et sept styles de combat différents, un système de jeu novateur, des graphismes et une bande sonore riche et variée. Street Fighter II est considéré comme l'une des références des jeux de combat en un contre un, en plus d'en être l'un des pionniers.",
	},

	{
		id: 5,
		title: 'Mortal Kombat',
		console: 'Nintendo 64',
		genre: 'Combat',
		releaseDate: '1997',
		imageUrl: 'https://www.gamecash.fr/thumbnail-600/mortal-kombat-4-e31453.jpg',
		summary:
			"Le premier jeu Mortal Kombat se déroule dans l'EarthRealm, où sept guerriers participent au tournoi. Le gagnant sauvera le royaume de l'invasion par Outworld. Avec l'aide du dieu du tonnerre Raiden, les guerriers de l'EarthRealm gagnent le tournoi et Liu Kang devient le nouveau champion du jeu.",
	},

	{
		id: 6,
		title: 'Metal Gear Solid',
		console: 'Playstation',
		genre: 'Action',
		releaseDate: '1998',
		imageUrl: 'https://image.jeuxvideo.com/images/ps/m/g/mgsops0f.jpg',
		summary:
			"L'histoire relate la mission d'infiltration qui deviendra par la suite « l'incident de Shadow Moses ». Non seulement le secret entourant la naissance de Solid Snake est révélé, mais son frère fait également son apparition : Liquid Snake, au patrimoine génétique identique.",
	},

	{
		id: 7,
		title: 'Super Mario 64',
		console: 'Nintendo 64',
		genre: 'Plate-forme',
		releaseDate: '1997',
		imageUrl: 'https://i.ebayimg.com/images/g/h3cAAOSwRxNkYCy9/s-l1200.jpg',
		summary:
			"Il est le premier jeu de la série entièrement en 3D temps réel et propose à ce titre une liberté totale de mouvement, de larges niveaux ouverts, et une 3D polygonale en contraste avec les sprites en 2D des Mario précédents. Il conserve également de nombreux éléments du gameplay et de l'univers des précédents volets.",
	},

	{
		id: 8,
		title: 'Castlevania',
		console: 'Nintendo Entertainment System (NES)',
		genre: 'Action/Aventure',
		releaseDate: '1987',
		imageUrl: 'https://m.media-amazon.com/images/I/5156i7MM6hL._AC_UF1000,1000_QL80_.jpg',
		summary:
			"Castlevania suit les aventures du chasseur de vampires Simon Belmont alors qu'il explore le sinistre château de Dracula. Le jeu est connu pour son atmosphère sombre et son gameplay exigeant. Les joueurs doivent combattre des monstres et des boss pour vaincre Dracula.",
	},

	{
		id: 9,
		title: 'Donkey Kong',
		console: 'Nintendo Entertainment System',
		genre: 'Plateforme',
		releaseDate: '1986',
		imageUrl:
			'https://proxy.olhardigital.com.br/wp-content/uploads/2020/07/20200715124525.jpg',
		summary:
			'Donkey Kong est un jeu de plateforme classique qui met en scène Jumpman (qui deviendra plus tard Mario) tentant de sauver la demoiselle en détresse, Pauline, des griffes de Donkey Kong. Le jeu a introduit certains des personnages les plus emblématiques de Nintendo et a contribué à lancer la carrière de Mario.',
	},

	{
		id: 10,
		title: 'Mega Man',
		console: 'Nintendo Entertainment System (NES)',
		genre: 'Action/Plateforme',
		releaseDate: '1987',
		imageUrl:
			'https://images.laprovence.com/media/2017/12/05/megaman11_art_1512379726.png?twic=v1/crop=1331x732@83x0/cover=1960x1103',
		summary:
			"Mega Man, également connu sous le nom de Rockman au Japon, est un jeu d'action-plateforme où les joueurs incarnent Mega Man, un robot capable de copier les pouvoirs de ses ennemis vaincus. Le jeu est célèbre pour sa difficulté, ses combats de boss mémorables et ses nombreux titres de la série.",
	},
];

export default gameData;
