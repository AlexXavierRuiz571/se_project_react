export const coordinates = {
  latitude: 30.4015832,
  longitude: -86.8713508,
};

export const APIKey = "fc9a02d880408415437775ec206c9ff9";

/* --- Location helpers and config --- */

const IP_LOOKUP_URL = "https://ipapi.co/json/";
const CACHE_KEY = "se_project_coords_v1";

/**
 * Get user coordinates using browser Geolocation API.
 * Resolves: { lat: number, lon: number }
 * Rejects: Error (permission denied, timeout, unsupported, etc.)
 */
export function getUserCoordinates({
  timeout = 10000,
  enableHighAccuracy = false,
} = {}) {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      return reject(new Error("Geolocation not supported"));
    }

    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      reject(new Error("Geolocation timeout"));
    }, timeout);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (timedOut) return;
        clearTimeout(timer);
        resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        if (timedOut) return;
        clearTimeout(timer);
        reject(err);
      },
      { enableHighAccuracy, maximumAge: 60_000, timeout }
    );
  });
}

/**
 * Get approximate coordinates from an IP lookup.
 * Resolves: { lat: number, lon: number } or throws on failure.
 */
export async function getCoordinatesFromIP() {
  try {
    const res = await fetch(IP_LOOKUP_URL);
    if (!res.ok) throw new Error("IP lookup failed");
    const json = await res.json();

    const latRaw = json.latitude ?? json.lat ?? json.latitude;
    const lonRaw = json.longitude ?? json.lon ?? json.longitude;

    if (latRaw != null && lonRaw != null) {
      const lat = Number(latRaw);
      const lon = Number(lonRaw);
      if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
        return { lat, lon };
      }
    }

    throw new Error("Unable to parse IP geolocation response");
  } catch (err) {
    throw err;
  }
}

/**
 * Try to get best coordinates:
 * - check local cache (localStorage)
 * - try browser geolocation
 * - fall back to IP lookup
 * - final fallback to default coords
 *
 * Returns: { lat, lon, source, permissionDenied }
 */
export async function getBestCoordinates({
  ttl = 10 * 60 * 1000, // 10 minutes
  timeout = 10000,
  enableHighAccuracy = false,
  defaultCoords = { lat: coordinates.latitude, lon: coordinates.longitude },
} = {}) {
  // try cache
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.ts && parsed?.lat != null && parsed?.lon != null) {
        const age = Date.now() - parsed.ts;
        if (age <= ttl) {
          return {
            lat: parsed.lat,
            lon: parsed.lon,
            source: "cache",
            permissionDenied: false,
          };
        }
      }
    }
  } catch (e) {
    // ignore cache parsing issues
    console.warn("coords cache parse error", e);
  }

  // try geolocation
  try {
    const geo = await getUserCoordinates({ timeout, enableHighAccuracy });
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ lat: geo.lat, lon: geo.lon, ts: Date.now() })
      );
    } catch (e) {
      /* ignore localStorage failures */
    }
    return {
      lat: geo.lat,
      lon: geo.lon,
      source: "geolocation",
      permissionDenied: false,
    };
  } catch (geoErr) {
    const permissionDenied =
      geoErr && (geoErr.code === 1 || /permission/i.test(geoErr.message ?? ""));
    if (permissionDenied) {
      // permission denied -> try IP but keep permission flag
      try {
        const ip = await getCoordinatesFromIP();
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ lat: ip.lat, lon: ip.lon, ts: Date.now() })
          );
        } catch (e) {}
        return {
          lat: ip.lat,
          lon: ip.lon,
          source: "ip",
          permissionDenied: true,
        };
      } catch (ipErr) {
        return {
          lat: defaultCoords.lat,
          lon: defaultCoords.lon,
          source: "default",
          permissionDenied: true,
        };
      }
    }

    // other geolocation errors -> try IP
    try {
      const ip = await getCoordinatesFromIP();
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ lat: ip.lat, lon: ip.lon, ts: Date.now() })
        );
      } catch (e) {}
      return {
        lat: ip.lat,
        lon: ip.lon,
        source: "ip",
        permissionDenied: false,
      };
    } catch (ipErr) {
      return {
        lat: defaultCoords.lat,
        lon: defaultCoords.lon,
        source: "default",
        permissionDenied: false,
      };
    }
  }
}
