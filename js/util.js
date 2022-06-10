export function displayDistance(num) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return AMERICAN_TIMEZONES.has(timezone)
        ? Math.floor(toMiles(num)) + " miles"
        : Math.floor(num) + " km";
}

function toMiles(km) {
    return km * 0.62137119;
}

const AMERICAN_TIMEZONES = new Set([
    "America/Phoenix",
    "America/Adak",
    "America/Anchorage",
    "America/Atka",
    "America/Boise",
    "America/Chicago",
    "America/Denver",
    "America/Detroit",
    "America/Fort_Wayne",
    "America/Indiana/Indianapolis",
    "America/Indiana/Knox",
    "America/Indiana/Marengo",
    "America/Indiana/Petersburg",
    "America/Indiana/Tell_City",
    "America/Indiana/Vevay",
    "America/Indiana/Vincennes",
    "America/Indiana/Winamac",
    "America/Indianapolis",
    "America/Juneau",
    "America/Kentucky/Louisville",
    "America/Kentucky/Monticello",
    "America/Knox_IN",
    "America/Los_Angeles",
    "America/Louisville",
    "America/Menominee",
    "America/Metlakatla",
    "America/New_York",
    "America/Nome",
    "America/North_Dakota/Beulah",
    "America/North_Dakota/Center",
    "America/North_Dakota/New_Salem",
    "America/Shiprock",
    "America/Sitka",
    "America/Yakutat",
    "Navajo",
    "US/Alaska",
    "US/Aleutian",
    "US/Arizona",
    "US/Central",
    "US/East-Indiana",
    "US/Eastern",
    "US/Hawaii",
    "US/Indiana-Starke",
    "US/Michigan",
    "US/Mountain",
    "US/Pacific",
]);