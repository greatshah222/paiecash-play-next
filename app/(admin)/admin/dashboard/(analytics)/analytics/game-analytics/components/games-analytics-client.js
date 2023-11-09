"use client";

import Iframe from "react-iframe";

const GamesAnalyticsClient = ({ organizationId, secret }) => {
	return (
		<Iframe
			url={`https://staging1.event-analytics.icareus.com/analytics/events/dashboard?organizationId=${organizationId}&secret=${secret}`}
			width="100%"
			height="1300px"
			className="myClassname"
		/>
	);
};

export default GamesAnalyticsClient;
