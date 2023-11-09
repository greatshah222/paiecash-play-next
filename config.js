const AppConfig = {
	BASE_URL: "https://my.icareus.com/api",
	BASE_URL_MY: "https://my.icareus.com/api",
	// BASE_URL: "https://suiterc.icareus.com/api",
	// BASE_URL_MY: "https://suiterc.icareus.com/api",
	BASE_URL_SUITERC: "https://suiterc.icareus.com",

	BASE_URL_CDN: "https://icareus-suite.secure2.footprint.net/api",
	BASE_URL_SALIBANDY: "https://salibandytv.icareus.com/api",
	organization: {
		// organizationId: 263559910,
		// key: "fjJZ82HdU2",
		// companyId: 10154,
		// groupId: 263559911,

		organizationId: 181282321,
		key: "XqjVf6W8yu",
		companyId: 10154,
		groupId: 181282322,

		// organizationId: 4692809,

		// key: "SgtKzUCp29",
		// companyId: 10154,
		// groupId: 4692810,

		// evaluation1 my
		// organizationId: 6877582,

		// key: "wSSBDaasdD",
		// companyId: 10154,
		// groupId: 6877583,

		// test account
		// organizationId: 1909009,

		// key: "kWXQ6KBCnN",
		// companyId: 10154,
		// groupId: 1909010,

		name: "SalibandyTv",
		language: "fi_FI",
		torneopalSeasonId: "2023-2024",
	},
	components: {
		banner: {
			groupItemId: 263841004,
		},
	},

	packages: {
		inssiDivari: {
			packageId: 253787152,
			teams: [
				{
					name: "ÅIF",
					organizationId: 190667313,
				},
				{
					name: "Tiikerit",
					organizationId: 189356505,
				},
				{
					name: "SalBa",
					organizationId: 191690904,
				},
				{
					name: "SaiPa",
					organizationId: 191717901,
				},
				{
					name: "Rangers",
					organizationId: 189508422,
				},
				{
					name: "O2-Jyväskylä",
					organizationId: 191113641,
				},
				{
					name: "M-Team",
					organizationId: 189526033,
				},

				{
					name: "LNM",
					organizationId: 191568452,
				},

				{
					name: "Koovee",
					organizationId: 181283371,
				},
				{
					name: "Konnat",
					organizationId: 192215801,
				},
				{
					name: "Karhut",
					organizationId: 189857478,
				},

				{
					name: "Josba",
					organizationId: 192591312,
				},

				{
					name: "Hawks",
					organizationId: 189510618,
				},
				{
					name: "Happee Steamers",
					organizationId: 191665801,
				},
			],
		},
		naistenDivari: {
			packageId: 253787153,
			teams: [
				{
					name: "SBS Wirmo",
					organizationId: 200934003,
				},
				{
					name: "SB Nivala",
					organizationId: 252768201,
				},
				{
					name: "Pirkat",
					organizationId: 193007705,
				},
				{
					name: "Nystars",
					organizationId: 189389606,
				},
				{
					name: "Northern Stars",
					organizationId: 188136505,
				},
				{
					name: "Jokerit",
					organizationId: 253019153,
				},
				{
					name: "Helsinki United",
					organizationId: 253007201,
				},

				{
					name: "HaHe",
					organizationId: 193881101,
				},

				{
					name: "FBC Remix",
					organizationId: 190676396,
				},
				// {
				// 	name: "Blue Fox",
				// 	organizationId: 192215801,
				// },
			],
		},

		divariGamesPackageId: [253787152, 253787153],
	},
};

export default AppConfig;
