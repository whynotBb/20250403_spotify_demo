import { Artist } from "./artist";
import { ExternalUrls, Image, Restriction } from "./commonType";

export interface Track {
	album?: {
		album_type: string;
		total_tracks: number;
		available_markets: ["CA", "BR", "IT"];
		external_urls: ExternalUrls;
		href: string;
		id: string;
		images: Image[];
		name: string;
		release_date: string;
		release_date_precision: string;
		restrictions: Restriction;
		type: string;
		uri: string;
		artists: Artist[];
	};
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: false;
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_playable: false;
	linked_from: {};
	restrictions: Restriction;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: "track";
	uri: string;
	is_local: false;
}

export interface Episode {
	audio_preview_url: string;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image;
	is_externally_hosted: boolean;
	is_playable: boolean;
	language: string;
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: {
		fully_played: boolean;
		resume_position_ms: number;
	};
	type: "episode";
	url: string;
	restriction: Restriction;
	show: {
		available_markets: string[];
		copyrights: {
			text: string;
			type: string;
		};
		description: string;
	};
}
