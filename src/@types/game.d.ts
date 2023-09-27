export interface Game {
	cover?: {
		id: number;
		url: string;
	};
	first_release_date: number;
	id: number;
	genres?: Genre[];
	name: string;
	platforms: Platform[];
	screenshots?: {
		id: number;
		url: string;
	}[];
	slug: string;
	summary: string;
}

export interface Platform {
	id: number;
	name: string;
	platform_logo: {
		id: number;
		url: string;
	};
}

export interface Genre {
	id: number;
	name: string;
}
