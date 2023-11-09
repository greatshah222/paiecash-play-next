import React, { useState, useContext } from "react";

// First create the context
const MyContext = React.createContext();

// Then create a StateHolder wrapper component
// to hold the state that the components need.
const StateHolder = (props) => {
	// Chosen tab, frontPage by default
	const [chosenTab, setChosenTab] = useState("Home");

	// Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
	const [allCategoryItems, setAllCategoryItems] = useState({});

	// Chosen category
	const [chosenCategory, setChosenCategory] = useState({});

	// Stores all categories fetched with Axios
	const [allCategories, setAllCategories] = useState([]);

	// Stores all movie/serie items, fetched with Axios by using allCategories as groupItemId
	const [allItems, setAllItems] = useState([]);

	// Currently viewed item, used in showing details
	const [chosenItem, setChosenItem] = useState("");

	const [vod, setVod] = useState("");

	// Language
	const [language, setLanguage] = useState("");

	// Holds state to toggle loginForm
	const [viewLoginForm, setViewLoginForm] = useState(false);

	// Holds style configuration for elements
	const [style, setStyle] = useState({});

	// Organization Id
	const [organizationId, setOrganizationId] = useState("");

	// Secret key
	const [key, setKey] = useState("");

	// Holds string of prioritized categories
	const [prioritized, setPrioritized] = useState("");

	// Holds string of banner groupItemId
	const [bannerId, setBannerId] = useState("");

	// Holds string of promo groupItemId
	const [promoId, setPromoId] = useState("");

	// Holds string of banner items
	const [bannerItems, setBannerItems] = useState([]);

	// Holds string of promo items
	const [promoItems, setPromoItems] = useState([]);

	// Holds string of prioritized items
	const [prioritizedItems, setPrioritizedItems] = useState("");

	// all assets of all the category combined
	const [allAssets, setAllAssets] = useState(null);

	// store all events
	const [allEvents, setAllEvents] = useState(null);

	// list of all suborg
	const [subOrgList, setSubOrgList] = useState(null);

	// store selected sub-organizattion details
	const [subOrganizationDetails, setSubOrganizationDetails] = useState(null);

	// singleEvent items
	const [singleEventItem, setSingleEventItem] = useState(null);

	// all languages
	const [allLanguages, setAllLanguages] = useState(null);

	// Holds user data
	const [user, setUser] = useState({
		userId: 0,
		companyId: 0,
		groupId: 0,
		userToken: "",
		username: "",
		firstName: "",
		eMail: "",
		loggedIn: false,
	});

	// for not loggedIn user for purchasing tickets

	const [userEmail, setUserEmail] = useState(null);

	// Holds string of prioritized items

	// Holds string of chosen URL to play
	const [chosenURL, setChosenURL] = useState("");
	// Holds string of chosen URL to play
	const [goBackToPrevious, setGoBackToPrevious] = useState(false);
	// Currently viewed item, used in showing details
	const [baseRoutes, setBaseRoutes] = useState({});

	const [isResponsiveclose, setResponsiveclose] = useState(false);
	const [isMenu, setisMenu] = useState(false);

	const [loading, setLoading] = useState(false);
	const [isSerie, setisSerie] = useState(false);

	const [UILoading, setUILoading] = useState(false);

	// profile menu selected Items

	const [chosenMenuOptionProfile, setChosenMenuOptionProfile] = useState("userDetail");

	const [ticketQuantity, setTicketQuantity] = useState(1);

	const [packageTargetOrganization, setPackageTargetOrganization] = useState(null);

	//Holds organizations packages
	const [profilePackages, setProfilePackages] = useState([]);
	//profile packages hold all packages while packages hold packages of an single event
	//Profile packages doesn't have tickets
	const [packages, setPackages] = useState([]);
	const [shoppingCategories, setShoppingCategories] = useState([]);
	const [paymentMethods, setPaymentMethods] = useState([]);

	const [allClubs, setAllClubs] = useState(null);

	const [selectedArea, setSelectedArea] = useState([]);

	const [resetSelectedArea, setResetSelectedArea] = useState(false);
	const [resetSelectedLevel, setResetSelectedLevel] = useState(false);
	const [selectedLevelContext, setSelectedLevelContext] = useState([]);

	const [userLoggedIn, setUserLoggedIn] = useState(false);

	// suoperAdmin selected Organization
	const [superAdminSelectedOrganization, setSuperAdminSelectedOrganization] = useState(false);

	// blacklist or whitelist access
	const [isLocationAccessGranted, setIsLocationAccessGranted] = useState(false);

	// BELOW CHECKED

	const [currentClub, setCurrentClub] = useState(null);
	const [languageCode, setLanguageCode] = useState("fi");
	const [initialLanguageLoaded, setInitialLanguageLoaded] = useState(false);

	const [selectedPackage, setSelectedPackage] = useState({});

	const closeHamMenu = () => {
		setisMenu(false);
		setResponsiveclose(false);
	};

	return (
		<MyContext.Provider
			value={{
				setResetSelectedArea,
				resetSelectedLevel,
				resetSelectedArea,

				setResetSelectedLevel,
				isMenu,
				setisMenu,
				closeHamMenu,
				chosenURL,
				setChosenURL,

				selectedArea,
				setSelectedArea,

				selectedLevelContext,
				setSelectedLevelContext,

				goBackToPrevious,
				setGoBackToPrevious,

				baseRoutes,
				setBaseRoutes,
				isLocationAccessGranted,
				setIsLocationAccessGranted,

				subOrganizationDetails,
				setSubOrganizationDetails,

				chosenTab,
				setChosenTab,
				isResponsiveclose,
				setResponsiveclose,

				userLoggedIn,
				setUserLoggedIn,

				chosenCategory,
				setChosenCategory,

				allCategories,
				setAllCategories,

				allItems,
				setAllItems,

				chosenItem,
				setChosenItem,

				user,
				setUser,

				allCategoryItems,
				setAllCategoryItems,

				vod,
				setVod,

				viewLoginForm,
				setViewLoginForm,

				style,
				setStyle,

				language,
				setLanguage,

				key,
				setKey,

				organizationId,
				setOrganizationId,

				prioritized,
				setPrioritized,

				bannerId,
				setBannerId,

				promoId,
				setPromoId,

				bannerItems,
				setBannerItems,

				promoItems,
				setPromoItems,

				prioritizedItems,
				setPrioritizedItems,

				allAssets,
				setAllAssets,

				allEvents,
				setAllEvents,

				singleEventItem,
				setSingleEventItem,

				UILoading,
				setUILoading,

				loading,
				setLoading,
				profilePackages,
				setProfilePackages,

				packages,
				setPackages,

				shoppingCategories,
				setShoppingCategories,

				selectedPackage,
				setSelectedPackage,

				paymentMethods,
				setPaymentMethods,

				userEmail,
				setUserEmail,

				isSerie,
				setisSerie,

				chosenMenuOptionProfile,
				setChosenMenuOptionProfile,

				allLanguages,
				setAllLanguages,

				subOrgList,
				setSubOrgList,

				ticketQuantity,
				setTicketQuantity,

				allClubs,
				setAllClubs,

				superAdminSelectedOrganization,
				setSuperAdminSelectedOrganization,

				// BELOW CHECKED

				currentClub,
				setCurrentClub,

				languageCode,

				setLanguageCode,

				initialLanguageLoaded,
				setInitialLanguageLoaded,

				packageTargetOrganization,
				setPackageTargetOrganization,
			}}
		>
			{props.children}
		</MyContext.Provider>
	);
};

export const useMyContext = () => useContext(MyContext);

export default StateHolder;
