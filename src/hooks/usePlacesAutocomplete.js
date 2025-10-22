"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useRef, useState } from "react";
import useDebounceCallback from "./useDebounceCallback";

// Ahmedabad bounding box (SW, NE)
const AHD_BOUNDS_SW = { lat: 22.9074872, lng: 72.4487989 };
const AHD_BOUNDS_NE = { lat: 23.1645253, lng: 72.7379532 };

// Hook: returns location options for an input and a selector to fetch coordinates
export function usePlacesAutocomplete({ input, enabled = true } = {}) {
  const places = useMapsLibrary("places");

  const [autocompleteService, setAutocompleteService] = useState(null);
  const placesServiceRef = useRef(null);

  // Debounced input
  const [debouncedInput, setDebouncedInput] = useState("");
  const debounceInput = useDebounceCallback((val) => {
    setDebouncedInput(val || "");
  }, 300);

  useEffect(() => {
    debounceInput(input);
  }, [input, debounceInput]);

  // Initialize services once Places library is available
  useEffect(() => {
    if (!places) return;
    setAutocompleteService(new window.google.maps.places.AutocompleteService());
    placesServiceRef.current = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
  }, [places]);

  const bounds = useMemo(() => {
    const isGoogleReady =
      typeof window !== "undefined" && !!window.google?.maps;
    if (!isGoogleReady) return null;
    return new window.google.maps.LatLngBounds(AHD_BOUNDS_SW, AHD_BOUNDS_NE);
  }, [places]);

  // Query: predictions for current input
  const {
    data: options = [],
    isLoading: isLoadingOptions,
    isFetching: isFetchingOptions,
  } = useQuery({
    queryKey: ["placePredictions", debouncedInput],
    enabled:
      !!debouncedInput &&
      debouncedInput.length > 0 &&
      !!autocompleteService &&
      !!bounds &&
      enabled,
    staleTime: 0,
    queryFn: () => {
      return new Promise((resolve, reject) => {
        try {
          autocompleteService.getPlacePredictions(
            {
              input: debouncedInput,
              bounds,
              strictBounds: true,
              componentRestrictions: { country: "in" },
              types: ["geocode"],
            },
            (predictions, status) => {
              if (
                status !== window.google.maps.places.PlacesServiceStatus.OK ||
                !predictions
              ) {
                resolve([]);
                return;
              }

              const ahdPredictions = predictions.filter((p) =>
                p.description?.toLowerCase().includes("ahmedabad")
              );

              resolve(
                ahdPredictions.map((p) => ({
                  value: p.place_id,
                  label: p.description,
                }))
              );
            }
          );
        } catch (err) {
          reject(err);
        }
      });
    },
  });

  // Mutation: fetch full details for a selected placeId
  const { mutateAsync: fetchPlaceDetails, isPending: isLoadingDetails } =
    useMutation({
      mutationKey: ["placeDetails"],
      mutationFn: (placeId) => {
        return new Promise((resolve, reject) => {
          try {
            if (!placeId || !placesServiceRef.current) {
              resolve(null);
              return;
            }

            placesServiceRef.current.getDetails(
              { placeId },
              (place, status) => {
                if (
                  status !== window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  resolve(null);
                  return;
                }

                const locationData = {
                  placeId,
                  placeName: place?.name ?? "",
                  formattedAddress: place?.formatted_address ?? "",
                  coordinates: {
                    lat: place?.geometry?.location?.lat?.() ?? null,
                    lng: place?.geometry?.location?.lng?.() ?? null,
                  },
                };
                resolve(locationData);
              }
            );
          } catch (err) {
            reject(err);
          }
        });
      },
    });

  return {
    options,
    isLoading: isLoadingOptions || isFetchingOptions,
    fetchPlaceDetails,
    isLoadingDetails,
  };
}
